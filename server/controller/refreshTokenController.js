const db = require('../model/database')
const Users = db.users
const jsonWebToken = require('jsonwebtoken')

exports.refreshToken = async(req, res, next) => {
    try {
        let refresh_token = req.cookies.refresh_token
        if (!refresh_token) {
            return res.status(404).json({ msg: 'no token' })
        }
        let users = await Users.findAll({
            where: {
                refresh_token: refresh_token
            }
        })
        if (!users[0]) {
            return res.status(404).json({ msg: 'something wrong' })
        }
        jsonWebToken.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, (err, decode) => {
            if (err) {
                return res.status(404).json({ msg: 'something wrong' })
            }

            let userId = users[0].id
            let name = users[0].name
            let email = users[0].email

            const access_token = jsonWebToken.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '30s'
            })
            res.json({ access_token })
        })
    } catch (e) {
        console.log(e)
    }
}