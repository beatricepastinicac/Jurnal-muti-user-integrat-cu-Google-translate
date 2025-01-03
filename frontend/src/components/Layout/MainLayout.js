// src/components/Layout/MainLayout.js
import React from 'react' // importa react
import {
 Box, // container flex
 AppBar, // bara de navigare fixa
 Toolbar, // container pt componente bara de navigare
 Typography, // text stilizat
 Button, // buton
 IconButton, // buton cu icon
 Container, // container pt continut
 Menu, // meniu dropdown
 MenuItem, // item meniu
 Divider, // separator
} from '@mui/material'
import {
 AccountCircle, // icon user
 ExitToApp as LogoutIcon, // icon logout
 Brightness4, // icon tema intunecata
 Brightness7 // icon tema deschisa
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom' // hook pt navigare intre pagini
import { useAuth } from '../../context/AuthContext' // hook pt gestionarea autentificarii
import { useTheme } from '../../context/ThemeContext' // hook pt gestionarea temei

// componenta layout principal
const MainLayout = ({ children }) => {
 const navigate = useNavigate() // instanta pt navigare
 const { user, logout } = useAuth() // preia user si functia logout din context
 const { mode, toggleTheme } = useTheme() // preia tema si functia de schimbare tema
 const [anchorEl, setAnchorEl] = React.useState(null) // stare pt meniu deschis

 // handler deschidere meniu
 const handleMenu = (event) => {
   setAnchorEl(event.currentTarget)
 }

 // handler inchidere meniu
 const handleClose = () => {
   setAnchorEl(null)
 }

 // handler logout
 const handleLogout = () => {
   handleClose() // inchide meniul
   logout() // executa logout
   navigate('/login') // navigheaza la pagina de login
 }

 return (
   <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
     <AppBar position="fixed"> {/* bara de navigare fixa */}
       <Toolbar>
         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           jurnal multi-user {/* titlu aplicatie */}
         </Typography>
         
         <IconButton color="inherit" onClick={toggleTheme} sx={{ mr: 1 }}>
           {mode === 'dark' ? <Brightness7 /> : <Brightness4 />} {/* schimba tema */}
         </IconButton>

         {user ? ( // daca user-ul este autentificat
           <div>
             <IconButton
               size="large"
               onClick={handleMenu}
               color="inherit"
             >
               <AccountCircle /> {/* icon user */}
             </IconButton>
             <Menu
               anchorEl={anchorEl}
               open={Boolean(anchorEl)}
               onClose={handleClose}
               onClick={handleClose}
               transformOrigin={{ horizontal: 'right', vertical: 'top' }}
               anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
             >
               <MenuItem disabled>
                 <Typography variant="body2">
                   {user.username} {/* afiseaza username-ul */}
                 </Typography>
               </MenuItem>
               <Divider />
               <MenuItem onClick={handleLogout}>
                 <LogoutIcon sx={{ mr: 1 }} />
                 deconectare {/* optiune logout */}
               </MenuItem>
             </Menu>
           </div>
         ) : ( // daca user-ul nu este autentificat
           <div>
             <Button color="inherit" onClick={() => navigate('/login')}>
               autentificare
             </Button>
             <Button color="inherit" onClick={() => navigate('/register')}>
               înregistrare
             </Button>
           </div>
         )}
       </Toolbar>
     </AppBar>

     <Toolbar /> {/* spatiu pt bara de navigare */}

     <Container 
       component="main" 
       sx={{ 
         flexGrow: 1, 
         py: 3,
         display: 'flex',
         flexDirection: 'column'
       }}
     >
       {children} {/* afiseaza continutul transmis */}
     </Container>

     <Box
       component="footer"
       sx={{
         py: 3,
         px: 2,
         mt: 'auto',
         backgroundColor: (theme) =>
           theme.palette.mode === 'light'
             ? theme.palette.grey[200] // fundal deschis pt tema luminoasa
             : theme.palette.grey[800] // fundal inchis pt tema intunecata
       }}
     >
       <Container maxWidth="lg">
         <Typography variant="body2" color="text.secondary" align="center">
           © {new Date().getFullYear()} jurnal multi-user. toate drepturile rezervate.
         </Typography>
       </Container>
     </Box>
   </Box>
 )
}

export default MainLayout // exporta componenta
