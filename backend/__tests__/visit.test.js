const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Import the visit routes
const visitRoutes = require('../routes/visitRoutes');
const Visit = require('../models/Visit');

// Middleware to parse JSON
app.use(express.json());

// Mount the visit routes
app.use('/api/visit', visitRoutes);

// Connect to an in-memory database for testing
beforeAll(async () => {
  const url = 'mongodb://localhost:27017/test_db'; // Change the DB name as needed
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

// Clear all visit data before each test (reset DB)
beforeEach(async () => {
  await Visit.deleteMany();
});

// Disconnect from DB after all tests
afterAll(async () => {
  await mongoose.disconnect();
});

describe('Visit API', () => {

  // Test the GET all visits route
  it('should return all visits', async () => {
    const res = await request(app)
      .get('/api/visit')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true); // Should return an array
    expect(res.body.length).toBe(0); // Initially, the database should be empty
  });

  // Test the GET visit by ID route
  it('should return a specific visit by ID', async () => {
    // First, create a new visit
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

    // Now, fetch the visit by ID
    const res = await request(app)
      .get(`/api/visit/${visitId}`)
      .expect(200);

    expect(res.body.visitorName).toBe(newVisit.visitorName);
    expect(res.body.inmateNo).toBe(newVisit.inmateNo);
    expect(res.body.dateOfVisit).toBe(newVisit.dateOfVisit);
  });

  // Test the POST create visit route
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

  // Test the PUT update visit by ID route
  it('should update an existing visit', async () => {
    // First, create a new visit
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

    // Now, update the visit
    const updatedVisit = {
      checkOutTime: '05:00 PM', // Changing the checkout time
      duration: '3 hours' // Changing the duration
    };

    const res = await request(app)
      .put(`/api/visit/update/${visitId}`)
      .send(updatedVisit)
      .expect(200);

    expect(res.body.message).toBe('Visit updated');
    expect(res.body.updatedVisit.checkOutTime).toBe(updatedVisit.checkOutTime);
    expect(res.body.updatedVisit.duration).toBe(updatedVisit.duration);
  });

  // Test the DELETE visit by ID route
  it('should delete a visit by ID', async () => {
    // First, create a new visit
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

    // Now, delete the visit
    const res = await request(app)
      .delete(`/api/visit/delete/${visitId}`)
      .expect(200);

    expect(res.body.message).toBe('Visit deleted');
  });

  // Test deleting a visit that doesn't exist
  it('should return 404 if visit not found for deletion', async () => {
    const nonExistentId = '60d2b8f3b6a7909a5c74e3c1';

    const res = await request(app)
      .delete(`/api/visit/delete/${nonExistentId}`)
      .expect(404);

    expect(res.body.message).toBe('Visit not found');
  });
});
