require('dotenv').config()
const User = require('../model/User')
const BlackList = require('../model/Blacklist')
const JWT = require('jsonwebtoken')

async function registerAccount(req, res) {

    try {
        const { username, password, email, firstName, lastName, birthDate } = req.body

        if (!username || !password || !email || !firstName || !lastName || !birthDate) {
            return res.status(400).json({ message: 'All fields required!' })
        }

        const existingUser = await User.findOne({ email })
        const existingUsername = await User.findOne({ username })

        if (existingUser) return res.status(409).json({ message: "Account exists" })
        if (existingUsername) return res.status(409).json({ message: 'Username exists' })

        const newUser = await User.create({
            username,
            firstName,
            lastName,
            email,
            birthDate,
            password
        })

        res.status(201).json(newUser)
    } catch (error) {

        console.error('Error creating user:', error)
        return res.status(500).json({
            message: 'Server error',
            details: error.message
        })
    }


}

async function login(req, res) {

    try {
        const { username, password } = req.body
        if (!username || !password) {
            return res.status(400).json({ message: 'Please fill out all fields' })
        }
        const user = await User.findOne({ username }).select("+password")
        if (!user) return res.status(400).json({ message: ' Incorrect information entered' })
        const correctPassword = await user.isCorrectPassword(password)
        if (!correctPassword) return res.status(400).json({ message: ' Incorrect information entered' })

        const payload = {
            user: {
                _id: user._id,
                email: user.email,
                username: user.username
            }
        }
        const token = JWT.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        )
        res.status(200).json({ token, user: { username: user.username, email: user.email } })


    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }

}

async function logout(req, res) {
    const token = req.cookies?.accessToken;

    if (token) {
        await BlackList.create({ token });
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.status(200).json({ message: "Logged out" });
}




module.exports = { registerAccount, login, logout }