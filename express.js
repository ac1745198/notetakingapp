const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid'); // Using UUID to generate unique IDs
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// File path for the db.json file
const dbFilePath = './db.json';

// Helper function to read data from the db.json file
const readDbFile = () => {
  try {
    const data = fs.readFileSync(dbFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading from db.json file:', err);
    return [];
  }
};

// Helper function to write data to the db.json file
const writeDbFile = (data) => {
  try {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing to db.json file:', err);
  }
};

// API endpoint to get all notes
app.get('/api/notes', (req, res) => {
  const notes = readDbFile();
  res.json(notes);
});

// API endpoint to add a new note
app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4(); // Generate a unique ID for the new note
  const notes = readDbFile();
  notes.push(newNote);
  writeDbFile(notes);
  res.status(201).json(newNote);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
