import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
} from '@mui/material';

const TranslateDialog = ({ open, onClose, content, originalLanguage }) => {
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const languages = [
    { code: 'en', name: 'Engleză' },
    { code: 'fr', name: 'Franceză' },
    { code: 'es', name: 'Spaniolă' },
    { code: 'de', name: 'Germană' },
    { code: 'ro', name: 'Română' },
  ].filter(lang => lang.code !== originalLanguage);

  const handleTranslate = async () => {
    setLoading(true);
    setError('');
    setTranslatedText('');

    try {
      const response = await fetch('http://localhost:5000/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: content,
          sourceLang: originalLanguage,
          targetLang: targetLanguage,
        }),
      });

      if (!response.ok) {
        throw new Error('Eroare la traducere');
      }

      const data = await response.json();
      setTranslatedText(data.translatedText);
    } catch (error) {
      console.error('Eroare la traducere:', error.message);
      setError('Nu s-a putut realiza traducerea.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Tradu textul</DialogTitle>
      <DialogContent>
        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}
        {!loading && !error && (
          <>
            <FormControl fullWidth>
              <InputLabel>Limba țintă</InputLabel>
              <Select
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
              >
                {languages.map((lang) => (
                  <MenuItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <p>Text tradus: {translatedText || 'N/A'}</p>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Închide</Button>
        <Button onClick={handleTranslate} color="primary" disabled={loading}>
          Tradu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TranslateDialog;
