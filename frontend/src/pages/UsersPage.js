import React, { useState } from 'react';
import AddUser from '../components/AddUser';
import UserList from '../components/UserList';

function UsersPage() {
  const [refresh, setRefresh] = useState(false);

  const handleUserAdded = () => {
    setRefresh(!refresh); // Trigger reîmprospătare listă
  };

  return (
    <div>
      <h1>Gestionare Utilizatori</h1>
      <AddUser onUserAdded={handleUserAdded} />
      <UserList key={refresh} />
    </div>
  );
}

export default UsersPage;
