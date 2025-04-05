// Import the Doctor model
const Doctor = require('../models/DoctorModel');  // Adjust the path as needed
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

// Define beforeEach hook outside of individual tests
beforeEach(async () => {
    // Clean up the database before each test
    const count = await Doctor.countDocuments();
    if (count > 0) {
        await Doctor.deleteMany({});
    }
});

// Define your test cases below
describe('Doctor API', () => {
    it('should add a new doctor', async () => {
        // Test logic for adding a doctor
    });

    it('should get all doctors', async () => {
        // Test logic for getting all doctors
    });

    it('should get a doctor by ID', async () => {
        // Test logic for getting a doctor by ID
    });

    it('should return 404 if doctor not found by ID', async () => {
        // Test logic for handling doctor not found by ID
    });

    it('should update a doctor by ID', async () => {
        // Test logic for updating a doctor by ID
    });

    it('should return 404 if trying to update a non-existent doctor', async () => {
        // Test logic for handling update of non-existent doctor
    });

    it('should delete a doctor by ID', async () => {
        // Test logic for deleting a doctor by ID
    });

    it('should return 404 if trying to delete a non-existent doctor', async () => {
        // Test logic for handling deletion of non-existent doctor
    });
});
