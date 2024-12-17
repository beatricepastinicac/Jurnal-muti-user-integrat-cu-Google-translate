// src/components/Journal/TranslateDialog.js
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
  Typography,
  Box,
  CircularProgress,
  Alert,
  Paper
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
    { code: 'ro', name: 'Română' }
  ].filter(lang => lang.code !== originalLanguage);

  const handleTranslate = async () => {
    setLoading(true);
    setError('');

    const encodedParams = new URLSearchParams();
    encodedParams.set('source_language', originalLanguage);
    encodedParams.set('target_language', targetLanguage);
    encodedParams.set('text', content);

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

      if (result.status === 'success') {
        setTranslatedText(result.data.translatedText);
      } else {
        throw new Error(result.message || 'Eroare la traducere');
      }
    } catch (error) {
      setError('Eroare la traducere: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Traducere</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Traduceți în</InputLabel>
          <Select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            label="Traduceți în"
          >
            {languages.map(lang => (
              <MenuItem key={lang.code} value={lang.code}>
                {lang.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Text original:
          </Typography>
          <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.100' }}>
            <Typography>{content}</Typography>
          </Paper>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
            <CircularProgress />
          </Box>
        ) : translatedText && (
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Traducere:
            </Typography>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.100' }}>
              <Typography>{translatedText}</Typography>
            </Paper>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Închide
        </Button>
        <Button 
          onClick={handleTranslate} 
          variant="contained" 
          disabled={loading}
        >
          {loading ? 'Se traduce...' : 'Traduceți'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TranslateDialog;