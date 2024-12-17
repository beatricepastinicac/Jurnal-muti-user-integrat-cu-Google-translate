// src/services/shareService.js
const shareService = {
    // Partajare prin email
    shareViaEmail: async (entry) => {
      const subject = encodeURIComponent(`Jurnal: ${entry.title}`);
      const body = encodeURIComponent(
        `${entry.title}\n\n${entry.content}\n\nCreat la: ${new Date(entry.createdAt).toLocaleString('ro-RO')}`
      );
      
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    },
  
    // Copiere în clipboard
    copyToClipboard: async (entry) => {
      const textToCopy = `${entry.title}\n\n${entry.content}`;
      
      try {
        await navigator.clipboard.writeText(textToCopy);
        return true;
      } catch (error) {
        console.error('Error copying to clipboard:', error);
        return false;
      }
    },
  
    // Generare link de partajare (dacă backend-ul suportă această funcționalitate)
    generateShareLink: async (entryId, token) => {
      try {
        const response = await fetch(`http://localhost:5000/api/journal/${entryId}/share`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
  
        if (!response.ok) {
          throw new Error('Failed to generate share link');
        }
  
        const data = await response.json();
        return data.shareUrl;
      } catch (error) {
        console.error('Error generating share link:', error);
        throw error;
      }
    },
  
    // Export în format text
    exportAsText: (entry) => {
      const content = `${entry.title}\n\n${entry.content}\n\nCreat la: ${new Date(entry.createdAt).toLocaleString('ro-RO')}`;
      const blob = new Blob([content], { type: 'text/plain' });
      return blob;
    }
  };
  
  export default shareService;