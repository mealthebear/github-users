import './App.css';
import axios from 'axios';
import React, { useState } from 'react';
import GitHubUserList from './components/GitHubUserList.js';
import UserSearchForm from './components/UserSearchForm.js';
import LoadingCircle from './components/LoadingCircle.js';

const App = () => {
  const [isLoading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [paginatedUsers, setPagination] = useState(null);
  const [currentPage, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);

  const paginateResults = (listOfUsers) => {
    let usersPerPage = 5;
    if (listOfUsers.length < 5) {
      usersPerPage = listOfUsers.length;
    };
    let numberOfPages = Math.ceil(listOfUsers.length / usersPerPage);
    setMaxPages(numberOfPages);
    const paginatedResults = [];
    for (let i = 0; i < numberOfPages; i++) {
      let currentPageList = [];
      for (let j = 0; j < usersPerPage; j++) {
        let currentUser = (i * usersPerPage) + j;
        if (currentUser >= listOfUsers.length) {
          break;
        }
        currentPageList.push(listOfUsers[currentUser]);
      }
      paginatedResults.push(currentPageList);
    }
    setLoading(false);
    setPagination(paginatedResults);
  }

  const fetchUsers = async (username) => {
    setLoading(true);
    const usersRetrieved = await axios.get(`https://api.github.com/search/users?q=${username}&per_page=12`, {
      headers: {
        Authorization: `Bearer ${process.env.GH_API_TOKEN}`
      }
    });
    const users = usersRetrieved.data.items;
    const listOfUsers = [];
    for (let i = 0; i < users.length; i++) {
      let userInfo = {};
      userInfo.username = users[i].login;
      userInfo.image = users[i].avatar_url;
      userInfo.url = users[i].html_url;
      let repos = await axios.get(users[i].repos_url);
      userInfo.repoCount = repos.data.length;
      let stargazers = 0;
      for (let j = 0; j < repos.data.length; j++) {
        stargazers += repos.data[j].stargazers_count;
      }
      userInfo.stargazerCount = stargazers;
      let followers = await axios.get(users[i].followers_url);
      userInfo.followerCount = followers.data.length;
      listOfUsers.push(userInfo);
    }
    setTotalResults(listOfUsers.length);
    paginateResults(listOfUsers);
  }

  return (
    <>
      <UserSearchForm fetchUsers={fetchUsers} />
      {isLoading ? <LoadingCircle /> : null}
      {paginatedUsers ?
        <GitHubUserList
          currentPage={currentPage}
          maxPages={maxPages}
          setPage={setPage}
          totalResults={totalResults}
          users={paginatedUsers[currentPage - 1]}
        /> 
        : null}
    </>
  )
}

export default App;
