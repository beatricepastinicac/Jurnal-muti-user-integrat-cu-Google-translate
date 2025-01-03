const translate = require('google-translate-api-x');

(async () => {
  try {
    const result = await translate('Hello', { from: 'en', to: 'ro' });
    console.log('Text tradus:', result.text);
  } catch (error) {
    console.error('Eroare la testarea traducerii:', error.message);
  }
})();
