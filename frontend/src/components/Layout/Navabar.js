import React from 'react' // importa react
import { AppBar, Toolbar, Typography, Button } from '@mui/material' // componente material-ui
import { useNavigate } from 'react-router-dom' // hook pt navigare intre pagini
import { useAuth } from '../../context/AuthContext' // hook pt gestionarea autentificarii

// componenta bara de navigare
const Navbar = () => {
  const navigate = useNavigate() // instanta pt navigare
  const { isAuthenticated, logout } = useAuth() // preia starea autentificarii si functia logout

  return (
    <AppBar position="static"> {/* bara de navigare statica */}
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          jurnal multi-user {/* titlu aplicatie */}
        </Typography>
        {isAuthenticated ? ( // daca user-ul este autentificat
          <>
            <Button color="inherit" onClick={() => navigate('/journal')}>
              jurnal {/* buton pt accesarea jurnalului */}
            </Button>
            <Button color="inherit" onClick={logout}>
              deconectare {/* buton pt logout */}
            </Button>
          </>
        ) : ( // daca user-ul nu este autentificat
          <>
            <Button color="inherit" onClick={() => navigate('/login')}>
              autentificare {/* buton pt login */}
            </Button>
            <Button color="inherit" onClick={() => navigate('/register')}>
              înregistrare {/* buton pt inregistrare */}
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar // exporta componenta
