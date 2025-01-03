const express = require('express');
const translate = require('google-translate-api-x'); // Biblioteca alternativă
const router = express.Router();

router.post('/', async (req, res) => {
  const { text, sourceLang, targetLang } = req.body;

  if (!text || !sourceLang || !targetLang) {
    return res.status(400).json({ message: 'Parametri invalizi!' });
  }

  try {
    const result = await translate(text, { from: sourceLang, to: targetLang });
    res.json({ translatedText: result.text });
  } catch (error) {
    console.error('Eroare la traducere:', error.message);
    res.status(500).json({ message: 'Eroare la traducere!', error: error.message });
  }
});

module.exports = router;
