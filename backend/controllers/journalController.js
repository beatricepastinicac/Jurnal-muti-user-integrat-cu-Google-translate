const JournalEntry = require('../models/JournalEntry');
const axios = require('axios');

const journalController = {
    // Creare intrare nouă în jurnal
    create: async (req, res) => {
        try {
            const { title, content, originalLanguage = 'ro' } = req.body;
            const entry = await JournalEntry.create({
                title,
                content,
                originalLanguage,
                UserId: req.user.id
            });
            
            res.status(201).json({
                message: 'Intrare creată cu succes',
                entry
            });
        } catch (error) {
            console.error('Eroare la crearea intrării:', error);
            res.status(500).json({ 
                message: 'Eroare la crearea intrării în jurnal',
                error: error.message 
            });
        }
    },

    // Obține toate intrările utilizatorului
    getAllEntries: async (req, res) => {
        try {
            const entries = await JournalEntry.findAll({
                where: { UserId: req.user.id },
                order: [['createdAt', 'DESC']]
            });
            
            res.json(entries);
        } catch (error) {
            console.error('Eroare la obținerea intrărilor:', error);
            res.status(500).json({ 
                message: 'Eroare la obținerea intrărilor din jurnal',
                error: error.message 
            });
        }
    },

    // Obține o intrare specifică
    getEntry: async (req, res) => {
        try {
            const entry = await JournalEntry.findOne({
                where: {
                    id: req.params.id,
                    UserId: req.user.id
                }
            });

            if (!entry) {
                return res.status(404).json({ 
                    message: 'Intrarea nu a fost găsită' 
                });
            }

            res.json(entry);
        } catch (error) {
            console.error('Eroare la obținerea intrării:', error);
            res.status(500).json({ 
                message: 'Eroare la obținerea intrării din jurnal',
                error: error.message 
            });
        }
    },

    // Actualizare intrare
    updateEntry: async (req, res) => {
        try {
            const { title, content } = req.body;
            const entry = await JournalEntry.findOne({
                where: {
                    id: req.params.id,
                    UserId: req.user.id
                }
            });

            if (!entry) {
                return res.status(404).json({ 
                    message: 'Intrarea nu a fost găsită' 
                });
            }

            await entry.update({
                title: title || entry.title,
                content: content || entry.content
            });

            res.json({
                message: 'Intrare actualizată cu succes',
                entry
            });
        } catch (error) {
            console.error('Eroare la actualizarea intrării:', error);
            res.status(500).json({ 
                message: 'Eroare la actualizarea intrării',
                error: error.message 
            });
        }
    },

    // Ștergere intrare
    deleteEntry: async (req, res) => {
        try {
            const result = await JournalEntry.destroy({
                where: {
                    id: req.params.id,
                    UserId: req.user.id
                }
            });

            if (!result) {
                return res.status(404).json({ 
                    message: 'Intrarea nu a fost găsită' 
                });
            }

            res.json({ 
                message: 'Intrare ștearsă cu succes' 
            });
        } catch (error) {
            console.error('Eroare la ștergerea intrării:', error);
            res.status(500).json({ 
                message: 'Eroare la ștergerea intrării',
                error: error.message 
            });
        }
    }
};

module.exports = journalController;