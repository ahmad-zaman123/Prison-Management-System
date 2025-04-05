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
      
    }
    
});




//const Student = mongoose.model(table name(document name), Schema name)
const Inmate = mongoose.model("inmate", inmateSchema) //inmate = database document(table) name eka

module.exports = Inmate; //Aniwarenma export karanna ona(Meka ona wenne routes folder ekedi)