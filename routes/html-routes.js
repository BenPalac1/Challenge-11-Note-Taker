const router = require('express').Router();
const path = require('path');

//get requests:
//GET * returns the index.html file
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});

//GET/notes returns the notes.html file
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});

module.exports = router;
