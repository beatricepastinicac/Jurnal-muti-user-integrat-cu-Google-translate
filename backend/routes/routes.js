const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./User'); // Ruta pentru modelul User
const Note = require('./Note'); // Ruta pentru modelul Note

const router = express.Router();

// Middleware pentru autentificare
const authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'Acces interzis. Token lipsă.' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token invalid.' });
  }
};

// **CRUD pentru User**
router.post('/users', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Nume utilizator și parolă sunt obligatorii.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Eroare la crearea utilizatorului: ' + error.message });
  }
});

router.get('/users', authenticate, async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Eroare la preluarea utilizatorilor.' });
  }
});

// **Login și autentificare**
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Nume utilizator și parolă sunt obligatorii.' });
  }

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ error: 'Utilizatorul nu a fost găsit.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Parola incorectă.' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Eroare la autentificare: ' + error.message });
  }
});

// **CRUD pentru Note**
router.post('/notes', authenticate, async (req, res) => {
  const { content, userId } = req.body;

  if (!content || !userId) {
    return res.status(400).json({ error: 'Conținutul notei și ID-ul utilizatorului sunt obligatorii.' });
  }

  try {
    const note = await Note.create({ content, userId });
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ error: 'Eroare la crearea notei: ' + error.message });
  }
});

router.get('/notes', authenticate, async (req, res) => {
  try {
    const notes = await Note.findAll();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Eroare la preluarea notelor.' });
  }
});

// Exportă router-ul pentru utilizare în server.js
module.exports = router;
