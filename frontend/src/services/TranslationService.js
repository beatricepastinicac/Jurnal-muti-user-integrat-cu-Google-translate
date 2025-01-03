import translate from '@vitalets/google-translate-api'; // importa biblioteca gratuita pentru traduceri

// serviciu pentru traducere
const TranslationService = {
  // funcție pentru traducerea textului
  async translateText(text, targetLanguage) {
    try {
      // efectuează traducerea folosind biblioteca gratuită
      const result = await translate(text, { to: targetLanguage });
      // returnează textul tradus
      return result.text;
    } catch (error) {
      // loghează eroarea și aruncă un mesaj clar
      console.error('Eroare la traducere:', error.message);
      throw new Error('Nu s-a putut traduce textul. Verifică configurarea serviciului.');
    }
  },

  // funcție pentru detectarea limbii unui text
  async detectLanguage(text) {
    try {
      // efectuează traducerea fără a specifica limba țintă pentru a detecta limba textului
      const result = await translate(text, { to: 'en' }); // `to: 'en'` pentru a forța detectarea limbii
      // returnează limba detectată
      return result.from.language.iso;
    } catch (error) {
      // loghează eroarea și aruncă un mesaj clar
      console.error('Eroare la detectarea limbii:', error.message);
      throw new Error('Nu s-a putut detecta limba textului.');
    }
  }
};

export default TranslationService; // exportă serviciul
