import React, { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3010/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Eroare la preluarea utilizatorilor:', error));
  }, []);

  const handleDeleteUser = (id) => {
    fetch(`http://localhost:3010/users/${id}`, { method: 'DELETE' })
      .then(() => setUsers(users.filter(user => user.id !== id)))
      .catch(error => console.error('Eroare la ștergerea utilizatorului:', error));
  };

  return (
    <ul className="list-group">
      {users.map(user => (
        <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
          {user.username}
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDeleteUser(user.id)}
          >
            Șterge
          </button>
        </li>
      ))}
    </ul>
  );
}

export default UserList;
