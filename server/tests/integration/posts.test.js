const request = require('supertest');
const app = require('../../src/app');

jest.mock('../../src/models/Bug'); // we'll provide mock implementations
const Bug = require('../../src/models/Bug');

describe('Bugs API', () => {
  afterEach(() => jest.clearAllMocks());

  test('POST /api/bugs creates a bug (mocked)', async () => {
    const mockSaved = { _id: '123', title: 'x', description: '', status: 'open' };
    Bug.prototype.save = jest.fn().mockResolvedValue(mockSaved);

    const res = await request(app)
      .post('/api/bugs')
      .send({ title: 'x' })
      .expect(201);

    expect(res.body.title).toBe('x');
    expect(Bug.prototype.save).toHaveBeenCalled();
  });

  test('GET /api/bugs returns list (mocked)', async () => {
    Bug.find = jest.fn().mockResolvedValue([{ _id: '1', title: 't1' }]);
    const res = await request(app).get('/api/bugs').expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(Bug.find).toHaveBeenCalled();
  });

  test('PUT /api/bugs/:id returns 404 if not found', async () => {
    Bug.findByIdAndUpdate = jest.fn().mockResolvedValue(null);
    const res = await request(app).put('/api/bugs/doesnotexist').send({ title: 'x' }).expect(404);
    expect(res.body.message).toBe('Bug not found');
  });

  test('DELETE returns 404 if not found', async () => {
    Bug.findByIdAndDelete = jest.fn().mockResolvedValue(null);
    const res = await request(app).delete('/api/bugs/abc').expect(404);
    expect(res.body.message).toBe('Bug not found');
  });
});
