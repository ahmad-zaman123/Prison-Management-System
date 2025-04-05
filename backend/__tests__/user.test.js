const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Import the user routes
const userRoutes = require('../routes/userRoutes');
const User = require('../models/User');

// Middleware to parse JSON
app.use(express.json());

// Mount the user routes
app.use('/users', userRoutes);

// Connect to an in-memory database for testing
beforeAll(async () => {
  const url = 'mongodb://localhost:27017/test'; // Change the DB name as needed
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

// Clear all user data before each test (reset DB)
beforeEach(async () => {
  await User.deleteMany();
});

// Disconnect from DB after all tests
afterAll(async () => {
  await mongoose.disconnect();
});

describe('User API', () => {

  // Test the register route
  it('should register a new user', async () => {
    const newUser = {
      username: 'testuser',
      password: 'testpassword'
    };

    const res = await request(app)
      .post('/users/register')
      .send(newUser)
      .expect(201);

    expect(res.body.username).toBe(newUser.username);
    expect(res.body.password).toBe(undefined); // Password should not be returned in response
    expect(res.status).toBe(201); // Status code 201 for created user
  });

  // Test the login route
  it('should login a registered user', async () => {
    const newUser = {
      username: 'testuser',
      password: 'testpassword'
    };

    // First, register the user
    await request(app).post('/users/register').send(newUser);

    const loginData = {
      username: 'testuser',
      password: 'testpassword'
    };

    const res = await request(app)
      .post('/users/login')
      .send(loginData)
      .expect(200);

    expect(res.body.message).toBe('Login successful');
    expect(res.body.token).toBeDefined(); // Assuming JWT token is generated
  });

  // Test the delete user route
  it('should delete a user', async () => {
    const newUser = {
      username: 'testuser',
      password: 'testpassword'
    };

    // First, register the user
    const registerRes = await request(app).post('/users/register').send(newUser);
    const userId = registerRes.body._id; // Get user ID from the response

    const res = await request(app)
      .delete('/users/deleteUser')
      .send({ userId }) // Send the userId in the request body
      .expect(200);

    expect(res.body.message).toBe('User deleted successfully');
  });

  // Test invalid login credentials
  it('should not login with invalid credentials', async () => {
    const invalidLoginData = {
      username: 'nonexistentuser',
      password: 'wrongpassword'
    };

    const res = await request(app)
      .post('/users/login')
      .send(invalidLoginData)
      .expect(400);

    expect(res.body.message).toBe('Invalid username or password');
  });
});
