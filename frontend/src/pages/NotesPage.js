import React, { useState } from 'react';

function NotesPage() {
    const [noteId, setNoteId] = useState('');
    const [language, setLanguage] = useState('');
    const [translation, setTranslation] = useState(null);

    const handleTranslate = async () => {
        try {
            const response = await fetch(`http://localhost:3010/notes/${noteId}/translate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ targetLanguage: language }),
            });

            if (response.ok) {
                const data = await response.json();
                setTranslation(data);
            } else {
                console.error('Eroare la traducere.');
            }
        } catch (error) {
            console.error('Eroare la server:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center">Gestionare Note</h1>
            <p className="text-center">Aici vei putea adăuga, șterge și edita notele.</p>

            <div className="card p-4 mb-4">
                <h3 className="card-title">Tradu Nota</h3>
                <div className="form-group">
                    <label htmlFor="noteId">ID-ul Notei:</label>
                    <input
                        id="noteId"
                        className="form-control"
                        type="text"
                        placeholder="Introdu ID-ul notei"
                        value={noteId}
                        onChange={(e) => setNoteId(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="language">Limbă țintă (ex: en, fr):</label>
                    <input
                        id="language"
                        className="form-control"
                        type="text"
                        placeholder="Introdu limba țintă"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary mt-3" onClick={handleTranslate}>
                    Tradu
                </button>
            </div>

            {translation && (
                <div className="card p-4">
                    <h4 className="card-title">Rezultatul traducerii:</h4>
                    <p><b>Original:</b> {translation.original}</p>
                    <p><b>Tradus:</b> {translation.translated}</p>
                    <p><b>Limbă:</b> {translation.language}</p>
                </div>
            )}
        </div>
    );
}

export default NotesPage;
