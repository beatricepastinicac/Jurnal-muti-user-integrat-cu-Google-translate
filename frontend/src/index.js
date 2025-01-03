// importa react si react-dom pt randarea aplicatiei
import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'// importa fisierul de css
import App from './App'// importa componenta principala a aplicatiei

// importa contextul pentru tematica
import { ThemeProvider } from './context/ThemeContext'

// creeaza radacina aplicatiei in elementul HTML cu id-ul "root"
const root = ReactDOM.createRoot(document.getElementById('root'))

// randare aplicatie
root.render(
  <ThemeProvider> {/* ofera contextul tematic pentru intreaga aplicatie */}
    <App /> {/* componenta principala */}
  </ThemeProvider>
)
