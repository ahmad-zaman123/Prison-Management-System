const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema -> Menna me variable order ekata thamai values add wela insert wenne
const inmateSchema = new mongoose.Schema({
    image: String,
    fullname: {
        type:String,
        
    },
    initialname: {
        type:String,
   
    },
    birthday: {
        type:Date,
   
    },
    gender: {
        type:String,
     
    },
    nic: {
        type:String,
      
    },
    address: {
        type:String,
     
    },
    contactnumber: {
        type:String,
     
    },
    emergencycontactname: {
        type:String,
      
    },
    emergencycontactnumber: {
        type:String,
        
    },
    marital: {
        type:String,
        
    },
    occupation: {
        type:String,
      
    },
    education: {
        type:String,
        
    },
    religion: {
        type:String,
      
    },
    inmatenumber: {
        type:Number,
    },
    offense: {
        type:String,
      
    },
    sentence: {
        type:String,
      
    },
    admissionDate: {
        type:Date,
      
    },
    releaseDate: {
        type:Date,
      
    },
    years: {
        type:Number,
      
    },
    months: {
        type:Number,
      
    },
    days: {
        type:Number,
      
    },
    cellNumber: {
        type:String,
      
    },
    medicalConditions: {
        type:String,
      
    },
    additionalNotes: {
        type:String,
      
    },
    realReleaseDate: {
        type:Date,
      
    },
    releaseReason: {
        type:String,
      
    },
    releaseBy: {
        type:String,
      
    },
    confirmReleased: {
        type:String,
      
    },
    status: {
        type:String,

    },
    escapedDate: {
        type:Date,

    },
    escapedTime: {
        type:String,

    },
    escapedLocation: {
        type:String,

    },
    physicalDescription: {
        type:String,

    },
    clothingDescription: {
        type:String,

    },
    foundDate: {
        type:Date,

    },
});




//const Student = mongoose.model(table name(document name), Schema name)
const Inmate = mongoose.model("inmate", inmateSchema) 

module.exports = Inmate; 