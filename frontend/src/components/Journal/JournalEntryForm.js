import React, { useState, useEffect } from 'react';
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Translate as TranslateIcon } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import TranslateDialog from './TranslateDialog';

const JournalEntryForm = ({ entry, onClose, onSave }) => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    originalLanguage: 'ro'
  });
  const [translateOpen, setTranslateOpen] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (entry) {
      setFormData({
        title: entry.title,
        content: entry.content,
        originalLanguage: entry.originalLanguage
      });
    }
  }, [entry]);

  const languages = [
    { code: 'ro', name: 'Română' },
    { code: 'en', name: 'Engleză' },
    { code: 'fr', name: 'Franceză' },
    { code: 'es', name: 'Spaniolă' },
    { code: 'de', name: 'Germană' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const url = entry 
      ? `http://localhost:5000/api/journal/${entry.id}`
      : 'http://localhost:5000/api/journal';

    try {
      const response = await fetch(url, {
        method: entry ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        onSave();
      } else {
        setError(data.message || 'A apărut o eroare. Vă rugăm încercați din nou.');
      }
    } catch (error) {
      setError('Eroare la conectarea cu serverul');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {entry ? 'Editare Intrare' : 'Intrare Nouă'}
        </DialogTitle>
        
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box sx={{ mb: 2, mt: 1 }}>
            <TextField
              fullWidth
              label="Titlu"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              autoFocus
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Conținut"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              multiline
              rows={6}
            />
          </Box>

          <FormControl fullWidth>
            <InputLabel>Limba originală</InputLabel>
            <Select
              name="originalLanguage"
              value={formData.originalLanguage}
              onChange={handleChange}
              label="Limba originală"
            >
              {languages.map(lang => (
                <MenuItem key={lang.code} value={lang.code}>
                  {lang.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions>
          {entry && (
            <Button
              startIcon={<TranslateIcon />}
              onClick={() => setTranslateOpen(true)}
            >
              Traduceți
            </Button>
          )}
          <Button onClick={onClose}>
            Anulare
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
          >
            {entry ? 'Salvare' : 'Adaugă'}
          </Button>
        </DialogActions>
      </form>

      {translateOpen && (
        <TranslateDialog
          open={translateOpen}
          onClose={() => setTranslateOpen(false)}
          content={formData.content}
          originalLanguage={formData.originalLanguage}
        />
      )}
    </>
  );
};

export default JournalEntryForm;