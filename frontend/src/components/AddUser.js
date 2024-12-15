import React, { useState } from 'react';

function AddUser({ onUserAdded }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = { username, password };

    try {
      const response = await fetch('http://localhost:3010/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        onUserAdded();
        setUsername('');
        setPassword('');
      } else {
        console.error('Eroare la adăugarea utilizatorului');
      }
    } catch (error) {
      console.error('Eroare:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Nume utilizator</label>
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Parolă</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary mt-2">
        Adaugă utilizator
      </button>
    </form>
  );
}

export default AddUser;
