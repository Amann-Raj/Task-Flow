const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../server');
const Task = require('../../models/Task');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Task.deleteMany();
});

describe('Task API Integration Tests', () => {
  it('should create and retrieve a task', async () => {
    const taskData = { title: 'Write Integration Tests', description: 'Test the task API', priority: 'high', due_date: '2025-07-01', completed: false };
    const createResponse = await request(app).post('/tasks').send(taskData).expect(201);
    expect(createResponse.body.title).toBe(taskData.title);
    expect(createResponse.body).toHaveProperty('_id');
    const getResponse = await request(app).get('/tasks').expect(200);
    expect(getResponse.body.length).toBe(1);
    expect(getResponse.body[0].title).toBe(taskData.title);
  });

  it('should return empty array when no tasks exist', async () => {
    const response = await request(app).get('/tasks').expect(200);
    expect(response.body).toEqual([]);
    expect(response.body.length).toBe(0);
  });

  it('should create task with only required fields', async () => {
    const minimalTask = { title: 'Minimal Task' };
    const response = await request(app).post('/tasks').send(minimalTask).expect(201);
    expect(response.body.title).toBe(minimalTask.title);
    expect(response.body).toHaveProperty('_id');
  });

  it('should create task with all fields', async () => {
    const fullTask = { title: 'Full Task', description: 'All fields', priority: 'medium', due_date: '2025-07-01', completed: true };
    const response = await request(app).post('/tasks').send(fullTask).expect(201);
    expect(response.body.title).toBe(fullTask.title);
    expect(response.body.description).toBe(fullTask.description);
    expect(response.body.priority).toBe(fullTask.priority);
    expect(response.body.completed).toBe(true);
  });

  it('should update a task', async () => {
    const originalTask = { title: 'Original Title', completed: false };
    const task = await Task.create(originalTask);
    const updates = { title: 'Updated Title', completed: true };
    const response = await request(app).put(`/tasks/${task._id}`).send(updates).expect(200);
    expect(response.body.title).toBe('Updated Title');
    expect(response.body.completed).toBe(true);
  });

  it('should handle update with invalid task ID', async () => {
    const invalidId = new mongoose.Types.ObjectId();
    const updates = { title: 'Updated Title' };
    await request(app).put(`/tasks/${invalidId}`).send(updates).expect(404);
  });

  it('should delete a task', async () => {
    const taskData = { title: 'To Delete' };
    const task = await Task.create(taskData);
    const deleteResponse = await request(app).delete(`/tasks/${task._id}`).expect(200);
    expect(deleteResponse.body.message).toBe('Task deleted');
    const getResponse = await request(app).get('/tasks').expect(200);
    expect(getResponse.body.length).toBe(0);
  });

  it('should handle delete with invalid task ID', async () => {
    const invalidId = new mongoose.Types.ObjectId();
    await request(app).delete(`/tasks/${invalidId}`).expect(404);
  });

  it('should handle invalid request body for task creation', async () => {
    const invalidTask = { title: '' };
    await request(app).post('/tasks').send(invalidTask).expect(400);
  });
}); 