// src/pages/Register.js
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
import { Link, useNavigate } from 'react-router-dom' // hook-uri pt navigare si link-uri

// componenta pagina de inregistrare
const Register = () => {
 const [formData, setFormData] = useState({
   username: '', // nume utilizator
   email: '', // email utilizator
   password: '', // parola utilizator
   confirmPassword: '' // confirmare parola
 })
 const [error, setError] = useState('') // stare pt eroare
 const [loading, setLoading] = useState(false) // stare pt incarcare
 const navigate = useNavigate() // hook pt navigare

 // functie pt validarea formularului
 const validateForm = () => {
   if (formData.password !== formData.confirmPassword) { // verifica daca parolele corespund
     setError('parolele nu corespund')
     return false
   }
   if (formData.password.length < 6) { // verifica lungimea parolei
     setError('parola trebuie să aibă cel puțin 6 caractere')
     return false
   }
   return true // formular valid
 }

 // handler pt submit formular
 const handleSubmit = async (e) => {
   e.preventDefault() // previne comportamentul default
   setError('') // reseteaza eroarea

   if (!validateForm()) return // opreste daca formularul nu e valid

   setLoading(true) // seteaza stare incarcare

   try {
     const response = await fetch('http://localhost:5000/api/users/register', {
       method: 'POST', // metoda POST
       headers: {
         'Content-Type': 'application/json', // setare header pt JSON
       },
       body: JSON.stringify({
         username: formData.username,
         email: formData.email,
         password: formData.password
       }) // trimite datele in corpul cererii
     })

     const data = await response.json() // parseaza raspunsul

     if (response.ok) {
       navigate('/login') // redirectioneaza la login daca inregistrarea e reusita
     } else {
       setError(data.message || 'eroare la înregistrare') // seteaza mesaj eroare
     }
   } catch (error) {
     setError('eroare de conexiune la server') // mesaj eroare conexiune
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
         înregistrare cont nou {/* titlu pagina */}
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
           name="username"
           label="nume utilizator" // eticheta
           type="text"
           id="username"
           autoComplete="username"
           value={formData.username}
           onChange={handleChange} // actualizeaza valoarea
           autoFocus
         />

         <TextField
           margin="normal"
           required
           fullWidth
           name="email"
           label="email" // eticheta
           type="email"
           id="email"
           autoComplete="email"
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
           autoComplete="new-password"
           value={formData.password}
           onChange={handleChange} // actualizeaza valoarea
           helperText="minim 6 caractere"
         />

         <TextField
           margin="normal"
           required
           fullWidth
           name="confirmPassword"
           label="confirmă parola" // eticheta
           type="password"
           id="confirmPassword"
           autoComplete="new-password"
           value={formData.confirmPassword}
           onChange={handleChange} // actualizeaza valoarea
         />

         <Button
           type="submit"
           fullWidth
           variant="contained"
           sx={{ mt: 3, mb: 2 }}
           disabled={loading} // dezactiveaza butonul daca incarca
         >
           {loading ? <CircularProgress size={24} /> : 'înregistrare'} {/* indicator incarcare */}
         </Button>

         <Box sx={{ textAlign: 'center' }}>
           <MuiLink component={Link} to="/login" variant="body2">
             ai deja cont? autentifică-te {/* link catre login */}
           </MuiLink>
         </Box>
       </Box>
     </Paper>
   </Container>
 )
}

export default Register // exporta componenta
