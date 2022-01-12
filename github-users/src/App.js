import './App.css';
import axios from 'axios';
import React, { useState } from 'react';
import GitHubUserList from './components/GitHubUserList.js';
import UserSearchForm from './components/UserSearchForm.js';

const App = () => {
  const [listOfUsers, setUsers] = useState([]);

  const fetchUsers = async (username) => {
    const usersRetrieved = await axios.get(`https://api.github.com/search/users?q=${username}`);
    const users = usersRetrieved.data.items;
    const listOfUsers = [];
    for (let i = 0; i < users.length; i++) {
      let userInfo = {};
      userInfo.username = users[i].login;
      userInfo.image = users[i].avatar_url;
      let repos = await axios.get(users[i].repos_url);
      userInfo.repoCount = repos.data.length;
      let stargazers = 0;
      for (let j = 0; j < repos.length; j++) {
        stargazers += repos[j].stargazer_count;
        console.log(stargazers);
      }
      userInfo.stargazerCount = stargazers;
      let followers = await axios.get(users[i].followers_url);
      userInfo.followerCount = followers.data.length;
      listOfUsers.push(userInfo);
    }
    console.log(listOfUsers, '**** THIS IS USER INFO!!! *****');
    setUsers(listOfUsers);
  }

  return (
    <>
      Rendered the app!
      <UserSearchForm fetchUsers={fetchUsers} />
      <GitHubUserList users={listOfUsers}/>
    </>
  )
}

export default App;
