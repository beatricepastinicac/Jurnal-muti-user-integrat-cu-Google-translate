import React, { useState } from 'react' // importa react si hook-ul useState
import UserList from '../components/UserList' // componenta pt lista utilizatori
import AddUser from '../components/AddUser' // componenta pt adaugare utilizatori

// componenta pagina gestionare utilizatori
function UsersPage() {
  const [refresh, setRefresh] = useState(false) // stare pt actualizare lista

  // functie apelata cand se adauga un utilizator
  const handleUserAdded = () => {
    setRefresh(!refresh) // schimba valoarea starii pt a forta re-render
  }

  return (
    <div>
      <h1>gestionare utilizatori</h1> {/* titlu pagina */}
      <AddUser onUserAdded={handleUserAdded} /> {/* formular adaugare utilizator */}
      <UserList key={refresh} /> {/* lista utilizatori, re-randata cand refresh se schimba */}
    </div>
  )
}

export default UsersPage // exporta componenta
