const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require("fs").promises;

const dbPath = "db/db.json";

// GET /api/notes should read the db.json file and return all saved notes as JSON
router.get('/api/notes', async (req, res) => {
  try {
    const userNotes = await fs.readFile(dbPath, 'utf8');
    res.json(JSON.parse(userNotes));
  } catch (err) {
    console.err('Error reading notes:', err);
    res.status(500).send('Server Error!');
  }
});

// POST /api/notes should receive a new note to save on the request body. Add it to the db.json file and then return the new note to the client.
router.post('/api/notes', async (req, res) => {
  try {
    const userNotes = JSON.parse(await fs.readFile(dbPath, 'utf8'));
    const newNote = {
      title: req.body.title,
      text: req.body.text,
      id: uuidv4(),
    };

    userNotes.push(newNote);
    await fs.writeFile(dbPath, JSON.stringify(userNotes));
    res.json(newNote);
  } catch (err) {
    console.err('Error Note note Saved!:', err);
    res.status(500).send('Server Error!');
  }
});

module.exports = router;