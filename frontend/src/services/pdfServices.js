import { jsPDF } from 'jspdf' // importa libraria jsPDF pt generare pdf
import html2canvas from 'html2canvas' // importa libraria pt capturare HTML ca imagine

// serviciu pt operatii PDF si HTML
const pdfService = {
  // functie pt generare PDF
  generatePDF: async (entry) => {
    const pdf = new jsPDF('p', 'mm', 'a4') // initializeaza pdf-ul in format A4, portret

    // adauga titlul intrarii
    pdf.setFontSize(16)
    pdf.text(entry.title, 20, 20) // text pe pagina, pozitia x=20, y=20

    // adauga metadata (data crearii)
    pdf.setFontSize(10)
    const createdAt = new Date(entry.createdAt).toLocaleString('ro-RO') // formateaza data
    pdf.text(`data creării: ${createdAt}`, 20, 30)

    // adauga continutul intrarii
    pdf.setFontSize(12)
    const contentLines = pdf.splitTextToSize(entry.content, 170) // imparte textul pt a se potrivi in pagini
    pdf.text(contentLines, 20, 40)

    // salveaza pdf-ul cu un nume unic
    pdf.save(`jurnal_${entry.id}_${new Date().getTime()}.pdf`)
  },

  // functie pt exportare intrare ca HTML
  exportToHTML: async (entry) => {
    const htmlContent = `
      <html>
        <head>
          <title>${entry.title}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            .title { font-size: 24px; margin-bottom: 20px; }
            .metadata { font-size: 12px; color: #666; }
            .content { margin-top: 20px; white-space: pre-wrap; }
          </style>
        </head>
        <body>
          <div class="title">${entry.title}</div> <!-- titlul intrarii -->
          <div class="metadata">
            creat la: ${new Date(entry.createdAt).toLocaleString('ro-RO')} <!-- data crearii -->
          </div>
          <div class="content">${entry.content}</div> <!-- continutul intrarii -->
        </body>
      </html>
    `

    // creeaza un blob pt descarcare
    const blob = new Blob([htmlContent], { type: 'text/html' })
    return blob // returneaza blob-ul
  }
}

export default pdfService // exporta serviciul
