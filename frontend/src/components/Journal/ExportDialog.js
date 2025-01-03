import React, { useState } from 'react' // importa react si hook-ul useState
import {
  Dialog, // componenta pt dialog
  DialogTitle, // titlu dialog
  DialogContent, // continut dialog
  DialogActions, // butoane actiuni
  Button, // buton
  List, // lista de optiuni
  ListItem, // item lista
  ListItemIcon, // icon item
  ListItemText, // text item
  CircularProgress // indicator incarcare
} from '@mui/material'
import { PictureAsPdf, Code, TextFields } from '@mui/icons-material' // iconite material-ui
import pdfService from '../../services/pdfService' // serviciu pt generare/export pdf/html

// componenta pt export intrare jurnal
const ExportDialog = ({ open, onClose, entry }) => {
  const [loading, setLoading] = useState(false) // stare pt indicator incarcare

  // functie pt exportare
  const handleExport = async (type) => {
    setLoading(true) // seteaza loading true
    try {
      switch (type) {
        case 'pdf': // export ca pdf
          await pdfService.generatePDF(entry) // foloseste serviciul pt generare pdf
          break
        case 'html': // export ca html
          const htmlBlob = await pdfService.exportToHTML(entry) // genereaza blob html
          const htmlUrl = URL.createObjectURL(htmlBlob) // creeaza url temporar
          window.open(htmlUrl) // deschide url-ul in browser
          break
        case 'text': // export ca text
          const textBlob = new Blob([entry.content], { type: 'text/plain' }) // genereaza blob text
          const textUrl = URL.createObjectURL(textBlob) // creeaza url temporar
          const a = document.createElement('a') // creeaza link download
          a.href = textUrl
          a.download = `${entry.title}.txt` // seteaza numele fisierului
          a.click() // simuleaza click pt descarcare
          break
      }
      onClose() // inchide dialogul dupa export
    } catch (error) {
      console.error('export error:', error) // logheaza erorile
    } finally {
      setLoading(false) // seteaza loading false
    }
  }

  return (
    <Dialog open={open} onClose={onClose}> {/* dialog pt export */}
      <DialogTitle>exporta intrarea</DialogTitle> {/* titlu dialog */}
      <DialogContent>
        <List>
          {/* optiune export pdf */}
          <ListItem button onClick={() => handleExport('pdf')} disabled={loading}>
            <ListItemIcon>
              <PictureAsPdf /> {/* icon pdf */}
            </ListItemIcon>
            <ListItemText primary="export ca pdf" />
          </ListItem>
          {/* optiune export html */}
          <ListItem button onClick={() => handleExport('html')} disabled={loading}>
            <ListItemIcon>
              <Code /> {/* icon html */}
            </ListItemIcon>
            <ListItemText primary="export ca html" />
          </ListItem>
          {/* optiune export text */}
          <ListItem button onClick={() => handleExport('text')} disabled={loading}>
            <ListItemIcon>
              <TextFields /> {/* icon text */}
            </ListItemIcon>
            <ListItemText primary="export ca text" />
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        {loading && <CircularProgress size={24} sx={{ mr: 2 }} />} {/* indicator incarcare */}
        <Button onClick={onClose}>inchide</Button> {/* buton pt inchidere */}
      </DialogActions>
    </Dialog>
  )
}

export default ExportDialog // exporta componenta
