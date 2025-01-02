import React, { useState } from 'react';
import UserList from '../components/UserList';
import AddUser from '../components/AddUser';

function UsersPage() {
  const [refresh, setRefresh] = useState(false);

  const handleUserAdded = () => {
    setRefresh(!refresh);
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
