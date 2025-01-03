import React, { useState } from 'react'; // importa React și useState
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

// componenta pentru traducerea textului
const TranslateDialog = ({ open, onClose, content, originalLanguage }) => {
  const [targetLanguage, setTargetLanguage] = useState('en'); // limba țintă default
  const [translatedText, setTranslatedText] = useState(''); // text tradus
  const [loading, setLoading] = useState(false); // stare încărcare
  const [error, setError] = useState(''); // mesaj eroare

  // listează limbile disponibile (exclude limba originală)
  const languages = [
    { code: 'en', name: 'Engleză' },
    { code: 'fr', name: 'Franceză' },
    { code: 'es', name: 'Spaniolă' },
    { code: 'de', name: 'Germană' },
    { code: 'ro', name: 'Română' },
  ].filter((lang) => lang.code !== originalLanguage);

  // handler pentru realizarea traducerii
  const handleTranslate = async () => {
    setLoading(true); // setează stare încărcare
    setError(''); // resetează eroarea
    setTranslatedText(''); // resetează textul tradus

    try {
      // trimite cererea către API-ul de traducere
      const response = await fetch('http://localhost:5000/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: content, // textul de tradus
          sourceLang: originalLanguage, // limba sursă
          targetLang: targetLanguage, // limba țintă
        }),
      });

      if (!response.ok) {
        // verifică dacă răspunsul este valid
        throw new Error(`Eroare la traducere: ${response.statusText}`);
      }

      const data = await response.json(); // parsează răspunsul
      setTranslatedText(data.translatedText); // setează textul tradus
    } catch (error) {
      console.error('Eroare la traducere:', error.message); // log eroare
      setError('Nu s-a putut realiza traducerea. Verifică conexiunea sau formatul textului.'); // mesaj eroare
    } finally {
      setLoading(false); // oprește indicatorul de încărcare
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      {/* dialog pentru traducere */}
      <DialogTitle>Tradu textul</DialogTitle>
      <DialogContent>
        {loading && <CircularProgress />} {/* indicator de încărcare */}
        {error && <Alert severity="error">{error}</Alert>} {/* mesaj de eroare */}
        {!loading && !error && (
          <>
            <FormControl fullWidth>
              <InputLabel>Limba țintă</InputLabel>
              <Select
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)} // schimbă limba țintă
              >
                {languages.map((lang) => (
                  <MenuItem key={lang.code} value={lang.code}>
                    {lang.name} {/* afișează numele limbii */}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <p>Text tradus: {translatedText || 'N/A'}</p> {/* afișează textul tradus */}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Închide
        </Button>
        <Button onClick={handleTranslate} color="primary" disabled={loading}>
          Tradu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TranslateDialog; // exportă componenta
