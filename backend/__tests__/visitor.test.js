const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const visitorRoutes = require('../routes/visitorRoutes');
const Visitor = require('../models/Visitor');

app.use(express.json());

app.use('/api/visitor', visitorRoutes);

beforeAll(async () => {
  const url = 'mongodb://localhost:27017/test_db';
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

beforeEach(async () => {
  await Visitor.deleteMany();
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Visitor API', () => {

  it('should return all visitors', async () => {
    const res = await request(app)
      .get('/api/visitor')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });

  it('should return a specific visitor by ID', async () => {
    const newVisitor = {
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1985-05-15',
      gender: 'Male',
      contactNumber: '1234567890',
      inmateNo: 'A123',
      inmateName: 'James Smith',
      dateOfVisit: '2025-04-05',
      timeOfVisit: '10:00 AM',
      purposeOfVisit: 'Family Visit'
    };

    const visitorRes = await request(app)
      .post('/api/visitor/add')
      .send(newVisitor)
      .expect(201);

    const visitorId = visitorRes.body.newVisitor._id;

    const res = await request(app)
      .get(`/api/visitor/${visitorId}`)
      .expect(200);

    expect(res.body.firstName).toBe(newVisitor.firstName);
    expect(res.body.lastName).toBe(newVisitor.lastName);
    expect(res.body.inmateNo).toBe(newVisitor.inmateNo);
  });

  it('should create a new visitor', async () => {
    const newVisitor = {
      firstName: 'Jane',
      lastName: 'Smith',
      dateOfBirth: '1990-08-20',
      gender: 'Female',
      contactNumber: '9876543210',
      inmateNo: 'B456',
      inmateName: 'David Brown',
      dateOfVisit: '2025-04-06',
      timeOfVisit: '11:00 AM',
      purposeOfVisit: 'Legal Visit'
    };

    const res = await request(app)
      .post('/api/visitor/add')
      .send(newVisitor)
      .expect(201);

    expect(res.body.message).toBe('Visitor Added Success');
    expect(res.body.newVisitor.firstName).toBe(newVisitor.firstName);
    expect(res.body.newVisitor.inmateNo).toBe(newVisitor.inmateNo);
  });

  it('should update an existing visitor', async () => {
    const newVisitor = {
      firstName: 'Tom',
      lastName: 'Jones',
      dateOfBirth: '1980-03-10',
      gender: 'Male',
      contactNumber: '5551234567',
      inmateNo: 'C789',
      inmateName: 'Robert White',
      dateOfVisit: '2025-04-07',
      timeOfVisit: '01:00 PM',
      purposeOfVisit: 'Medical Visit'
    };

    const visitorRes = await request(app)
      .post('/api/visitor/add')
      .send(newVisitor)
      .expect(201);

    const visitorId = visitorRes.body.newVisitor._id;

    const updatedVisitor = {
      timeOfVisit: '02:00 PM',
      purposeOfVisit: 'Psychological Visit'
    };

    const res = await request(app)
      .put(`/api/visitor/update/${visitorId}`)
      .send(updatedVisitor)
      .expect(200);

    expect(res.body.message).toBe('Visitor updated');
    expect(res.body.updatedVisitor.timeOfVisit).toBe(updatedVisitor.timeOfVisit);
    expect(res.body.updatedVisitor.purposeOfVisit).toBe(updatedVisitor.purposeOfVisit);
  });

  it('should delete a visitor by ID', async () => {
    const newVisitor = {
      firstName: 'Emily',
      lastName: 'White',
      dateOfBirth: '1987-07-25',
      gender: 'Female',
      contactNumber: '1237894560',
      inmateNo: 'D012',
      inmateName: 'William Green',
      dateOfVisit: '2025-04-08',
      timeOfVisit: '03:00 PM',
      purposeOfVisit: 'Social Visit'
    };

    const visitorRes = await request(app)
      .post('/api/visitor/add')
      .send(newVisitor)
      .expect(201);

    const visitorId = visitorRes.body.newVisitor._id;

    const res = await request(app)
      .delete(`/api/visitor/delete/${visitorId}`)
      .expect(200);

    expect(res.body.message).toBe('Visitor deleted');
  });

  it('should return 404 if visitor not found for deletion', async () => {
    const nonExistentId = '60d2b8f3b6a7909a5c74e3c1';

    const res = await request(app)
      .delete(`/api/visitor/delete/${nonExistentId}`)
      .expect(404);

    expect(res.body.message).toBe('Visitor not found');
  });
});
