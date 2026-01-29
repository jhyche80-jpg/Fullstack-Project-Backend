const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        index: true,
        trim: true,
        required: true,
    },
    firstName: {
        type: String,
        required: [true, "Enter first name "],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, "Enter  Last name"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Enter email"],
        lowercase: true,
        trim: true,
        match: /.+@.+\..+/,
        unique: true
    },
    birthDate: {
        type: Date,
        required: [true, "Enter Birthday"],
        validate: [
            {
                validator: function (dob) {
                    return dob <= new Date();
                },
                message: "Date of birth cannot be in the future"
            },
            {
                validator: function (dob) {
                    const today = new Date();
                    const eighteenYearsAgo = new Date(
                        today.getFullYear() - 18,
                        today.getMonth(),
                        today.getDate()
                    );
                    return dob <= eighteenYearsAgo;
                },
                message: "User must be at least 18 years old"
            }
        ]
    },
    password: {
        required: [true, 'Enter password'],
        type: String,
        select: false
    },

})

//  hashpassword

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return
    this.password = await bcrypt.hash(this.password, 10)

})

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password)
}

module.exports = model('User', userSchema)