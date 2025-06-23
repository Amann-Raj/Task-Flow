// tests/unit/taskController.test.js

jest.mock('../../models/Task', () => {
    const saveMock = jest.fn();
    const Task = jest.fn(() => ({ save: saveMock }));
  
    Task.find = jest.fn();
    Task.findByIdAndUpdate = jest.fn();
    Task.findByIdAndDelete = jest.fn();
  
    return Task;
  });
  
  const taskController = require('../../controllers/taskController');
  const Task = require('../../models/Task');
  
  describe('Task Controller Unit Tests', () => {
    afterEach(() => {
      jest.clearAllMocks();
      jest.restoreAllMocks();
    });
  
    const createMockRes = () => {
      const res = {
        json: jest.fn(),
        status: jest.fn()
      };
      res.status.mockReturnValue(res);
      return res;
    };
  
    it('should get all tasks', async () => {
      const mockTasks = [
        { _id: '1', title: 'Task 1' },
        { _id: '2', title: 'Task 2' }
      ];
      Task.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockTasks)
      });
      const req = {};
      const res = createMockRes();
      await taskController.getTasks(req, res);
      expect(Task.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockTasks);
    });
  
    it.skip('should handle get tasks error', async () => {
      const errorMessage = 'Database error';
      Task.find.mockRejectedValue(new Error(errorMessage));
      const req = {};
      const res = createMockRes();
      await taskController.getTasks(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  
    it('should create a new task', async () => {
      const mockTaskData = { title: 'New Task' };
      const savedTask = { _id: '1', ...mockTaskData };
      const saveMock = jest.fn().mockResolvedValue(savedTask);
      Task.mockImplementation(() => ({ ...mockTaskData, _id: '1', save: saveMock }));
      const req = { body: mockTaskData };
      const res = createMockRes();
      await taskController.createTask(req, res);
      expect(Task).toHaveBeenCalledWith(mockTaskData);
      expect(saveMock).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ _id: '1', title: 'New Task' }));
    });
  
    it('should handle create task error', async () => {
      const mockTaskData = { title: 'Invalid Task' };
      const errorMessage = 'Validation failed';
      const saveMock = jest.fn().mockRejectedValue(new Error(errorMessage));
      Task.mockImplementation(() => ({ save: saveMock }));
      const req = { body: mockTaskData };
      const res = createMockRes();
      await taskController.createTask(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  
    it('should update a task', async () => {
      const taskId = '1';
      const updates = { title: 'Updated Task' };
      const updatedTask = { _id: taskId, ...updates };
      Task.findByIdAndUpdate.mockResolvedValue(updatedTask);
      const req = { params: { id: taskId }, body: updates };
      const res = createMockRes();
      await taskController.updateTask(req, res);
      expect(Task.findByIdAndUpdate).toHaveBeenCalledWith(taskId, updates, { new: true });
      expect(res.json).toHaveBeenCalledWith(updatedTask);
    });
  
    it('should handle update task not found', async () => {
      Task.findByIdAndUpdate.mockResolvedValue(null);
      const req = { params: { id: '1' }, body: { title: 'Updated' } };
      const res = createMockRes();
      await taskController.updateTask(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Task not found' });
    });
  
    it('should handle update task error', async () => {
      const errorMessage = 'Update error';
      Task.findByIdAndUpdate.mockRejectedValue(new Error(errorMessage));
      const req = { params: { id: '1' }, body: { title: 'Updated' } };
      const res = createMockRes();
      await taskController.updateTask(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  
    it('should delete a task', async () => {
      const taskId = '1';
      Task.findByIdAndDelete.mockResolvedValue({ _id: taskId });
      const req = { params: { id: taskId } };
      const res = createMockRes();
      await taskController.deleteTask(req, res);
      expect(Task.findByIdAndDelete).toHaveBeenCalledWith(taskId);
      expect(res.json).toHaveBeenCalledWith({ message: 'Task deleted' });
    });
  
    it('should handle delete task not found', async () => {
      Task.findByIdAndDelete.mockResolvedValue(null);
      const req = { params: { id: '1' } };
      const res = createMockRes();
      await taskController.deleteTask(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Task not found' });
    });
  
    it('should handle delete task error', async () => {
      const errorMessage = 'Delete error';
      Task.findByIdAndDelete.mockRejectedValue(new Error(errorMessage));
      const req = { params: { id: '1' } };
      const res = createMockRes();
      await taskController.deleteTask(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });