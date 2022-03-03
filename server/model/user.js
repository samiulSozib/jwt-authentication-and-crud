module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('users', {
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        refresh_token: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: true
    })
    return User
}