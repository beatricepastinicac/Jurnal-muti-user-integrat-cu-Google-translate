import React, { useState } from 'react' // importa react si hook-ul useState

// componenta pt gestionarea notelor
function NotesPage() {
    const [noteId, setNoteId] = useState('') // stare pt ID-ul notei
    const [language, setLanguage] = useState('') // stare pt limba tinta
    const [translation, setTranslation] = useState(null) // stare pt traducerea notei

    // functie pt traducerea notei
    const handleTranslate = async () => {
        try {
            const response = await fetch(`http://localhost:3010/notes/${noteId}/translate`, {
                method: 'POST', // metoda POST pt cerere
                headers: { 'Content-Type': 'application/json' }, // setare header
                body: JSON.stringify({ targetLanguage: language }) // trimite limba tinta
            })

            if (response.ok) {
                const data = await response.json() // parseaza raspunsul
                setTranslation(data) // seteaza traducerea in stare
            } else {
                console.error('eroare la traducere.') // logheaza eroare
            }
        } catch (error) {
            console.error('eroare la server:', error) // logheaza eroare retea
        }
    }

    return (
        <div className="container mt-4">
            <h1 className="text-center">gestionare note</h1> {/* titlu pagina */}
            <p className="text-center">aici vei putea adăuga, șterge și edita notele.</p> {/* descriere pagina */}

            <div className="card p-4 mb-4"> {/* card pt traducerea notelor */}
                <h3 className="card-title">tradu nota</h3>
                <div className="form-group">
                    <label htmlFor="noteId">id-ul notei:</label>
                    <input
                        id="noteId"
                        className="form-control"
                        type="text"
                        placeholder="introdu id-ul notei"
                        value={noteId}
                        onChange={(e) => setNoteId(e.target.value)} // actualizeaza ID-ul notei
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="language">limbă țintă (ex: en, fr):</label>
                    <input
                        id="language"
                        className="form-control"
                        type="text"
                        placeholder="introdu limba țintă"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)} // actualizeaza limba tinta
                    />
                </div>
                <button className="btn btn-primary mt-3" onClick={handleTranslate}>
                    tradu {/* buton pt traducere */}
                </button>
            </div>

            {translation && ( // afiseaza traducerea daca exista
                <div className="card p-4">
                    <h4 className="card-title">rezultatul traducerii:</h4>
                    <p><b>original:</b> {translation.original}</p> {/* text original */}
                    <p><b>tradus:</b> {translation.translated}</p> {/* text tradus */}
                    <p><b>limbă:</b> {translation.language}</p> {/* limba traducerii */}
                </div>
            )}
        </div>
    )
}

export default NotesPage // exporta componenta
