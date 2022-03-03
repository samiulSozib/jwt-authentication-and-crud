const db = require('../model/database')
const Users = db.users
const jsonWebToken = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.registerUser = async(req, res, next) => {
    let { name, email, password } = req.body

    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password, salt)
    try {
        let registerUser = await Users.create({
            name: name,
            email: email,
            password: hashPassword
        })
        if (!registerUser) {
            return res.status(404).json({ msg: 'register fail' })
        }
        return res.status(200).json(registerUser)
    } catch (e) {
        console.log(e)
    }
}

exports.loginUser = async(req, res, next) => {
    try {
        let users = await Users.findAll({
            where: {
                email: req.body.email
            }
        })
        if (!users[0]) {
            return res.status(404).json({ msg: 'authentication fail' })
        }

        let passwordMatch = await bcrypt.compare(req.body.password, users[0].password)
        if (!passwordMatch) {
            return res.status(404).json({ msg: 'authentication fail' })
        }

        let userId = users[0].id
        let name = users[0].name
        let email = users[0].email

        let access_token = jsonWebToken.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '30s'
        })

        let refresh_token = jsonWebToken.sign({ userId, name, email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '7d'
        })

        let updateUser = await Users.update({
            refresh_token: refresh_token
        }, {
            where: {
                id: userId
            }
        })

        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })

        res.json({ access_token })

    } catch (e) {
        console.log(e)
    }
}

exports.logout = async(req, res, next) => {
    let refresh_token = req.cookies.refresh_token
    console.log(refresh_token)
    if (!refresh_token) {
        return res.status(404).json({ msg: 'something wrong' })
    }
    const users = await Users.findAll({
        where: {
            refresh_token: refresh_token
        }
    })
    if (!users[0]) {
        return res.status(404).json({ msg: 'something wrong' })
    }

    const userId = users[0].id
    await Users.update({
        refresh_token: null
    }, {
        where: {
            id: userId
        }
    })

    res.clearCookie('refresh_token')
    res.end()
    return res.status(200)
}