import './App.css';
import axios from 'axios';
import React, { useState } from 'react';
import GitHubUserList from './components/GitHubUserList.js';
import UserSearchForm from './components/UserSearchForm.js';

const App = () => {
  const [listOfUsers, setUsers] = useState([]);

  const fetchUsers = async (username) => {
    const users = await axios.get(`https://api.github.com/search/users?q=${username}`);
    setUsers(users.data.items);
  }

  return (
    <>
      Rendered the app!
      <UserSearchForm fetchUsers={fetchUsers} />
    </>
  )
}

export default App;
