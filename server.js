require('dotenv').config()
const express = require('express')
const app = express()

const connectDB = require('./src/config/connection')
// import routers

// middle ware 


// router calling 


// start server 

connectDB()
    .then(() => {
        app.listen(process.env.PORT, () => console.log('Connected to server!'))
    })
    .catch(error => {
        console.error('Error connecting to server', error)
        process.exit(1)
    })