import React, { useState } from 'react';

function AddUser({ onUserAdded }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = { username, password };

    try {
      const response = await fetch('http://localhost:3010/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        onUserAdded();
        setUsername('');
        setPassword('');
      } else {
        console.error('Eroare la adăugarea utilizatorului.');
      }
    } catch (error) {
      console.error('Eroare la adăugarea utilizatorului:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Nume utilizator"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Parolă"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">Adaugă utilizator</button>
    </form>
  );
}

export default AddUser;
