import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import GitHubUserList from './components/GitHubUserList.js';

const App = () => {
  const [listOfUsers, setUsers] = useState([]);

  const fetchUsers = async () => {
    const users = await axios.get('https://api.github.com/search/users?q=example');
    setUsers(users.data.items);
  }

  useEffect(() => {
    fetchUsers();
  })

  return (
    <>
      Rendered the app!
    </>
  )
}

export default App;
