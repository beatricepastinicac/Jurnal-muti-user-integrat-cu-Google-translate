// src/services/shareService.js
const shareService = {
  // partajare prin email
  shareViaEmail: async (entry) => {
    const subject = encodeURIComponent(`jurnal: ${entry.title}`) // encodeaza subiectul
    const body = encodeURIComponent(
      `${entry.title}\n\n${entry.content}\n\ncreat la: ${new Date(entry.createdAt).toLocaleString('ro-RO')}` // encodeaza continutul
    )
    window.location.href = `mailto:?subject=${subject}&body=${body}` // deschide aplicatia de email
  },

  // copiere in clipboard
  copyToClipboard: async (entry) => {
    const textToCopy = `${entry.title}\n\n${entry.content}` // textul de copiat

    try {
      await navigator.clipboard.writeText(textToCopy) // scrie textul in clipboard
      return true // succes
    } catch (error) {
      console.error('error copying to clipboard:', error) // logheaza eroarea
      return false // esec
    }
  },

  // generare link de partajare
  generateShareLink: async (entryId, token) => {
    try {
      const response = await fetch(`http://localhost:5000/api/journal/${entryId}/share`, {
        method: 'POST', // metoda POST
        headers: {
          'Authorization': `Bearer ${token}`, // adauga token-ul
          'Content-Type': 'application/json' // setare header
        }
      })

      if (!response.ok) {
        throw new Error('failed to generate share link') // arunca eroare daca nu e ok
      }

      const data = await response.json() // parseaza raspunsul
      return data.shareUrl // returneaza link-ul generat
    } catch (error) {
      console.error('error generating share link:', error) // logheaza eroarea
      throw error // arunca eroarea pt handling ulterior
    }
  },

  // exportare in format text
  exportAsText: (entry) => {
    const content = `${entry.title}\n\n${entry.content}\n\ncreat la: ${new Date(entry.createdAt).toLocaleString('ro-RO')}` // continutul de exportat
    const blob = new Blob([content], { type: 'text/plain' }) // creeaza un blob text
    return blob // returneaza blob-ul
  }
}

export default shareService // exporta serviciul
