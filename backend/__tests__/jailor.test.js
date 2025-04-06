const request = require('supertest');
const app = require('../server');

let jailorId;

describe('Jailor API', () => {
  it('should add a new jailor', async () => {
    const newJailor = {
      FirstName: 'John',
      LastName: 'Doe',
      DateofBirth: '1985-12-12',
      ContactNumber: 123456789,
      EmergencyContactNumber: 987654321,
      MaritalStatus: 'Single',
      Gender: 'Male',
      jobTitle: 'Jailor',
      Department: 'Security',
      StartDate: '2020-01-01',
    };

    const res = await request(app).post('/Jailors').send(newJailor);
    expect(res.statusCode).toBe(201);
    expect(res.body.FirstName).toBe(newJailor.FirstName);
    expect(res.body.LastName).toBe(newJailor.LastName);
    jailorId = res.body._id;
  });

  it('should get all jailors', async () => {
    const res = await request(app).get('/Jailors');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get a jailor by ID', async () => {
    const res = await request(app).get(`/Jailors/${jailorId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(jailorId);
  });

  it('should update a jailor by ID', async () => {
    const updatedData = {
      FirstName: 'Johnathan',
      LastName: 'Doe',
      MaritalStatus: 'Married',
    };
    const res = await request(app).put(`/Jailors/${jailorId}`).send(updatedData);
    expect(res.statusCode).toBe(200);
    expect(res.body.FirstName).toBe(updatedData.FirstName);
  });

  it('should delete a jailor by ID', async () => {
    const res = await request(app).delete(`/Jailors/${jailorId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Jailor deleted successfully');
  });
});
