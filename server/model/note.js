module.exports = (sequelize, DataTypes) => {
    const Note = sequelize.define('notes', {
        title: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        author: {
            type: DataTypes.STRING
        },
        author_id: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: true
    })
    return Note
}