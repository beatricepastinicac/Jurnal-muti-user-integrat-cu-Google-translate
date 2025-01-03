// Importă biblioteca gratuită de traducere
import translate from '@vitalets/google-translate-api';

// Funcție pentru traducerea textului
// Serviciu pentru traducere
const translateText = async (text, targetLanguage, sourceLanguage = 'auto') => {
  try {
    const response = await fetch('http://localhost:5000/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text,
        sourceLang: sourceLanguage,
        targetLang: targetLanguage,
      }),
    });

    if (!response.ok) {
      throw new Error(`Eroare la traducere: ${response.statusText}`);
    }

    const data = await response.json();
    return data.translatedText;
  } catch (error) {
    console.error('Eroare la traducere:', error.message);
    throw new Error('Nu s-a putut realiza traducerea.');
  }
};

export { translateText };
