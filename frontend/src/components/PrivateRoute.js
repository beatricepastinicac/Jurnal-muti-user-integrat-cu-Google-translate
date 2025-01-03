import React from 'react' // importa react
import { Navigate } from 'react-router-dom' // componenta pt redirectionare
import { useAuth } from '../context/AuthContext' // hook pt gestionarea autentificarii

// componenta pt protejarea rutelor private
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth() // preia starea autentificarii si incarcarii

  if (loading) {
    return null // sau returneaza un component de incarcare, daca e cazul
  }

  return isAuthenticated ? children : <Navigate to="/login" /> // afiseaza copii daca e autentificat, altfel redirectioneaza la login
}

export default PrivateRoute // exporta componenta
