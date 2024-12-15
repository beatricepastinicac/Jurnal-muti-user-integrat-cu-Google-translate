const express = require('express');
const User = require('../models/User');
const Note = require('../models/Note');

const router = express.Router();

// CRUD pentru User
router.post('/users', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, { include: Note });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'Utilizatorul nu a fost găsit.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        const result = await User.destroy({ where: { id: req.params.id } });
        if (result) {
            res.json({ message: 'Utilizatorul a fost șters.' });
        } else {
            res.status(404).json({ error: 'Utilizatorul nu a fost găsit.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// CRUD pentru Note
router.post('/notes', async (req, res) => {
    try {
        const note = await Note.create(req.body);
        res.status(201).json(note);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/notes', async (req, res) => {
    try {
        const notes = await Note.findAll({ include: User });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/notes/:id', async (req, res) => {
    try {
        const result = await Note.update(req.body, { where: { id: req.params.id } });
        if (result[0]) {
            res.json({ message: 'Nota a fost actualizată.' });
        } else {
            res.status(404).json({ error: 'Nota nu a fost găsită.' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/notes/:id', async (req, res) => {
    try {
        const result = await Note.destroy({ where: { id: req.params.id } });
        if (result) {
            res.json({ message: 'Nota a fost ștearsă.' });
        } else {
            res.status(404).json({ error: 'Nota nu a fost găsită.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
