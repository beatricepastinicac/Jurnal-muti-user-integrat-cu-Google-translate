// src/components/Journal/ShareDialog.js
import React, { useState } from 'react' // importa react si hook-ul useState
import {
  Dialog, // componenta pt dialog
  DialogTitle, // titlu dialog
  DialogContent, // continut dialog
  DialogActions, // actiuni dialog
  Button, // buton
  List, // lista optiuni
  ListItem, // item lista
  ListItemIcon, // icon item lista
  ListItemText, // text item lista
  Snackbar, // notificare
  Alert // alerta stilizata
} from '@mui/material'
import { Email, ContentCopy, Link } from '@mui/icons-material' // iconite material-ui
import shareService from '../../services/shareService' // serviciu pt partajare
import { useAuth } from '../../context/AuthContext' // hook pt token user

// componenta pt dialog partajare
const ShareDialog = ({ open, onClose, entry }) => {
  const { token } = useAuth() // preia token-ul user-ului autentificat
  const [snackbar, setSnackbar] = useState({
    open: false, // stare notificare inchisa
    message: '', // mesaj notificare
    severity: 'success' // tip notificare (success/error)
  })

  // handler pt actiunile de partajare
  const handleShare = async (type) => {
    try {
      switch (type) {
        case 'email': // partajare prin email
          await shareService.shareViaEmail(entry) // foloseste serviciul pt email
          break
        case 'clipboard': // copiere continut in clipboard
          const copied = await shareService.copyToClipboard(entry) // copiaza continutul
          if (copied) {
            setSnackbar({
              open: true,
              message: 'conținut copiat în clipboard!', // mesaj succes
              severity: 'success'
            })
          }
          break
        case 'link': // genereaza link de partajare
          const shareUrl = await shareService.generateShareLink(entry.id, token) // obtine link-ul
          await navigator.clipboard.writeText(shareUrl) // copiaza link-ul in clipboard
          setSnackbar({
            open: true,
            message: 'link de partajare copiat!', // mesaj succes
            severity: 'success'
          })
          break
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'eroare la partajare!', // mesaj eroare
        severity: 'error'
      })
    }
  }

  return (
    <>
      <Dialog open={open} onClose={onClose}> {/* dialog partajare */}
        <DialogTitle>partajează intrarea</DialogTitle>
        <DialogContent>
          <List>
            {/* optiune partajare prin email */}
            <ListItem button onClick={() => handleShare('email')}>
              <ListItemIcon>
                <Email /> {/* icon email */}
              </ListItemIcon>
              <ListItemText primary="partajează prin email" />
            </ListItem>
            {/* optiune copiere in clipboard */}
            <ListItem button onClick={() => handleShare('clipboard')}>
              <ListItemIcon>
                <ContentCopy /> {/* icon clipboard */}
              </ListItemIcon>
              <ListItemText primary="copiază în clipboard" />
            </ListItem>
            {/* optiune generare link partajare */}
            <ListItem button onClick={() => handleShare('link')}>
              <ListItemIcon>
                <Link /> {/* icon link */}
              </ListItemIcon>
              <ListItemText primary="generează link de partajare" />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>închide</Button> {/* buton inchidere */}
        </DialogActions>
      </Dialog>

      {/* notificare (snackbar) */}
      <Snackbar
        open={snackbar.open} // stare notificare deschisa
        autoHideDuration={6000} // durata afisare notificare
        onClose={() => setSnackbar({ ...snackbar, open: false })} // handler inchidere notificare
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })} // inchidere alerta
          severity={snackbar.severity} // tip alerta (success/error)
        >
          {snackbar.message} {/* mesaj notificare */}
        </Alert>
      </Snackbar>
    </>
  )
}

export default ShareDialog // exporta componenta
