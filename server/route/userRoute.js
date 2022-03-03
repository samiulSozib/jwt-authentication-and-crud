const router = require('express').Router()
const { getUserInfo } = require('../controller/userController')
const { verifyToken } = require('../middleware/verifyToken')

router.get('/profile', verifyToken, getUserInfo)
module.exports = router