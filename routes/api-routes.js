const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require ("fs");

//GET /api/notes should read the db.json file and return all saved notes as JSON
router.get('/api/notes', async (req, res) => {
  const userNotes = await JSON.parse(fs.readFileSync("db/db.json","utf8"));
  res.json(userNotes);
});

//POST /api/notes should receive a new note to save on the request body. add it to the db.json file, and then return the new note to the client.
router.post('/api/notes', (req, res) => {
  const userNotes = JSON.parse(fs.readFileSync("db/db.json","utf8"));
  const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4(),
  };

  userNotes.push(newNote);
  fs.writeFileSync("db/db.json",JSON.stringify(userNotes));
  res.json(userNotes);
});

// router.delete('/api/notes/:id', (req, res) => {
//   let data = fs.readFileSync("db/db.json", "utf8");
//   const dataJSON =  JSON.parse(data);
//   const newNotes = dataJSON.filter((note) => { 
//     return note.id !== req.params.id;
//   });
  
//   fs.writeFileSync("db/db.json",JSON.stringify(newNotes));
//   res.json("Note deleted.");
// });

module.exports = router; 