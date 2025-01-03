import React, { useState, useEffect } from 'react' // importa react si hook-urile useState, useEffect

// componenta pt afisarea listei de utilizatori
function UserList() {
  const [users, setUsers] = useState([]) // stare pt lista de utilizatori

  // efect pt preluarea listei de utilizatori
  useEffect(() => {
    fetch('http://localhost:3010/users') // cerere catre server pt lista de utilizatori
      .then(response => response.json()) // parseaza raspunsul ca json
      .then(data => setUsers(data)) // actualizeaza starea cu utilizatorii
      .catch(error => console.error('eroare la preluarea utilizatorilor:', error)) // logheaza erorile
  }, []) // ruleaza o singura data la montarea componentei

  // handler pt stergerea unui utilizator
  const handleDeleteUser = (id) => {
    fetch(`http://localhost:3010/users/${id}`, { method: 'DELETE' }) // cerere DELETE catre server
      .then(() => setUsers(users.filter(user => user.id !== id))) // elimina utilizatorul din stare
      .catch(error => console.error('eroare la ștergerea utilizatorului:', error)) // logheaza erorile
  }

  return (
    <ul className="list-group"> {/* lista utilizatori */}
      {users.map(user => ( // parcurge lista de utilizatori
        <li 
          key={user.id} 
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          {user.username} {/* afiseaza numele utilizatorului */}
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDeleteUser(user.id)} // sterge utilizatorul la click
          >
            șterge {/* buton stergere */}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default UserList // exporta componenta
