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

// DELETE /api/notes/:id should delete a note with the given ID
router.delete('/api/notes/:id', async (req, res) => {
  try {
    const noteId = req.params.id;
    let userNotes = JSON.parse(await fs.readFile(dbPath, 'utf8'));

    const noteIndex = userNotes.findIndex((note) => note.id === noteId);

    if (noteIndex !== -1) {
      // This removes the note from the array
      userNotes.splice(noteIndex, 1);
      // and then here we Write the updated array
      await fs.writeFile(dbPath, JSON.stringify(userNotes));
      res.json({ success: true, message: 'Note deleted' });
    } else {
      res.status(404).json({ success: false, message: 'Note not found' });
    };
  } catch (err) {
    console.err('Error Deleting:', err);
    res.status(500).send('Server Error');
  };
});

module.exports = router;