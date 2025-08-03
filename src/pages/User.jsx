import React, { useEffect, useState } from 'react';

export default function User() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    window.electronAPI.getAllUsers().then(setUsers);
  }, []);

  return (
    <div>
      <h2>用户管理</h2>
      <ul>
        {users.map(u => (
          <li key={u.id}>{u.name} - {u.role}</li>
        ))}
      </ul>
    </div>
  );
}