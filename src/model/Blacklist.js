const { Schema, model } = require("mongoose")


const blackListSchema = new Schema({
    token: {
        type: String,
        required: true
    },
}, { timestamps: true })

module.exports = model('BlackList', blackListSchema)