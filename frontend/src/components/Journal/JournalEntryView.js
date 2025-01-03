import React, { useState } from 'react' // importa react si hook-ul useState
import {
  Dialog, // componenta pentru dialog
  DialogTitle, // titlu dialog
  DialogContent, // continut dialog
  DialogActions, // actiuni dialog
  Typography, // text stilizat
  Button, // buton
  Box, // container flex
  Paper, // container stilizat
  Chip, // eticheta stilizata
  IconButton, // buton cu icon
  Tooltip // explicatie tooltip
} from '@mui/material'

// importa iconite material-ui
import {
  Edit as EditIcon, // icon pentru editare
  Delete as DeleteIcon, // icon pentru stergere
  Translate as TranslateIcon, // icon pentru traducere
  Share as ShareIcon, // icon pentru partajare
  GetApp as ExportIcon // icon pentru export
} from '@mui/icons-material'

import TranslateDialog from './TranslateDialog' // dialog pentru traducere
import ShareDialog from './ShareDialog' // dialog pentru partajare
import ExportDialog from './ExportDialog' // dialog pentru export

// componenta pentru vizualizarea unei intrari in jurnal
const JournalEntryView = ({ entry, onClose, onEdit, onDelete }) => {
  const [translateOpen, setTranslateOpen] = useState(false) // stare pentru traducere deschisa
  const [shareOpen, setShareOpen] = useState(false) // stare pentru partajare deschisa
  const [exportOpen, setExportOpen] = useState(false) // stare pentru export deschis

  // dictionar limbi disponibile
  const languages = {
    'ro': 'romana',
    'en': 'engleza',
    'fr': 'franceza',
    'es': 'spaniola',
    'de': 'germana'
  }

  // functie pentru formatarea datei
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
        onClose={onClose} // inchidere dialog
        maxWidth="md" // latime maxima
        fullWidth // ocupa toata latimea disponibila
        PaperProps={{
          sx: {
            minHeight: '60vh', // inaltime minima
            display: 'flex', // layout flex
            flexDirection: 'column' // directie verticala
          }
        }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" component="div">
              {entry.title} {/* afiseaza titlul intrarii */}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Chip 
                label={languages[entry.originalLanguage]} // limba originala a intrarii
                size="small" 
                color="primary"
              />
              <Tooltip title="editeaza"> {/* explicatie pentru editare */}
                <IconButton size="small" onClick={() => onEdit(entry)}>
                  <EditIcon /> {/* icon editare */}
                </IconButton>
              </Tooltip>
              <Tooltip title="sterge"> {/* explicatie pentru stergere */}
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
              minHeight: '200px', // inaltime minima continut
              whiteSpace: 'pre-wrap' // pastreaza spatierea textului
            }}
          >
            {entry.content} {/* afiseaza continutul intrarii */}
          </Paper>

          <Box sx={{ mt: 2 }}>
            <Typography variant="caption" color="text.secondary">
              creat la: {formatDate(entry.createdAt)} {/* afiseaza data crearii */}
            </Typography>
            {entry.updatedAt !== entry.createdAt && (
              <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
                ultima modificare: {formatDate(entry.updatedAt)} {/* afiseaza data ultimei modificari */}
              </Typography>
            )}
          </Box>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'space-between', px: 2 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="traduce">
              <IconButton onClick={() => setTranslateOpen(true)}>
                <TranslateIcon /> {/* icon traducere */}
              </IconButton>
            </Tooltip>
            <Tooltip title="partajeaza">
              <IconButton onClick={() => setShareOpen(true)}>
                <ShareIcon /> {/* icon partajare */}
              </IconButton>
            </Tooltip>
            <Tooltip title="exporta">
              <IconButton onClick={() => setExportOpen(true)}>
                <ExportIcon /> {/* icon export */}
              </IconButton>
            </Tooltip>
          </Box>
          <Button onClick={onClose}>
            inchide {/* buton pentru inchidere */}
          </Button>
        </DialogActions>
      </Dialog>

      {translateOpen && ( /* afiseaza dialogul pentru traducere daca este deschis */
        <TranslateDialog
          open={translateOpen}
          onClose={() => setTranslateOpen(false)}
          content={entry.content}
          originalLanguage={entry.originalLanguage}
        />
      )}

      <ShareDialog
        open={shareOpen} // dialog partajare deschis
        onClose={() => setShareOpen(false)} // inchidere dialog partajare
        entry={entry} // datele intrarii
      />

      <ExportDialog
        open={exportOpen} // dialog export deschis
        onClose={() => setExportOpen(false)} // inchidere dialog export
        entry={entry} // datele intrarii
      />
    </>
  )
}

export default JournalEntryView // exporta componenta
