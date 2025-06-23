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

describe('Task API Endpoint Tests', () => {
  it('GET /tasks should return 200 and an array', async () => {
    const res = await request(app).get('/tasks').expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });

  it('POST /tasks should create a new task', async () => {
    const sampleTask = {
      title: 'Write tests',
      description: 'Write API tests for the task manager',
      priority: 'high',
      due_date: '2025-07-01',
      completed: false
    };
    const res = await request(app).post('/tasks').send(sampleTask).expect(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toBe(sampleTask.title);
  });

  it('POST /tasks should create task with minimal required fields', async () => {
    const minimalTask = { title: 'Minimal Task' };
    const res = await request(app).post('/tasks').send(minimalTask).expect(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toBe(minimalTask.title);
  });

  it('POST /tasks should return 400 for invalid data', async () => {
    const invalidTask = { title: '' };
    await request(app).post('/tasks').send(invalidTask).expect(400);
  });

  it('PUT /tasks/:id should update a task', async () => {
    const task = await Task.create({ title: 'Old Title' });
    const updates = { title: 'New Title', completed: true };
    const res = await request(app).put(`/tasks/${task._id}`).send(updates).expect(200);
    expect(res.body.title).toBe('New Title');
    expect(res.body.completed).toBe(true);
  });

  it('PUT /tasks/:id should handle non-existent task', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const updates = { title: 'Updated Title' };
    await request(app).put(`/tasks/${nonExistentId}`).send(updates).expect(404);
  });

  it('PUT /tasks/:id should handle invalid ID format', async () => {
    const invalidId = 'invalid-id-format';
    const updates = { title: 'Updated Title' };
    await request(app).put(`/tasks/${invalidId}`).send(updates).expect(400);
  });

  it('DELETE /tasks/:id should delete a task', async () => {
    const task = await Task.create({ title: 'To Delete' });
    await request(app).delete(`/tasks/${task._id}`).expect(200);
    const res = await request(app).get('/tasks').expect(200);
    expect(res.body.length).toBe(0);
  });

  it('DELETE /tasks/:id should handle non-existent task', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    await request(app).delete(`/tasks/${nonExistentId}`).expect(404);
  });

  it('DELETE /tasks/:id should handle invalid ID format', async () => {
    const invalidId = 'invalid-id-format';
    await request(app).delete(`/tasks/${invalidId}`).expect(400);
  });
}); 