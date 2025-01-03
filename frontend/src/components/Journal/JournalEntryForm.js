import React, { useState, useEffect } from 'react' // importa react si hook-urile useState, useEffect
import {
  DialogTitle, // titlu dialog
  DialogContent, // continut dialog
  DialogActions, // actiuni dialog
  TextField, // camp input text
  Button, // buton
  Box, // container stilizat
  Alert, // mesaj eroare stilizat
  MenuItem, // optiune dropdown
  Select, // componenta select
  FormControl, // container pt input stilizat
  InputLabel, // eticheta stilizata pt input
} from '@mui/material'
import { Translate as TranslateIcon } from '@mui/icons-material' // icon traducere
import { useAuth } from '../../context/AuthContext' // hook pt accesarea token-ului user-ului
import TranslateDialog from './TranslateDialog' // dialog pt traducere

// componenta formular jurnal
const JournalEntryForm = ({ entry, onClose, onSave }) => {
  const { token } = useAuth() // preia token-ul user-ului autentificat
  const [formData, setFormData] = useState({
    title: '', // titlul intrarii
    content: '', // continutul intrarii
    originalLanguage: 'ro' // limba originala default
  })
  const [translateOpen, setTranslateOpen] = useState(false) // stare pt traducere deschisa
  const [error, setError] = useState('') // mesaj de eroare

  // prepopuleaza datele in formular daca exista o intrare
  useEffect(() => {
    if (entry) {
      setFormData({
        title: entry.title,
        content: entry.content,
        originalLanguage: entry.originalLanguage
      })
    }
  }, [entry])

  // lista limbilor disponibile
  const languages = [
    { code: 'ro', name: 'Română' },
    { code: 'en', name: 'Engleză' },
    { code: 'fr', name: 'Franceză' },
    { code: 'es', name: 'Spaniolă' },
    { code: 'de', name: 'Germană' }
  ]

  // handler pt salvare formular
  const handleSubmit = async (e) => {
    e.preventDefault() // previne comportamentul default al formularului
    setError('') // reseteaza eroarea

    const url = entry 
      ? `http://localhost:5000/api/journal/${entry.id}` // url pt actualizare
      : 'http://localhost:5000/api/journal' // url pt creare

    try {
      const response = await fetch(url, {
        method: entry ? 'PUT' : 'POST', // metoda http
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // include token-ul in header
        },
        body: JSON.stringify(formData) // trimite datele formularului
      })

      const data = await response.json()

      if (response.ok) {
        onSave() // notifica salvarea
      } else {
        setError(data.message || 'a aparut o eroare. incercati din nou.') // mesaj eroare
      }
    } catch (error) {
      setError('eroare la conectarea cu serverul') // mesaj eroare conexiune
    }
  }

  // handler pt schimbarea valorilor formularului
  const handleChange = (e) => {
    setFormData({
      ...formData, // pastreaza valorile existente
      [e.target.name]: e.target.value // actualizeaza valoarea modificata
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {entry ? 'editare intrare' : 'intrare noua'} {/* titlu dinamic */}
        </DialogTitle>
        
        <DialogContent>
          {error && ( // afiseaza eroarea daca exista
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* camp titlu */}
          <Box sx={{ mb: 2, mt: 1 }}>
            <TextField
              fullWidth
              label="titlu"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              autoFocus
            />
          </Box>

          {/* camp continut */}
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="continut"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              multiline
              rows={6}
            />
          </Box>

          {/* select limba originala */}
          <FormControl fullWidth>
            <InputLabel>limba originala</InputLabel>
            <Select
              name="originalLanguage"
              value={formData.originalLanguage}
              onChange={handleChange}
              label="limba originala"
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
          {entry && ( // buton traducere afisat doar pt intrari existente
            <Button
              startIcon={<TranslateIcon />}
              onClick={() => setTranslateOpen(true)}
            >
              traduceți
            </Button>
          )}
          <Button onClick={onClose}>
            anulare
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
          >
            {entry ? 'salvare' : 'adaugă'}
          </Button>
        </DialogActions>
      </form>

      {/* afiseaza dialogul traducere daca e deschis */}
      {translateOpen && (
        <TranslateDialog
          open={translateOpen}
          onClose={() => setTranslateOpen(false)}
          content={formData.content}
          originalLanguage={formData.originalLanguage}
        />
      )}
    </>
  )
}

export default JournalEntryForm // exporta componenta
