const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        // Extrage token-ul din header
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ 
                message: 'Autentificare necesară' 
            });
        }

        // Verifică token-ul
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
        
        // Găsește utilizatorul
        const user = await User.findByPk(decoded.id);
        if (!user) {
            throw new Error();
        }

        // Atașează utilizatorul la request
        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).json({ 
            message: 'Vă rugăm să vă autentificați' 
        });
    }
};

module.exports = auth;