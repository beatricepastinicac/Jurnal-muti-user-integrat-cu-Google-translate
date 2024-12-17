import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  Paper,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';

// Modifică importurile pentru iconițe
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Translate as TranslateIcon
} from '@mui/icons-material';

import TranslateDialog from './TranslateDialog';

const JournalEntryDetail = ({ entry, onClose, onEdit, onDelete }) => {
  const [translateOpen, setTranslateOpen] = useState(false);

  const languages = {
    'ro': 'Română',
    'en': 'Engleză',
    'fr': 'Franceză',
    'es': 'Spaniolă',
    'de': 'Germană'
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('ro-RO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <Dialog
        open={true}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column'
          }
        }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" component="div">
              {entry.title}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Chip 
                label={languages[entry.originalLanguage]} 
                size="small" 
                color="primary"
              />
              <Tooltip title="Editează">
                <IconButton size="small" onClick={() => onEdit(entry)}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Șterge">
                <IconButton size="small" onClick={() => onDelete(entry.id)}>
                  <DeleteIcon />
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
              bgcolor: 'grey.50', 
              minHeight: '200px',
              whiteSpace: 'pre-wrap'
            }}
          >
            {entry.content}
          </Paper>

          <Box sx={{ mt: 2 }}>
            <Typography variant="caption" color="text.secondary">
              Creat la: {formatDate(entry.createdAt)}
            </Typography>
            {entry.updatedAt !== entry.createdAt && (
              <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
                Ultima modificare: {formatDate(entry.updatedAt)}
              </Typography>
            )}
          </Box>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'space-between', px: 2 }}>
          <Box>
            <Tooltip title="Traduceți">
              <IconButton onClick={() => setTranslateOpen(true)}>
                <TranslateIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Box>
            <Button onClick={onClose}>
              Închide
            </Button>
          </Box>
        </DialogActions>
      </Dialog>

      {translateOpen && (
        <TranslateDialog
          open={translateOpen}
          onClose={() => setTranslateOpen(false)}
          content={entry.content}
          originalLanguage={entry.originalLanguage}
        />
      )}
    </>
  );
};

export default JournalEntryDetail;