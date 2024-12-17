// src/pages/Journal.js
import React, { useState, useEffect } from 'react';
import { 
 Container, 
 Grid, 
 Paper, 
 Typography, 
 Button, 
 List, 
 ListItem,
 ListItemText,
 IconButton,
 Fab,
 Dialog,
 Box
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import JournalEntryForm from '../components/Journal/JournalEntryForm';
import JournalEntryDetail from '../components/Journal/JournalEntryDetail';

const Journal = () => {
 const [entries, setEntries] = useState([]);
 const [open, setOpen] = useState(false);
 const [selectedEntry, setSelectedEntry] = useState(null);
 const [detailOpen, setDetailOpen] = useState(false);
 const { token } = useAuth();

 const fetchEntries = async () => {
   try {
     const response = await fetch('http://localhost:5000/api/journal', {
       headers: {
         'Authorization': `Bearer ${token}`
       }
     });
     if (response.ok) {
       const data = await response.json();
       setEntries(data);
     }
   } catch (error) {
     console.error('Error fetching entries:', error);
   }
 };

 useEffect(() => {
   fetchEntries();
 }, [token]);

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
       }
     } catch (error) {
       console.error('Error deleting entry:', error);
     }
   }
 };

 const handleEdit = (entry) => {
   setSelectedEntry(entry);
   setOpen(true);
   setDetailOpen(false);
 };

 const handleClose = () => {
   setOpen(false);
   setSelectedEntry(null);
 };

 return (
   <Container maxWidth="lg" sx={{ mt: 4 }}>
     <Grid container spacing={3}>
       <Grid item xs={12}>
         <Paper sx={{ p: 2 }}>
           <Typography variant="h5" component="h2" gutterBottom>
             Jurnalul Meu
           </Typography>
           <List>
             {entries.map((entry) => (
               <ListItem 
                 key={entry.id}
                 onClick={() => {
                   setSelectedEntry(entry);
                   setDetailOpen(true);
                 }}
                 sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'grey.100' } }}
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
         </Paper>
       </Grid>
     </Grid>

     <Fab 
       color="primary" 
       sx={{ position: 'fixed', bottom: 16, right: 16 }}
       onClick={() => setOpen(true)}
     >
       <AddIcon />
     </Fab>

     <Dialog 
       open={open} 
       onClose={handleClose}
       fullWidth
       maxWidth="md"
     >
       <JournalEntryForm 
         entry={selectedEntry}
         onClose={handleClose}
         onSave={() => {
           handleClose();
           fetchEntries();
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
         onEdit={(entry) => {
           setDetailOpen(false);
           handleEdit(entry);
         }}
       />
     )}
   </Container>
 );
};

export default Journal;