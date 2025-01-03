// src/Routes.js

import React from 'react' // importa react
import { Routes, Route, Navigate } from 'react-router-dom' // importa componente pt rute si navigare
import { useAuth } from './context/AuthContext' // importa contextul de autentificare
import Login from './pages/Login' // importa pagina Login
import Register from './pages/Register' // importa pagina Register
import Journal from './pages/Journal' // importa pagina Journal
import PrivateRoute from './components/PrivateRoute' // importa componenta PrivateRoute

// componenta pentru rute publice
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth() // verifica daca utilizatorul este autentificat
  return !isAuthenticated ? children : <Navigate to="/journal" /> // redirectioneaza daca este autentificat
}

// defineste rutele aplicatiei
const AppRoutes = () => {
  return (
    <Routes>
      {/* ruta pentru login */}
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } 
      />
      {/* ruta pentru inregistrare */}
      <Route 
        path="/register" 
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } 
      />
      {/* ruta privata pentru jurnal */}
      <Route 
        path="/journal" 
        element={
          <PrivateRoute>
            <Journal />
          </PrivateRoute>
        } 
      />
      {/* ruta privata pentru vizualizare detaliata jurnal */}
      <Route 
        path="/journal/:id" 
        element={
          <PrivateRoute>
            <Journal />
          </PrivateRoute>
        } 
      />
      {/* ruta implicita redirectioneaza catre login */}
      <Route path="/" element={<Navigate to="/login" />} />
      {/* rute inexistente redirectioneaza catre login */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}

export default AppRoutes // exporta componentele de rute
