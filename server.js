require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const connectDB = require('./src/config/connection')
// import routers
const authRouter = require('./src/routes/authRouter')
const projectRouter = require('./src/routes/projectRouter')
const taskRouter = require('./src/routes/taskRouter')
const cors = require("cors")

// middle ware 
app.use(cors({
    origin: process.env.CLIENT_URL, // frontend origin
    credentials: true,               // needed if sending cookies/JWT
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// router calling 
app.use('/auth', authRouter)
app.use('/projects', projectRouter)
app.use('/', taskRouter)
// start server 

connectDB()
    .then(() => {
        app.listen(process.env.PORT, () => console.log("Mongo DB:", mongoose.connection.name))
    })
    .catch(error => {
        console.error('Error connecting to server', error)
        process.exit(1)
    })