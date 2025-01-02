import axios from 'axios';

const TRANSLATION_API_URL = 'https://google-translate1.p.rapidapi.com/language/translate/v2';
const API_KEY = process.env.REACT_APP_RAPIDAPI_KEY;

const TranslationService = {
  /**
   * Funcție pentru a traduce text utilizând API-ul RapidAPI
   * @param {string} text - Textul care trebuie tradus
   * @param {string} targetLanguage - Codul limbii țintă (ex: 'fr' pentru franceză, 'es' pentru spaniolă)
   * @returns {Promise<string>} - Textul tradus
   */
  async translateText(text, targetLanguage) {
    try {
      const response = await axios.post(
        TRANSLATION_API_URL,
        new URLSearchParams({
          q: text,
          target: targetLanguage,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
          },
        }
      );

      // Returnează textul tradus
      return response.data.data.translations[0].translatedText;
    } catch (error) {
      console.error('Eroare la traducere:', error.message);
      throw new Error('Nu s-a putut traduce textul. Verifică configurarea API-ului.');
    }
  },
};

export default TranslationService;
