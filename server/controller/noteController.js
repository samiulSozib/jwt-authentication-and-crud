const db = require('../model/database')
const Notes = db.notes
const jsonWebToken = require('jsonwebtoken')

exports.createNotes = async(req, res, next) => {
    try {
        const createdNote = await Notes.create({
            title: req.body.title,
            description: req.body.description,
            author: req.body.author,
            author_id: req.body.author_id
        })
        if (!createdNote) {
            return res.status(404).json({ msg: 'note created success' })
        }
        return res.json(createdNote)

    } catch (e) {
        console.log(e)
    }
}


exports.getAllNotes = async(req, res, next) => {
    try {
        const notes = await Notes.findAll()
        return res.json(notes)
    } catch (e) {
        console.log(e)
    }
}


exports.getNotesByUser = async(req, res, next) => {
    try {
        let id;
        const refresh_token = req.cookies.refresh_token
        if (!refresh_token) {
            return res.status(404).json({ msg: 'something wrong' })
        }
        jsonWebToken.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, (error, decode) => {
            if (error) {
                return res.status(404).json({ msg: 'something wrong' })
            }
            id = decode.userId
        })
        const notes = await Notes.findAll({
            where: {
                author_id: id
            }
        })
        res.json(notes)
    } catch (e) {
        console.log(e)
    }
}

exports.deleteNote = async(req, res, next) => {
    try {
        const note_id = req.params.id
        const deleteNote = await Notes.destroy({
            where: {
                id: note_id
            }
        })
        if (!deleteNote) {
            return res.status(404).json({ msg: 'fail' })
        }
        return res.json(deleteNote)
    } catch (e) {
        console.log(e)
    }
}


exports.updateNote = async(req, res, next) => {
    try {
        const note_id = req.params.id
        const updatedNote = await Notes.update({
            title: req.body.title,
            description: req.body.description
        }, {
            where: {
                id: note_id
            }
        })
        if (!updatedNote) {
            return res.status(404).json({ msg: 'fail' })
        }
        return res.json(updatedNote)
    } catch (e) {
        console.log(e)
    }
}

exports.singleNote = async(req, res, next) => {
    try {
        const note_id = req.params.id
        const note = await Notes.findByPk(note_id)
        res.json(note)
    } catch (e) {
        console.log(e)
    }
}