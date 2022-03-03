const router = require('express').Router()
const { refreshToken } = require('../controller/refreshTokenController')

router.get('/', refreshToken)

module.exports = router