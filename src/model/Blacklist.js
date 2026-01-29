const { Schema, model } = require("mongoose")


const blackListSchema = new Schema({
    token: {
        type: String,
        required: true,
        ref: 'User'
    },
}, { timestamps: true })

module.exports = model('BlackList', blackListSchema)