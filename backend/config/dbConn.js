require('dotenv').config();
const mongoose = require('mongoose')

const connectDB = async() =>{
    try{
        await mongoose.connect('mongodb://localhost:27017/test')
    }catch(err){
        console.log(err)
    }
}
module.exports = connectDB