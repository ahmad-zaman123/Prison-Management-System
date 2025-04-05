require('dotenv').config(); 
const express = require('express')
const app =express()
const path = require('path')
const bodyParser = require('body-parser')
// const{logger} = require('./middleware/logger')
// const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors');
// const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn.js')
const mongoose = require('mongoose')
// const{logEvents} = require('./middleware/logger')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const PORT = process.env.PORT || 3500

console.log(process.env.NODE_ENV)



connectDB()

// Middleware
app.use(express.json());  // This ensures that req.body is parsed as JSON
app.use(cors()); 

app.use(bodyParser.json())
// app.use(cors(corsOptions))

// app.use(logger)
app.use(cookieParser())

app.use('/',express.static(path.join(__dirname,'public')))

app.use('/',require('./routes/root'))

app.use('/users', require('./routes/userRoutes.js'));

app.use("/Jailors",require("./routes/JailorRoutes.js"))

// Change this line in server.js
app.use("/Doctros", require("./routes/doctorRoutes.js"));


//Add inmate details
app.use("/inmate", require("./routes/inmates.js"))

//Add appointment details
app.use("/appointment", require("./routes/appointments.js"))

//Add appointment details
app.use("/healthrecord", require("./routes/healthrecords.js"))


//visitor management 
app.use('/api/visitor', require('./routes/visitorRoutes'));
app.use('/api/visit', require('./routes/visitRoutes'));



app.all('*',(req,res)=>{
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname,'views','404.html'))
    }else if(req.accepts('json')){
        res.join({message:'404 Not Found'})
    }else{
        res.type('txt').send('404 Not Found')
    }
})
// app.use(errorHandler)
mongoose.connection.once('open',()=>{
    console.log('Connected to mongoDB')
    app.listen(PORT,() => console.log(`server running on port ${PORT}`))
})

mongoose.connection.on('error',err =>{
    console.log(err)
    logEvents(`${err.no}:${err.code}\t${err.syscall}\t{err.hostname}`,'mongoErrLog.log')
})