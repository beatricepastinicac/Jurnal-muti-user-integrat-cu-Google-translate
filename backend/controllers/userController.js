const User = require('../models/User') // modelul user
const jwt = require('jsonwebtoken') // librarie pt token jwt
const { Op } = require('sequelize');

const userController = {
    // inregistrare user nou
    register: async (req, res) => {
        try {
            const { username, email, password } = req.body // preia datele din req

            // verifica daca email sau username exista deja
            const existingUser = await User.findOne({ 
                where: { 
                    [Op.or]: [
                        { email: email }, // cauta dupa email
                        { username: username } // cauta dupa username
                    ]
                }
            })

            if (existingUser) {
                return res.status(400).json({ 
                    message: 'email sau username deja inregistrat' 
                })
            }

            // creaza user nou
            const user = await User.create({
                username, // nume user
                email, // email user
                password // parola user
            })

            // genereaza token jwt
            const token = jwt.sign(
                { id: user.id }, // payload cu id-ul user-ului
                process.env.JWT_SECRET || 'secret_key', // cheie secreta pt token
                { expiresIn: '24h' } // durata token 24h
            )

            // raspuns cu detalii user si token
            res.status(201).json({
                message: 'cont creat cu succes',
                token, // token-ul generat
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email
                }
            })
        } catch (error) {
            console.error('eroare la inregistrare:', error) // log eroare
            res.status(500).json({ 
                message: 'eroare la crearea contului',
                error: error.message 
            })
        }
    },

    // autentificare user
    login: async (req, res) => {
        try {
            const { email, password } = req.body // preia datele din req

            // cauta user dupa email
            const user = await User.findOne({ where: { email } })
            if (!user) {
                return res.status(401).json({ 
                    message: 'email sau parola incorecta' 
                })
            }

            // verifica daca parola e corecta
            const isMatch = await user.comparePassword(password)
            if (!isMatch) {
                return res.status(401).json({ 
                    message: 'email sau parola incorecta' 
                })
            }

            // genereaza token jwt
            const token = jwt.sign(
                { id: user.id }, // payload cu id-ul user-ului
                process.env.JWT_SECRET || 'secret_key', // cheie secreta pt token
                { expiresIn: '24h' } // durata token 24h
            )

            // raspuns cu detalii user si token
            res.json({
                message: 'autentificare reusita',
                token, // token-ul generat
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email
                }
            })
        } catch (error) {
            console.error('eroare la autentificare:', error) // log eroare
            res.status(500).json({ 
                message: 'eroare la autentificare',
                error: error.message 
            })
        }
    },

    // obtine profilul user-ului curent
    getProfile: async (req, res) => {
        try {
            const user = await User.findByPk(req.user.id, {
                attributes: { exclude: ['password'] } // exclude parola din raspuns
            })
            if (!user) {
                return res.status(404).json({ 
                    message: 'utilizator negasit' 
                })
            }
            res.json(user) // returneaza detalii user
        } catch (error) {
            console.error('eroare la obtinerea profilului:', error) // log eroare
            res.status(500).json({ 
                message: 'eroare la obtinerea profilului',
                error: error.message 
            })
        }
    }
}

module.exports = userController // exporta controller-ul pt utilizare in rute
