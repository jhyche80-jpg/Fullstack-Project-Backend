const express = require('express')
const router = express.Router()
const { registerAccount, login, logout } = require('../controller/authcontroller')


router.post('/register', registerAccount)
router.post('/login', login)
router.post('/logout', logout)

module.exports = router 