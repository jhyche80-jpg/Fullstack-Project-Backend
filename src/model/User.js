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
        match: /.+@.+\..+/
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
    role: {
        enum: ['owner', 'joint'],
        default: 'owner',
        required: true
    }
})

//  hashpassword

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password)
}

model.exports = model('User', userSchema)