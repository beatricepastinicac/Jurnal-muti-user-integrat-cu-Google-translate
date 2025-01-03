// src/App.js

import React from 'react' // importa react
import { BrowserRouter as Router } from 'react-router-dom' // importa router-ul pentru navigare
import { AuthProvider } from './context/AuthContext' // importa provider-ul pentru autentificare
import MainLayout from './components/Layout/MainLayout' // importa layout-ul principal
import AppRoutes from './Routes' // importa definitiile de rute

// componenta principala a aplicatiei
function App() {
  return (
    <Router> {/* configureaza router-ul pentru navigare */}
      <AuthProvider> {/* ofera context pentru autentificare */}
        <MainLayout> {/* layout-ul principal */}
          <AppRoutes /> {/* rutele definite pentru aplicatie */}
        </MainLayout>
      </AuthProvider>
    </Router>
  )
}

export default App // exporta componenta
