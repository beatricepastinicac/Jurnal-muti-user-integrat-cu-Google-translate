// src/pages/Login.js
import React, { useState } from 'react' // importa react si hook-ul useState
import {
  Container, // container pt layout
  Paper, // fundal stilizat
  Typography, // text stilizat
  TextField, // input text
  Button, // buton
  Box, // container stilizat
  Alert, // mesaj eroare
  Link as MuiLink, // link stilizat
  CircularProgress // indicator incarcare
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom' // link si navigare intre pagini
import { useAuth } from '../context/AuthContext' // hook pt autentificare

// componenta pagina login
const Login = () => {
  const [formData, setFormData] = useState({
    email: '', // email utilizator
    password: '' // parola utilizator
  })
  const [error, setError] = useState('') // mesaj eroare
  const [loading, setLoading] = useState(false) // stare incarcare
  const navigate = useNavigate() // hook pt navigare
  const { login } = useAuth() // functie login din context

  // handler pt submit formular
  const handleSubmit = async (e) => {
    e.preventDefault() // previne comportamentul default
    setError('') // reseteaza eroarea
    setLoading(true) // seteaza stare incarcare

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // tip continut JSON
        },
        body: JSON.stringify(formData) // trimite datele ca JSON
      })

      const data = await response.json() // parseaza raspunsul

      if (response.ok) {
        login(data.token) // seteaza token-ul in context
        navigate('/journal') // redirectioneaza la pagina jurnal
      } else {
        setError(data.message || 'eroare la autentificare') // seteaza eroarea
      }
    } catch (error) {
      setError('eroare de conexiune la server') // eroare conexiune
    } finally {
      setLoading(false) // opreste indicatorul de incarcare
    }
  }

  // handler pt schimbare campuri formular
  const handleChange = (e) => {
    setFormData({
      ...formData, // pastreaza valorile existente
      [e.target.name]: e.target.value // actualizeaza campul modificat
    })
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5" gutterBottom>
          autentificare {/* titlu pagina */}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error} {/* mesaj eroare */}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="email" // eticheta
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange} // actualizeaza valoarea
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="parolă" // eticheta
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange} // actualizeaza valoarea
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading} // dezactiveaza butonul daca incarca
          >
            {loading ? <CircularProgress size={24} /> : 'autentificare'} {/* indicator incarcare */}
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <MuiLink component={Link} to="/register" variant="body2">
              nu ai cont? înregistrează-te {/* link catre inregistrare */}
            </MuiLink>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}

export default Login // exporta componenta
