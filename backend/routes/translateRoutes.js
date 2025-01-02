const express = require('express');
const axios = require('axios');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/translate', auth, async (req, res) => {
    const { text, sourceLang, targetLang } = req.body;

    if (!text || !sourceLang || !targetLang) {
        return res.status(400).json({ message: 'Parametri invalizi!' });
    }

    try {
        const response = await axios.post(
            'https://translation.googleapis.com/language/translate/v2',
            {},
            {
                params: {
                    q: text,
                    source: sourceLang,
                    target: targetLang,
                    key: process.env.GOOGLE_API_KEY,
                },
            }
        );

        const translatedText = response.data.data.translations[0].translatedText;
        res.json({ translatedText });
    } catch (error) {
        console.error('Eroare la traducere:', error.message);
        res.status(500).json({ message: 'Eroare la traducere!', error: error.message });
    }
});

module.exports = router;
