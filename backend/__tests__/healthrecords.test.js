const request = require("supertest");
jest.mock("../server", () => {
    const app = jest.requireActual("../server");
    app.listen = jest.fn(); 
    return app;
});

const app = require("../server");
const mongoose = require("mongoose");
const HealthRecord = require("../models/healthrecord");

describe("HealthRecord API", () => {
  beforeAll(async () => {
    await HealthRecord.deleteMany();
    const db = "mongodb://127.0.0.1:27017/test_prison_system";
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

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
    expect(response.body).toHaveProperty("_id");
    expect(response.body.InmateName).toBe("John Doe");
  });

  it("should get all health records", async () => {
    const response = await request(app).get("/healthrecord/healthrecords");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

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

  it("should return 404 if health record not found by ID", async () => {
    const response = await request(app).get("/healthrecord/showhealthrecords/60c72b2f9b1d8b49b8fbb6f3");
    expect(response.status).toBe(404);
  });

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

  it("should return 404 if trying to update a non-existent health record", async () => {
    const response = await request(app)
      .put("/healthrecord/updatehealthrecords/60c72b2f9b1d8b49b8fbb6f3")
      .send({
        diagnosis: "Flu",
        medications: "Paracetamol",
      });

    expect(response.status).toBe(404);
  });

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

  it("should return 404 if trying to delete a non-existent health record", async () => {
    const response = await request(app).delete("/healthrecord/deletehealthrecords/60c72b2f9b1d8b49b8fbb6f3");
    expect(response.status).toBe(404);
  });
});
