require('dotenv').config()
const express = require('express')
const app = express()

const connectDB = require('./src/config/connection')
// import routers
const authRouter = require('./src/routes/authRouter')
const projectRouter = require('./src/routes/projectRouter')

// middle ware 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// router calling 
app.use('/auth', authRouter)
app.use('/project', projectRouter)

// start server 

connectDB()
    .then(() => {
        app.listen(process.env.PORT, () => console.log('Connected to server!'))
    })
    .catch(error => {
        console.error('Error connecting to server', error)
        process.exit(1)
    })