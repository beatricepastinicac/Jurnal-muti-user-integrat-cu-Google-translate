import React, { useState } from 'react' // importa react si hook-ul useState
import {
  Dialog, // componenta pt dialog
  DialogTitle, // titlu dialog
  DialogContent, // continut dialog
  DialogActions, // actiuni dialog
  Typography, // text stilizat
  Button, // buton
  Box, // container flex
  Paper, // container stilizat
  Chip, // eticheta stilizata
  IconButton, // buton cu icon
  Tooltip // tooltip explicativ
} from '@mui/material'

// importa iconite material-ui
import {
  Edit as EditIcon, // icon editare
  Delete as DeleteIcon, // icon stergere
  Translate as TranslateIcon // icon traducere
} from '@mui/icons-material'

import TranslateDialog from './TranslateDialog' // importa dialogul pt traducere

// componenta pt afisarea detaliilor unei intrari jurnal
const JournalEntryDetail = ({ entry, onClose, onEdit, onDelete }) => {
  const [translateOpen, setTranslateOpen] = useState(false) // stare pt traducere deschisa

  const languages = {
    'ro': 'Română', // limba romana
    'en': 'Engleză', // limba engleza
    'fr': 'Franceză', // limba franceza
    'es': 'Spaniolă', // limba spaniola
    'de': 'Germană' // limba germana
  }

  // formatare data in format romanesc
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('ro-RO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <>
      <Dialog
        open={true} // dialog deschis
        onClose={onClose} // handler pt inchidere
        maxWidth="md" // latime maxima dialog
        fullWidth // ocupa latimea maxima
        PaperProps={{
          sx: {
            minHeight: '60vh', // inaltime minima dialog
            display: 'flex', // afisare flexibila
            flexDirection: 'column' // directia flex verticala
          }
        }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" component="div">
              {entry.title} {/* titlu intrare */}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Chip 
                label={languages[entry.originalLanguage]} // limba originala
                size="small" 
                color="primary"
              />
              <Tooltip title="Editează"> {/* tooltip pt editare */}
                <IconButton size="small" onClick={() => onEdit(entry)}>
                  <EditIcon /> {/* icon editare */}
                </IconButton>
              </Tooltip>
              <Tooltip title="Șterge"> {/* tooltip pt stergere */}
                <IconButton size="small" onClick={() => onDelete(entry.id)}>
                  <DeleteIcon /> {/* icon stergere */}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </DialogTitle>

        <DialogContent dividers sx={{ flexGrow: 1 }}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2, 
              bgcolor: 'grey.50', // fundal deschis
              minHeight: '200px',
              whiteSpace: 'pre-wrap' // pastreaza spatierea
            }}
          >
            {entry.content} {/* continut intrare */}
          </Paper>

          <Box sx={{ mt: 2 }}>
            <Typography variant="caption" color="text.secondary">
              Creat la: {formatDate(entry.createdAt)} {/* data crearii */}
            </Typography>
            {entry.updatedAt !== entry.createdAt && (
              <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
                Ultima modificare: {formatDate(entry.updatedAt)} {/* data ultimei modificari */}
              </Typography>
            )}
          </Box>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'space-between', px: 2 }}>
          <Box>
            <Tooltip title="Traduceți"> {/* tooltip pt traducere */}
              <IconButton onClick={() => setTranslateOpen(true)}>
                <TranslateIcon /> {/* icon traducere */}
              </IconButton>
            </Tooltip>
          </Box>
          <Box>
            <Button onClick={onClose}>
              Închide {/* buton inchidere */}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>

      {translateOpen && ( /* afiseaza dialogul pt traducere daca e deschis */
        <TranslateDialog
          open={translateOpen}
          onClose={() => setTranslateOpen(false)}
          content={entry.content}
          originalLanguage={entry.originalLanguage}
        />
      )}
    </>
  )
}

export default JournalEntryDetail // exporta componenta
