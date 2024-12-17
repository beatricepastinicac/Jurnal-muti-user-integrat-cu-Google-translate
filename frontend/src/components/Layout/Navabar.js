import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Jurnal Multi-User
        </Typography>
        {isAuthenticated ? (
          <>
            <Button color="inherit" onClick={() => navigate('/journal')}>
              Jurnal
            </Button>
            <Button color="inherit" onClick={logout}>
              Deconectare
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => navigate('/login')}>
              Autentificare
            </Button>
            <Button color="inherit" onClick={() => navigate('/register')}>
              Înregistrare
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;