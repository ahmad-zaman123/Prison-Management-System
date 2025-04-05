const request = require("supertest");
jest.mock("../server", () => {
    const app = jest.requireActual("../server");
    app.listen = jest.fn(); // Mock the listen method
    return app;
  });
  
const app = require("../server"); // Adjust this if your server entry point is different
const mongoose = require("mongoose");
const HealthRecord = require("../models/healthrecord");

describe("HealthRecord API", () => {
  beforeAll(async () => {
    // Connect to MongoDB in memory before tests run
    const url = "mongodb://127.0.0.1:27017/test_prison_system";
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    // Disconnect from MongoDB after tests finish
    await mongoose.connection.close();
  });

  // Test: Create a new health record
  it("should create a new health record", async () => {
    const newRecord = {
      InmateName: "John Doe",
      dateOfBirth: "1979-04-05",
      diagnosis: "Flu",
      medications: "Paracetamol",
      notes: "Patient is recovering.",
    };

    const response = await request(app)
      .post("/healthrecord/addhealthrecords")
      .send(newRecord);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id"); // Check if an ID is returned
    expect(response.body.InmateName).toBe("John Doe");
  });

  // Test: Get all health records
  it("should get all health records", async () => {
    const response = await request(app).get("/healthrecord/healthrecords");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test: Get a health record by ID
  it("should get a health record by ID", async () => {
    const newRecord = await HealthRecord.create({
      InmateName: "Jane Doe",
      dateOfBirth: "1985-07-10",
      diagnosis: "Cold",
      medications: "Ibuprofen",
      notes: "Monitor progress.",
    });

    const response = await request(app).get(`/healthrecord/showhealthrecords/${newRecord._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("InmateName", "Jane Doe");
  });

  // Test: Return 404 if health record not found by ID
  it("should return 404 if health record not found by ID", async () => {
    const response = await request(app).get("/healthrecord/showhealthrecords/60c72b2f9b1d8b49b8fbb6f3"); // Invalid ID
    expect(response.status).toBe(404);
  });

  // Test: Update a health record by ID
  it("should update a health record by ID", async () => {
    const newRecord = await HealthRecord.create({
      InmateName: "Tom Smith",
      dateOfBirth: "1990-11-20",
      diagnosis: "Headache",
      medications: "Aspirin",
      notes: "Needs rest.",
    });

    const updatedRecord = {
      diagnosis: "Migraine",
      medications: "Ibuprofen",
    };

    const response = await request(app)
      .put(`/healthrecord/updatehealthrecords/${newRecord._id}`)
      .send(updatedRecord);

    expect(response.status).toBe(200);
    expect(response.body.diagnosis).toBe("Migraine");
    expect(response.body.medications).toBe("Ibuprofen");
  });

  // Test: Return 404 if trying to update a non-existent health record
  it("should return 404 if trying to update a non-existent health record", async () => {
    const response = await request(app)
      .put("/healthrecord/updatehealthrecords/60c72b2f9b1d8b49b8fbb6f3") // Invalid ID
      .send({
        diagnosis: "Flu",
        medications: "Paracetamol",
      });

    expect(response.status).toBe(404);
  });

  // Test: Delete a health record by ID
  it("should delete a health record by ID", async () => {
    const newRecord = await HealthRecord.create({
      InmateName: "Sam Green",
      dateOfBirth: "1988-05-15",
      diagnosis: "Allergy",
      medications: "Antihistamine",
      notes: "Avoid allergens.",
    });

    const response = await request(app).delete(`/healthrecord/deletehealthrecords/${newRecord._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("InmateName", "Sam Green");
  });

  // Test: Return 404 if trying to delete a non-existent health record
  it("should return 404 if trying to delete a non-existent health record", async () => {
    const response = await request(app).delete("/healthrecord/deletehealthrecords/60c72b2f9b1d8b49b8fbb6f3"); // Invalid ID
    expect(response.status).toBe(404);
  });
});
