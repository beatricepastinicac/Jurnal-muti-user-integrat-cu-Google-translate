const JournalEntry = require('../models/JournalEntry') // modelul jurnal
const axios = require('axios') // librarie pt cereri http

const journalController = {
    // creeaza o noua intrare in jurnal
    create: async (req, res) => {
        try {
            const { title, content, originalLanguage = 'ro' } = req.body // preia datele din req
            const entry = await JournalEntry.create({
                title, // titlu intrare
                content, // continut intrare
                originalLanguage, // limba originala
                UserId: req.user.id // id-ul user-ului autentificat
            })
            res.status(201).json({
                message: 'intrare creata cu succes', // mesaj de succes
                entry // returneaza intrarea
            })
        } catch (error) {
            console.error('eroare la crearea intrarii:', error) // log eroare
            res.status(500).json({ 
                message: 'eroare la crearea intrarii in jurnal', // mesaj eroare
                error: error.message // detalii eroare
            })
        }
    },

    // obtine toate intrarile user-ului
    getAllEntries: async (req, res) => {
        try {
            const entries = await JournalEntry.findAll({
                where: { UserId: req.user.id }, // filtreaza dupa user-ul autentificat
                order: [['createdAt', 'DESC']] // ordoneaza dupa data descrescator
            })
            res.json(entries) // returneaza lista de intrari
        } catch (error) {
            console.error('eroare la obtinerea intrarilor:', error)
            res.status(500).json({ 
                message: 'eroare la obtinerea intrarilor din jurnal', // mesaj eroare
                error: error.message 
            })
        }
    },

    // obtine o intrare dupa id
    getEntry: async (req, res) => {
        try {
            const entry = await JournalEntry.findOne({
                where: {
                    id: req.params.id, // id-ul intrarii
                    UserId: req.user.id // id-ul user-ului
                }
            })

            if (!entry) {
                return res.status(404).json({ 
                    message: 'intrarea nu a fost gasita' // intrarea nu exista
                })
            }

            res.json(entry) // returneaza intrarea gasita
        } catch (error) {
            console.error('eroare la obtinerea intrarii:', error)
            res.status(500).json({ 
                message: 'eroare la obtinerea intrarii din jurnal', 
                error: error.message 
            })
        }
    },

    // actualizeaza o intrare
    updateEntry: async (req, res) => {
        try {
            const { title, content } = req.body // datele noi pt actualizare
            const entry = await JournalEntry.findOne({
                where: {
                    id: req.params.id, // id-ul intrarii
                    UserId: req.user.id // id-ul user-ului
                }
            })

            if (!entry) {
                return res.status(404).json({ 
                    message: 'intrarea nu a fost gasita' 
                })
            }

            // actualizeaza titlul si continutul, daca sunt disponibile
            await entry.update({
                title: title || entry.title, 
                content: content || entry.content
            })

            res.json({
                message: 'intrare actualizata cu succes', // mesaj succes
                entry // returneaza intrarea actualizata
            })
        } catch (error) {
            console.error('eroare la actualizarea intrarii:', error)
            res.status(500).json({ 
                message: 'eroare la actualizarea intrarii',
                error: error.message 
            })
        }
    },

    // sterge o intrare
    deleteEntry: async (req, res) => {
        try {
            const result = await JournalEntry.destroy({
                where: {
                    id: req.params.id, // id-ul intrarii
                    UserId: req.user.id // id-ul user-ului
                }
            })

            if (!result) {
                return res.status(404).json({ 
                    message: 'intrarea nu a fost gasita' 
                })
            }

            res.json({ 
                message: 'intrare stearsa cu succes' // mesaj succes
            })
        } catch (error) {
            console.error('eroare la stergerea intrarii:', error)
            res.status(500).json({ 
                message: 'eroare la stergerea intrarii',
                error: error.message 
            })
        }
    }
}

module.exports = journalController // exporta controller-ul pt utilizare in rute
