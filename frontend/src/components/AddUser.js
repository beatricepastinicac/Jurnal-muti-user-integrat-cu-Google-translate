import React, { useState } from 'react' // importa react si hook-ul useState

// componenta pt adaugarea unui utilizator
function AddUser({ onUserAdded }) {
  const [username, setUsername] = useState('') // stare pt numele utilizatorului
  const [password, setPassword] = useState('') // stare pt parola

  // handler pt submit formular
  const handleSubmit = async (e) => {
    e.preventDefault() // previne comportamentul default al formularului
    const newUser = { username, password } // creeaza obiectul utilizator

    try {
      // trimite cerere POST catre server pt adaugarea utilizatorului
      const response = await fetch('http://localhost:3010/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, // header pt json
        body: JSON.stringify(newUser) // converteste utilizatorul in json
      })
      if (response.ok) {
        onUserAdded() // notifica parintele ca s-a adaugat utilizatorul
        setUsername('') // reseteaza campul nume utilizator
        setPassword('') // reseteaza campul parola
      } else {
        console.error('eroare la adăugarea utilizatorului.') // log eroare raspuns
      }
    } catch (error) {
      console.error('eroare la adăugarea utilizatorului:', error) // log eroare retea
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="nume utilizator" // text ajutator in camp
          value={username} // valoarea curenta a campului
          onChange={(e) => setUsername(e.target.value)} // actualizeaza stare username
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="parolă" // text ajutator in camp
          value={password} // valoarea curenta a campului
          onChange={(e) => setPassword(e.target.value)} // actualizeaza stare parola
        />
      </div>
      <button type="submit" className="btn btn-primary">adaugă utilizator</button> {/* buton submit */}
    </form>
  )
}

export default AddUser // exporta componenta
