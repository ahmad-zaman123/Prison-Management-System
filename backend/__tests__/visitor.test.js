const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Import the visitor routes
const visitorRoutes = require('./routes/visitorRoutes');
const Visitor = require('./models/Visitor');

// Middleware to parse JSON
app.use(express.json());

// Mount the visitor routes
app.use('/api/visitor', visitorRoutes);

// Connect to an in-memory database for testing
beforeAll(async () => {
  const url = 'mongodb://localhost:27017/test_db'; // Change the DB name as needed
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

// Clear all visitor data before each test (reset DB)
beforeEach(async () => {
  await Visitor.deleteMany();
});

// Disconnect from DB after all tests
afterAll(async () => {
  await mongoose.disconnect();
});

describe('Visitor API', () => {

  // Test the GET all visitors route
  it('should return all visitors', async () => {
    const res = await request(app)
      .get('/api/visitor')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true); // Should return an array
    expect(res.body.length).toBe(0); // Initially, the database should be empty
  });

  // Test the GET visitor by ID route
  it('should return a specific visitor by ID', async () => {
    // First, create a new visitor
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

    // Now, fetch the visitor by ID
    const res = await request(app)
      .get(`/api/visitor/${visitorId}`)
      .expect(200);

    expect(res.body.firstName).toBe(newVisitor.firstName);
    expect(res.body.lastName).toBe(newVisitor.lastName);
    expect(res.body.inmateNo).toBe(newVisitor.inmateNo);
  });

  // Test the POST create visitor route
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

  // Test the PUT update visitor by ID route
  it('should update an existing visitor', async () => {
    // First, create a new visitor
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

    // Now, update the visitor
    const updatedVisitor = {
      timeOfVisit: '02:00 PM', // Changing the time of visit
      purposeOfVisit: 'Psychological Visit' // Changing the purpose of visit
    };

    const res = await request(app)
      .put(`/api/visitor/update/${visitorId}`)
      .send(updatedVisitor)
      .expect(200);

    expect(res.body.message).toBe('Visitor updated');
    expect(res.body.updatedVisitor.timeOfVisit).toBe(updatedVisitor.timeOfVisit);
    expect(res.body.updatedVisitor.purposeOfVisit).toBe(updatedVisitor.purposeOfVisit);
  });

  // Test the DELETE visitor by ID route
  it('should delete a visitor by ID', async () => {
    // First, create a new visitor
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

    // Now, delete the visitor
    const res = await request(app)
      .delete(`/api/visitor/delete/${visitorId}`)
      .expect(200);

    expect(res.body.message).toBe('Visitor deleted');
  });

  // Test deleting a visitor that doesn't exist
  it('should return 404 if visitor not found for deletion', async () => {
    const nonExistentId = '60d2b8f3b6a7909a5c74e3c1';

    const res = await request(app)
      .delete(`/api/visitor/delete/${nonExistentId}`)
      .expect(404);

    expect(res.body.message).toBe('Visitor not found');
  });
});
