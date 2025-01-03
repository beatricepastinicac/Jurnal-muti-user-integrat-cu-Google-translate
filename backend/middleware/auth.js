const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware pentru autentificare
const auth = async (req, res, next) => {
  try {
    // Preia token-ul din header-ul Authorization
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // Verifică dacă token-ul există
    if (!token) {
      return res.status(401).json({
        message: 'Autentificare necesară.',
      });
    }

    // Decodează token-ul folosind cheia secretă
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');

    // Caută utilizatorul în baza de date
    const user = await User.findByPk(decoded.id);
    if (!user) {
      throw new Error('Utilizatorul nu a fost găsit.');
    }

    // Adaugă utilizatorul și token-ul în req pentru acces ulterior
    req.user = user;
    req.token = token;

    next(); // Trecere la următorul middleware
  } catch (error) {
    console.error('Eroare la autentificare:', error.message);
    res.status(401).json({
      message: 'Vă rugăm să vă autentificați.',
    });
  }
};

module.exports = auth;
