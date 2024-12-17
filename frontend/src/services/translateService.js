// src/services/translateService.js
const translateText = async (text, targetLanguage, sourceLanguage = 'auto') => {
    const encodedParams = new URLSearchParams();
    encodedParams.set('source_language', sourceLanguage);
    encodedParams.set('target_language', targetLanguage);
    encodedParams.set('text', text);
  
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
      },
      body: encodedParams
    };
  
    try {
      const response = await fetch('https://text-translator2.p.rapidapi.com/translate', options);
      const result = await response.json();
      return result.data.translatedText;
    } catch (error) {
      throw new Error('Eroare la traducere: ' + error.message);
    }
  };
  
  export { translateText };