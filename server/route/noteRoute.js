const router = require('express').Router()
const { createNotes, getAllNotes, getNotesByUser, deleteNote, updateNote, singleNote } = require('../controller/noteController')
const { verifyToken } = require('../middleware/verifyToken')

router.get('/', verifyToken, getAllNotes)
router.post('/create', verifyToken, createNotes)
router.get('/my-notes', verifyToken, getNotesByUser)
router.delete('/delete/:id', verifyToken, deleteNote)
router.put('/update-note/:id', verifyToken, updateNote)
router.get('/my-notes/:id', verifyToken, singleNote)


module.exports = router