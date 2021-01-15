import React, { useState, useEffect } from 'react';
import api from './services/Api';

import Table from './components/UserItem'
import UserForm from './components/UserForm'

import './global.css'

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/users');

      setUsers(response.data);
    }

    loadUsers();
  }, []);

  async function handleAddUsers(data) {
    const response = await api.post('/users', data)

    setUsers([...users, response.data]);
  }

  return (
    <>
      <div id="app">
        <div id="aside">
          <strong>Cadastrar</strong>
          <UserForm onSubmit={handleAddUsers} />
        </div>

        <div id="main">
          <Table key={users.id} users={users} /> 
        </div>
      </div>
    </>
  );
}

export default App;