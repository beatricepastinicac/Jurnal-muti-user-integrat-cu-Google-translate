const User = require('../models/User');
const jwt = require('jsonwebtoken');

const userController = {
    // Înregistrare utilizator nou
    register: async (req, res) => {
        try {
            const { username, email, password } = req.body;

            // Verifică dacă utilizatorul există deja
            const existingUser = await User.findOne({ 
                where: { 
                    [Op.or]: [
                        { email: email },
                        { username: username }
                    ]
                }
            });

            if (existingUser) {
                return res.status(400).json({ 
                    message: 'Email sau username deja înregistrat' 
                });
            }

            // Creează utilizatorul nou
            const user = await User.create({
                username,
                email,
                password // parola va fi hashuită prin hook-ul beforeCreate
            });

            // Generează token JWT
            const token = jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET || 'secret_key',
                { expiresIn: '24h' }
            );

            res.status(201).json({
                message: 'Cont creat cu succes',
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email
                }
            });
        } catch (error) {
            console.error('Eroare la înregistrare:', error);
            res.status(500).json({ 
                message: 'Eroare la crearea contului',
                error: error.message 
            });
        }
    },

    // Autentificare utilizator
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Găsește utilizatorul
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(401).json({ 
                    message: 'Email sau parolă incorectă' 
                });
            }

            // Verifică parola
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return res.status(401).json({ 
                    message: 'Email sau parolă incorectă' 
                });
            }

            // Generează token
            const token = jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET || 'secret_key',
                { expiresIn: '24h' }
            );

            res.json({
                message: 'Autentificare reușită',
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email
                }
            });
        } catch (error) {
            console.error('Eroare la autentificare:', error);
            res.status(500).json({ 
                message: 'Eroare la autentificare',
                error: error.message 
            });
        }
    },

    // Obține profilul utilizatorului
    getProfile: async (req, res) => {
        try {
            const user = await User.findByPk(req.user.id, {
                attributes: { exclude: ['password'] }
            });
            if (!user) {
                return res.status(404).json({ 
                    message: 'Utilizator negăsit' 
                });
            }
            res.json(user);
        } catch (error) {
            console.error('Eroare la obținerea profilului:', error);
            res.status(500).json({ 
                message: 'Eroare la obținerea profilului',
                error: error.message 
            });
        }
    }
};

module.exports = userController;