require('dotenv').config()

const mongoose = require('mongoose')
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connected to MongoDB") // Delete later 
    } catch (error) {
        console.error("Cannot connect to DB", error)
        process.exit(1)
    }

}
module.exports = connectDB