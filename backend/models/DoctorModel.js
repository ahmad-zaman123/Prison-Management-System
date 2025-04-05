const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
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
        type:Number,
        
    },
    ContactNumber:{
        type:Number,
        
    },
    Gender:{
        type:String,
        
    },
    Specialty:{
        type:String,
        
    },
    MedicalLicenseNumber:{
        type:String,
        
    },
    EducationalBackground:{
        type:String,
        
    },
    StartDate:{
        type:Date,
        
    },
   
})

module.exports = mongoose.model(
    "DoctorModel",
    DoctorSchema
)