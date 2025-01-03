import React, { useState, useEffect, useCallback } from 'react';
import { 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  TextField, 
  InputAdornment, 
  IconButton, 
  Fab, 
  Dialog, 
  Box, 
  List, 
  ListItem, 
  ListItemText, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Snackbar, 
  Alert, 
  CircularProgress 
} from '@mui/material';
import { 
  Add as AddIcon, 
  Edit as EditIcon, 
  Delete as DeleteIcon, 
  Search as SearchIcon, 
  Sort as SortIcon 
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import JournalEntryForm from '../components/Journal/JournalEntryForm';
import JournalEntryDetail from '../components/Journal/JournalEntryDetail';

const Journal = () => {
  const [entries, setEntries] = useState([]); // toate intrarile
  const [filteredEntries, setFilteredEntries] = useState([]); // intrari filtrate si sortate
  const [open, setOpen] = useState(false); // stare pentru dialogul formularului
  const [selectedEntry, setSelectedEntry] = useState(null); // intrarea selectata pentru editare sau vizualizare
  const [detailOpen, setDetailOpen] = useState(false); // stare pentru dialogul detaliilor
  const [searchTerm, setSearchTerm] = useState(''); // textul de cautare
  const [selectedLanguage, setSelectedLanguage] = useState('all'); // limba selectata pentru filtrare
  const [sortOrder, setSortOrder] = useState('desc'); // ordinea de sortare (descrescator implicit)
  const [loading, setLoading] = useState(true); // stare de incarcare
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' }); // notificare
  const { token } = useAuth(); // token-ul utilizatorului autentificat

  const languages = [
    { code: 'all', name: 'Toate limbile' },
    { code: 'ro', name: 'Română' },
    { code: 'en', name: 'Engleză' },
    { code: 'fr', name: 'Franceză' },
    { code: 'es', name: 'Spaniolă' },
    { code: 'de', name: 'Germană' }
  ];

  // Functie pentru preluarea intrarilor din server
  const fetchEntries = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/journal', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setEntries(data);
        filterAndSortEntries(data, searchTerm, selectedLanguage, sortOrder);
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Eroare la încărcarea intrărilor',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  }, [token, searchTerm, selectedLanguage, sortOrder]);

  // Functie pentru filtrare si sortare
  const filterAndSortEntries = useCallback((entries, search, language, order) => {
    let filtered = [...entries];

    if (search) {
      filtered = filtered.filter(entry => 
        entry.title.toLowerCase().includes(search.toLowerCase()) ||
        entry.content.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (language !== 'all') {
      filtered = filtered.filter(entry => entry.originalLanguage === language);
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return order === 'desc' ? dateB - dateA : dateA - dateB;
    });

    setFilteredEntries(filtered);
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  useEffect(() => {
    filterAndSortEntries(entries, searchTerm, selectedLanguage, sortOrder);
  }, [searchTerm, selectedLanguage, sortOrder, entries, filterAndSortEntries]);

  // Functie pentru stergerea unei intrari
  const handleDelete = async (id) => {
    if (window.confirm('Sigur doriți să ștergeți această intrare?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/journal/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          fetchEntries();
          setSnackbar({
            open: true,
            message: 'Intrare ștearsă cu succes',
            severity: 'success'
          });
        }
      } catch (error) {
        setSnackbar({
          open: true,
          message: 'Eroare la ștergerea intrării',
          severity: 'error'
        });
      }
    }
  };

  // Functie pentru editarea unei intrari
  const handleEdit = (entry) => {
    setSelectedEntry(entry);
    setOpen(true);
    setDetailOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
              <TextField
                fullWidth
                placeholder="Caută în jurnal..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Limbă</InputLabel>
                <Select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  label="Limbă"
                >
                  {languages.map(lang => (
                    <MenuItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <IconButton 
                onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
                color={sortOrder === 'desc' ? 'primary' : 'default'}
              >
                <SortIcon />
              </IconButton>
            </Box>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
              </Box>
            ) : filteredEntries.length === 0 ? (
              <Typography variant="body1" sx={{ textAlign: 'center', p: 3 }}>
                Nu au fost găsite intrări
              </Typography>
            ) : (
              <List>
                {filteredEntries.map((entry) => (
                  <ListItem 
                    key={entry.id}
                    onClick={() => {
                      setSelectedEntry(entry);
                      setDetailOpen(true);
                    }}
                    sx={{ 
                      cursor: 'pointer', 
                      '&:hover': { 
                        bgcolor: 'grey.100',
                        transition: 'background-color 0.2s'
                      },
                      borderRadius: 1,
                      mb: 1
                    }}
                    secondaryAction={
                      <Box onClick={(e) => e.stopPropagation()}>
                        <IconButton onClick={() => handleEdit(entry)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(entry.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    }
                  >
                    <ListItemText 
                      primary={entry.title}
                      secondary={new Date(entry.createdAt).toLocaleDateString()}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
      </Grid>

      <Fab 
        color="primary" 
        sx={{ 
          position: 'fixed', 
          bottom: 16, 
          right: 16,
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'scale(1.1)'
          }
        }}
        onClick={() => setOpen(true)}
      >
        <AddIcon />
      </Fab>

      <Dialog 
        open={open} 
        onClose={() => {
          setOpen(false);
          setSelectedEntry(null);
        }}
        fullWidth
        maxWidth="md"
      >
        <JournalEntryForm 
          entry={selectedEntry}
          onClose={() => {
            setOpen(false);
            setSelectedEntry(null);
          }}
          onSave={() => {
            setOpen(false);
            setSelectedEntry(null);
            fetchEntries();
            setSnackbar({
              open: true,
              message: 'Intrare salvată cu succes',
              severity: 'success'
            });
          }}
        />
      </Dialog>

      {detailOpen && selectedEntry && (
        <JournalEntryDetail
          entry={selectedEntry}
          onClose={() => {
            setDetailOpen(false);
            setSelectedEntry(null);
          }}
          onEdit={handleEdit}
        />
      )}

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Journal;
