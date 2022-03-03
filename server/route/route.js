const authRoute = require('./authRoute')
const userRoute = require('./userRoute')
const tokenRoute = require('./token')
const noteRoute = require('./noteRoute')

const routes = [{
        path: '/notes',
        handler: noteRoute
    },
    {
        path: '/token',
        handler: tokenRoute
    },
    {
        path: '/users',
        handler: userRoute
    },
    {
        path: '/auth',
        handler: authRoute
    },
    {
        path: '/',
        handler: (req, res) => {
            return res.json({ msg: 'welcome to my application' })
        }
    }
]

module.exports = (app) => {
    routes.forEach(r => {
        if (r.path == '/') {
            app.get(r.path, r.handler)
        } else {
            app.use(r.path, r.handler)
        }
    })
}