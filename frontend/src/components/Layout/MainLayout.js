// src/components/Layout/MainLayout.js
import React from 'react';
import {
 Box,
 AppBar,
 Toolbar,
 Typography,
 Button,
 IconButton,
 Container,
 Avatar,
 Menu,
 MenuItem,
 Divider
} from '@mui/material';
import {
 Menu as MenuIcon,
 AccountCircle,
 ExitToApp as LogoutIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const MainLayout = ({ children }) => {
 const navigate = useNavigate();
 const { user, logout } = useAuth();
 const [anchorEl, setAnchorEl] = React.useState(null);

 const handleMenu = (event) => {
   setAnchorEl(event.currentTarget);
 };

 const handleClose = () => {
   setAnchorEl(null);
 };

 const handleLogout = () => {
   handleClose();
   logout();
   navigate('/login');
 };

 return (
   <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
     <AppBar position="fixed">
       <Toolbar>
         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           Jurnal Multi-User
         </Typography>
         
         {user ? (
           <div>
             <IconButton
               size="large"
               onClick={handleMenu}
               color="inherit"
             >
               <AccountCircle />
             </IconButton>
             <Menu
               anchorEl={anchorEl}
               open={Boolean(anchorEl)}
               onClose={handleClose}
               onClick={handleClose}
             >
               <MenuItem disabled>
                 <Typography variant="body2">
                   {user.username}
                 </Typography>
               </MenuItem>
               <Divider />
               <MenuItem onClick={handleLogout}>
                 <LogoutIcon sx={{ mr: 1 }} />
                 Deconectare
               </MenuItem>
             </Menu>
           </div>
         ) : (
           <div>
             <Button color="inherit" onClick={() => navigate('/login')}>
               Autentificare
             </Button>
             <Button color="inherit" onClick={() => navigate('/register')}>
               Înregistrare
             </Button>
           </div>
         )}
       </Toolbar>
     </AppBar>

     {/* Toolbar spacing */}
     <Toolbar />

     {/* Main content */}
     <Container 
       component="main" 
       sx={{ 
         flexGrow: 1, 
         py: 3,
         display: 'flex',
         flexDirection: 'column'
       }}
     >
       {children}
     </Container>

     {/* Footer */}
     <Box
       component="footer"
       sx={{
         py: 3,
         px: 2,
         mt: 'auto',
         backgroundColor: (theme) =>
           theme.palette.mode === 'light'
             ? theme.palette.grey[200]
             : theme.palette.grey[800],
       }}
     >
       <Container maxWidth="lg">
         <Typography variant="body2" color="text.secondary" align="center">
           © {new Date().getFullYear()} Jurnal Multi-User. Toate drepturile rezervate.
         </Typography>
       </Container>
     </Box>
   </Box>
 );
};

export default MainLayout;