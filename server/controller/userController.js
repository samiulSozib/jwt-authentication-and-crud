const db = require('../model/database')
const Users = db.users


exports.getUserInfo = async(req, res, next) => {
    try {
        const refresh_token = req.cookies.refresh_token
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

        res.json(users[0])
    } catch (e) {
        console.log(e)
    }
}