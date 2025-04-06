// Import the Doctor model
const app = require('../server'); 
const request = require('supertest'); 
const Doctor = require('../models/DoctorModel'); 
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server-core');
const mongoServer = new MongoMemoryServer();


beforeAll(async () => {

    await mongoServer.start();  
    const uri = mongoServer.getUri();  
  
   
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    }
  
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});


beforeEach(async () => {
    
    const count = await Doctor.countDocuments();
    if (count > 0) {
        await Doctor.deleteMany({});
    }
});


let doctorId; 


const doctorData = {
    FirstName: 'John',
    LastName: 'Doe',
    DateofBirth: new Date('1980-01-01'),  
    NIC: 1234567890,  
    ContactNumber: '1234567890',
    Gender: 'Male',  
    Specialty: 'Cardiology',
    MedicalLicenseNumber: 'MD12345',
    EducationalBackground: 'MBBS, MD in Cardiology',  
    StartDate: new Date('2010-01-01'),  
  };
  
describe('Doctor API', () => {

    // Test for getting all doctors
    it('should get all doctors', async () => {
      const res = await request(app).get('/Doctros/');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  
    // Test for adding a new doctor
    it('should add a new doctor', async () => {
      const res = await request(app)
        .post('/Doctros/')
        .send(doctorData);

        doctorId = res.body._id;
        
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.FirstName).toBe(doctorData.FirstName);
      expect(res.body.Specialty).toBe(doctorData.Specialty);
  
      doctorId = res.body._id;  
    });
  
    // Test for getting a single doctor by ID
    it('should get a single doctor by ID', async () => {
      const res = await request(app).get(`/Doctros/${doctorId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body._id).toBe(doctorId);
      expect(res.body.FirstName).toBe(doctorData.FirstName);
    });
  
    // Test for returning 404 if doctor not found by ID
    it('should return 404 if doctor not found by ID', async () => {
      const res = await request(app).get('/Doctros/invalid-id');
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('Doctor not found');
    });
  
    // Test for updating a doctor by ID
    it('should update a doctor by ID', async () => {
      const updatedData = { ...doctorData, Specialty: 'Neurology' };
      const res = await request(app)
        .put(`/Doctros/${doctorId}`)
        .send(updatedData);
  
      expect(res.statusCode).toBe(200);
      expect(res.body.Specialty).toBe('Neurology');
    });
  
    // Test for deleting a doctor by ID
    it('should delete a doctor by ID', async () => {
      const res = await request(app).delete(`/Doctros/${doctorId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Doctor deleted successfully');
    });
  
    // Test for returning 404 if doctor not found during deletion
    it('should return 404 if trying to delete a non-existent doctor', async () => {
      const res = await request(app).delete('/Doctros/invalid-id');
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('Doctor not found');
    });
  
  });