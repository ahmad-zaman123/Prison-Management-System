const request = require("supertest");
const app = require("../server"); // Assuming the Express app is exported from server.js
const mongoose = require("mongoose");
const Inmate = require("../models/inmate"); // Import your Inmate model

// Sample test data
const inmateData = {
  fullname: "John Doe",
  initialname: "J. Doe",
  birthday: "1990-01-01",
  gender: "Male",
  nic: "1234567890",
  address: "123 Street, City",
  contactnumber: "1234567890",
  emergencycontactname: "Jane Doe",
  emergencycontactnumber: "0987654321",
  marital: "Single",
  occupation: "Engineer",
  education: "Bachelor's",
  religion: "Christian",
  inmatenumber: 12345,
  offense: "Robbery",
  sentence: "10 years",
  admissionDate: "2023-01-01",
  releaseDate: "2033-01-01",
  years: 10,
  months: 0,
  days: 0,
  cellNumber: "A12",
  medicalConditions: "None",
  additionalNotes: "No additional notes",
  realReleaseDate: "2033-01-01",
  releaseReason: "Completed sentence",
  releaseBy: "Court",
  confirmReleased: true,
  status: "Current",
  escapedDate: null,
  escapedTime: null,
  escapedLocation: null,
  physicalDescription: "Tall, slim",
  clothingDescription: "Prison uniform",
  foundDate: null,
};


describe("Inmate API Tests", () => {
  beforeAll(async () => {
    // Connect to MongoDB (use in-memory or real DB for tests)
    const mongoUri = "mongodb://localhost:27017/test_inmates_db"; // Use a separate DB for testing
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // Test 1: Add a new inmate
  it("should create a new inmate", async () => {
    const response = await request(app)
      .post("/inmate/addinmates")
      .send(inmateData)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(201);
    expect(response.text).toBe("New inmate added successfully");
  });

  // Test 2: Get all inmates
  it("should get all inmates", async () => {
    const response = await request(app).get("/inmate/getallinmates");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.Inmates)).toBe(true);
  });

  // Test 3: Get a single inmate by ID
  it("should get an inmate by ID", async () => {
    const inmate = await Inmate.create(inmateData);
    const response = await request(app).get(`/inmate/${inmate._id}`);
    expect(response.status).toBe(200);
    expect(response.body.Inmate._id).toBe(inmate._id.toString());
  });

  // Test 4: Update inmate details
  it("should update inmate details", async () => {
    const inmate = await Inmate.create(inmateData);
    const updatedData = { ...inmateData, fullname: "Johnathan Doe" };

    const response = await request(app)
      .put(`/inmate/${inmate._id}`)
      .send(updatedData)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(200);
    expect(response.body.fullname).toBe("Johnathan Doe");
  });

  // Test 5: Delete an inmate
  it("should delete an inmate", async () => {
    const inmate = await Inmate.create(inmateData);

    const response = await request(app).delete(`/inmate/${inmate._id}`);
    expect(response.status).toBe(200);
    expect(response.body.Inmate._id).toBe(inmate._id.toString());
  });

  // Test 6: Get released inmates
  it("should get all released inmates", async () => {
    await Inmate.create({ ...inmateData, status: "Released" });
    const response = await request(app).get("/inmate/getreleasedinmates");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0); // Ensure there are released inmates
  });

  // Test 7: Get wanted inmates
  it("should get all wanted inmates", async () => {
    await Inmate.create({ ...inmateData, status: "Wanted" });
    const response = await request(app).get("/inmate/getwantedinmates");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0); // Ensure there are wanted inmates
  });

  // Test 8: Get current inmates
  it("should get all current inmates", async () => {
    await Inmate.create({ ...inmateData, status: "Current" });
    const response = await request(app).get("/inmate/getcurrentinmates");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0); // Ensure there are current inmates
  });
});
