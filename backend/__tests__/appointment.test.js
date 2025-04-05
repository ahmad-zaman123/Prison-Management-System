const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../server'); // Your Express app
const Appointment = require('../models/appointment');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

afterEach(async () => {
  await Appointment.deleteMany();
});

describe('Appointment API', () => {
  
  it('should add a new appointment', async () => {
    const sampleData = {
      fullname: 'John Doe',
      inmatenumber: '123',
      reason: 'Checkup',
      appointmentDate: '2025-05-01',
      notes: 'Urgent',
      action: 'Pending'
    };

    const res = await request(app)
      .post('/appointment/addappointments')  // Ensure the endpoint is correct
      .send(sampleData);

    expect(res.statusCode).toBe(201);
    expect(res.text).toBe('New appointment added successfully');

    // Check if the appointment exists in the database
    const dbAppointment = await Appointment.findOne({ fullname: 'John Doe' });
    expect(dbAppointment).not.toBeNull();
    expect(dbAppointment.fullname).toBe('John Doe');
  });

  it('should get all not-approved appointments', async () => {
    const sampleData = {
      fullname: 'John Doe',
      inmatenumber: '123',
      reason: 'Checkup',
      appointmentDate: '2025-05-01',
      notes: 'Urgent',
      action: 'Pending'
    };
    await Appointment.create(sampleData);

    const res = await request(app).get('/appointment/findall');  // Ensure correct endpoint

    expect(res.statusCode).toBe(200);
    expect(res.body[0].action).toBe('Pending');
  });

  it('should get all approved appointments', async () => {
    const sampleData = {
      fullname: 'John Doe',
      inmatenumber: '123',
      reason: 'Checkup',
      appointmentDate: '2025-05-01',
      notes: 'Urgent',
      action: 'Approved'
    };
    await Appointment.create(sampleData);

    const res = await request(app).get('/appointment/approved');  // Ensure correct endpoint

    expect(res.statusCode).toBe(200);
    expect(res.body[0].action).toBe('Approved');
  });

  it('should get a single appointment by ID', async () => {
    const sampleData = {
      fullname: 'John Doe',
      inmatenumber: '123',
      reason: 'Checkup',
      appointmentDate: '2025-05-01',
      notes: 'Urgent',
      action: 'Pending'
    };
    const appointment = await Appointment.create(sampleData);

    const res = await request(app).get(`/appointment/${appointment._id}`);  // Ensure correct endpoint

    expect(res.statusCode).toBe(200);
    expect(res.body.fullname).toBe('John Doe');
  });

  it('should return 404 if appointment not found by ID', async () => {
    const fakeId = new mongoose.Types.ObjectId();

    const res = await request(app).get(`/appointment/${fakeId}`);  // Ensure correct endpoint

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Appointment not found');
  });

  it('should update an appointment by ID', async () => {
    const sampleData = {
      fullname: 'John Doe',
      inmatenumber: '123',
      reason: 'Checkup',
      appointmentDate: '2025-05-01',
      notes: 'Urgent',
      action: 'Pending'
    };
    const appointment = await Appointment.create(sampleData);

    const res = await request(app)
      .put(`/appointment/update/${appointment._id}`)  // Ensure correct endpoint
      .send({ action: 'Approved' });

    expect(res.statusCode).toBe(200);
    expect(res.body.action).toBe('Approved');
  });

  it('should delete an appointment by ID', async () => {
    const sampleData = {
      fullname: 'John Doe',
      inmatenumber: '123',
      reason: 'Checkup',
      appointmentDate: '2025-05-01',
      notes: 'Urgent',
      action: 'Pending'
    };
    const appointment = await Appointment.create(sampleData);

    const res = await request(app)
      .delete(`/appointment/delete/${appointment._id}`);  // Ensure correct endpoint

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Appointment deleted successfully');
  });

  it('should return 404 if trying to delete a non-existent appointment', async () => {
    const fakeId = new mongoose.Types.ObjectId();


    const res = await request(app)
      .delete(`/appointment/delete/${fakeId}`);  // Ensure correct endpoint

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Appointment not found');
  });
});
