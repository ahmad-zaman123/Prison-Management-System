const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const visitRoutes = require('../routes/visitRoutes');
const Visit = require('../models/Visit');

app.use(express.json());

app.use('/api/visit', visitRoutes);

beforeAll(async () => {
  const url = 'mongodb://localhost:27017/test_db';
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

beforeEach(async () => {
  await Visit.deleteMany();
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Visit API', () => {

  it('should return all visits', async () => {
    const res = await request(app)
      .get('/api/visit')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });

  it('should return a specific visit by ID', async () => {
    const newVisit = {
      visitorName: 'John Doe',
      inmateNo: '1234',
      dateOfVisit: '2025-04-05',
      checkInTime: '10:00 AM',
      checkOutTime: '12:00 PM',
      duration: '2 hours'
    };

    const visitRes = await request(app)
      .post('/api/visit/add')
      .send(newVisit)
      .expect(201);

    const visitId = visitRes.body.newVisit._id;

    const res = await request(app)
      .get(`/api/visit/${visitId}`)
      .expect(200);

    expect(res.body.visitorName).toBe(newVisit.visitorName);
    expect(res.body.inmateNo).toBe(newVisit.inmateNo);
    expect(new Date(res.body.dateOfVisit).toISOString().split('T')[0]).toBe(newVisit.dateOfVisit);
  });

  it('should create a new visit', async () => {
    const newVisit = {
      visitorName: 'Jane Doe',
      inmateNo: '5678',
      dateOfVisit: '2025-04-06',
      checkInTime: '09:00 AM',
      checkOutTime: '11:00 AM',
      duration: '2 hours'
    };

    const res = await request(app)
      .post('/api/visit/add')
      .send(newVisit)
      .expect(201);

    expect(res.body.message).toBe('Visit added successfully');
    expect(res.body.newVisit.visitorName).toBe(newVisit.visitorName);
    expect(res.body.newVisit.inmateNo).toBe(newVisit.inmateNo);
  });

  it('should update an existing visit', async () => {
    const newVisit = {
      visitorName: 'Tom Smith',
      inmateNo: '9012',
      dateOfVisit: '2025-04-07',
      checkInTime: '02:00 PM',
      checkOutTime: '04:00 PM',
      duration: '2 hours'
    };

    const visitRes = await request(app)
      .post('/api/visit/add')
      .send(newVisit)
      .expect(201);

    const visitId = visitRes.body.newVisit._id;

    const updatedVisit = {
      checkOutTime: '05:00 PM',
      duration: '3 hours'
    };

    const res = await request(app)
      .put(`/api/visit/update/${visitId}`)
      .send(updatedVisit)
      .expect(200);

    expect(res.body.message).toBe('Visit updated');
    expect(res.body.updatedVisit.checkOutTime).toBe(updatedVisit.checkOutTime);
    expect(res.body.updatedVisit.duration).toBe(updatedVisit.duration);
  });

  it('should delete a visit by ID', async () => {
    const newVisit = {
      visitorName: 'Emily White',
      inmateNo: '3456',
      dateOfVisit: '2025-04-08',
      checkInTime: '03:00 PM',
      checkOutTime: '05:00 PM',
      duration: '2 hours'
    };

    const visitRes = await request(app)
      .post('/api/visit/add')
      .send(newVisit)
      .expect(201);

    const visitId = visitRes.body.newVisit._id;

    const res = await request(app)
      .delete(`/api/visit/delete/${visitId}`)
      .expect(200);

    expect(res.body.message).toBe('Visit deleted');
  });

  it('should return 404 if visit not found for deletion', async () => {
    const nonExistentId = '60d2b8f3b6a7909a5c74e3c1';

    const res = await request(app)
      .delete(`/api/visit/delete/${nonExistentId}`)
      .expect(404);

    expect(res.body.message).toBe('Visit not found');
  });
});
