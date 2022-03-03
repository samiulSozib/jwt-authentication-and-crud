const router = require('express').Router()
const { registerUser, loginUser, logout } = require('../controller/authController')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.delete('/logout', logout)

module.exports = router