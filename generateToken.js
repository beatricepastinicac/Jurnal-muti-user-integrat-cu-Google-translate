const jwt = require('jsonwebtoken');

// Cheia secretă
const secretKey = '142314';

// Creează un payload pentru utilizator
const payload = { id: 1 }; // Poți schimba `id` cu altă valoare dacă este necesar

// Generează token-ul
const token = jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Valabil 1 oră

console.log('Token JWT generat:', token);
