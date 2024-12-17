// src/components/Journal/ExportDialog.js
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress
} from '@mui/material';
import { PictureAsPdf, Code, TextFields } from '@mui/icons-material';
import pdfService from '../../services/pdfService';

const ExportDialog = ({ open, onClose, entry }) => {
  const [loading, setLoading] = useState(false);

  const handleExport = async (type) => {
    setLoading(true);
    try {
      switch (type) {
        case 'pdf':
          await pdfService.generatePDF(entry);
          break;
        case 'html':
          const htmlBlob = await pdfService.exportToHTML(entry);
          const htmlUrl = URL.createObjectURL(htmlBlob);
          window.open(htmlUrl);
          break;
        case 'text':
          const textBlob = new Blob([entry.content], { type: 'text/plain' });
          const textUrl = URL.createObjectURL(textBlob);
          const a = document.createElement('a');
          a.href = textUrl;
          a.download = `${entry.title}.txt`;
          a.click();
          break;
      }
      onClose();
    } catch (error) {
      console.error('Export error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Exportă intrarea</DialogTitle>
      <DialogContent>
        <List>
          <ListItem button onClick={() => handleExport('pdf')} disabled={loading}>
            <ListItemIcon>
              <PictureAsPdf />
            </ListItemIcon>
            <ListItemText primary="Export ca PDF" />
          </ListItem>
          <ListItem button onClick={() => handleExport('html')} disabled={loading}>
            <ListItemIcon>
              <Code />
            </ListItemIcon>
            <ListItemText primary="Export ca HTML" />
          </ListItem>
          <ListItem button onClick={() => handleExport('text')} disabled={loading}>
            <ListItemIcon>
              <TextFields />
            </ListItemIcon>
            <ListItemText primary="Export ca Text" />
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        {loading && <CircularProgress size={24} sx={{ mr: 2 }} />}
        <Button onClick={onClose}>Închide</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExportDialog;