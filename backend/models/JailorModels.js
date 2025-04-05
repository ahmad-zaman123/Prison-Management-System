const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const jailorSchema = new Schema({
    FirstName:{
        type:String,
        
    },
    LastName:{
        type:String,
        
    },
    DateofBirth:{
        type:Date,
        
    },
    NIC:{
        type:String,
        
    },
    ContactNumber:{
        type:Number,
        
    },
    EmergencyContactNumber:{
        type:Number,
        
    },
    MaritalStatus:{
        type:String,
        
    },
    Religion:{
        type:String,
        
    },
    Gender:{
        type:String,
        
    },
    jobTitle:{
        type:String,
        
    },
    Department:{
        type:String,
        
    },
    StartDate:{
        type:Date,
        
    },
    EducationalBackground:{
        type:String,
        
    },
    RelevantCertifications:{
        type:String,
        
    },
    TrainingCoursesCompleted:{
        type:String,
        
    },
    UniformSize:{
        type:String,
        
    },
    IssuedEquipment:{
        type:String,
        
    },
    EquipmentTrainingStatus:{
        type:String,
        
    },
    MedicalConditions:{
        type:String,
        
    },
    Allergies:{
        type:String,
        
    },
    EmergencyMedicalInformation:{
        type:String,
        
        
    },
})

module.exports = mongoose.model(
    "JailorModels",
    jailorSchema
)