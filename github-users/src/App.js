import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const App = () => {
  const [listOfUsers, setUsers] = useState([]);

  const fetchUsers = async () => {
    const users = await axios.get('https://api.github.com/search/users?q=example');
    console.log(users.data.items);
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
