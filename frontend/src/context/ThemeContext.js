import React, { createContext, useContext, useState, useMemo } from 'react' // importa react si hook-urile necesare

// creeaza contextul pt tema
const ThemeContext = createContext()

// provider pt gestionarea temei aplicatiei
export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light') // stare pt modul curent (default: light)

  // functie pt schimbarea temei
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light')) // schimba intre 'light' si 'dark'
  }

  // memoreaza valorile contextului pt performanta
  const value = useMemo(() => ({
    mode, // modul curent
    toggleTheme // functie de schimbare a modului
  }), [mode])

  return (
    <ThemeContext.Provider value={value}> {/* furnizeaza valorile contextului */}
      {children} {/* randeaza componentele copil */}
    </ThemeContext.Provider>
  )
}

// hook pt utilizarea contextului Theme
export const useTheme = () => useContext(ThemeContext) // returneaza contextul temei
