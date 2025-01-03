// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react' // importa react si hook-urile necesare

// creeaza contextul pt autentificare
const AuthContext = createContext(null)

// provider pt gestionarea starii autentificarii
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null) // stare pt datele utilizatorului
  const [token, setToken] = useState(localStorage.getItem('token')) // stare pt token-ul stocat local
  const [loading, setLoading] = useState(true) // stare pt incarcare

  // efect pt verificarea token-ului la montarea provider-ului sau schimbarea token-ului
  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          const response = await fetch('http://localhost:5000/api/users/profile', {
            headers: {
              'Authorization': `Bearer ${token}` // include token-ul in header
            }
          })

          if (response.ok) {
            const userData = await response.json() // preia datele user-ului
            setUser(userData) // actualizeaza starea user-ului
          } else {
            logout() // sterge token-ul daca nu e valid
          }
        } catch (error) {
          console.error('error verifying token:', error) // log eroare
          logout() // sterge token-ul la eroare
        }
      }
      setLoading(false) // opreste starea de incarcare
    }

    verifyToken()
  }, [token]) // reexecuta efectul cand token-ul se schimba

  // functie pt login
  const login = async (token) => {
    localStorage.setItem('token', token) // salveaza token-ul in localStorage
    setToken(token) // actualizeaza starea token-ului
  }

  // functie pt logout
  const logout = () => {
    localStorage.removeItem('token') // sterge token-ul din localStorage
    setToken(null) // reseteaza starea token-ului
    setUser(null) // reseteaza starea user-ului
  }

  if (loading) {
    return null // returneaza nimic sau un component de incarcare
  }

  return (
    <AuthContext.Provider 
      value={{
        user, // datele user-ului
        token, // token-ul curent
        login, // functie login
        logout, // functie logout
        isAuthenticated: !!token // verifica daca exista un token
      }}
    >
      {children} {/* randeaza componenta copil */}
    </AuthContext.Provider>
  )
}

// hook pt utilizarea contextului Auth
export const useAuth = () => {
  const context = useContext(AuthContext) // preia contextul
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider') // arunca eroare daca e folosit in afara provider-ului
  }
  return context // returneaza contextul
}
