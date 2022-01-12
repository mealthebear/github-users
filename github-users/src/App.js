import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import GitHubUserList from './components/GitHubUserList.js';
import UserSearchForm from './components/UserSearchForm.js';

const App = () => {
  const [totalResults, setTotalResults] = useState(0);
  const [paginatedUsers, setPagination] = useState(null);
  const [currentPage, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);

  useEffect(() => {
    let allUsers = [];
    let someUsers = [];
    for (let i = 0; i < 10; i++) {
      let userObj = {};
      userObj.username = 'mealthebear';
      userObj.image = 'https://media.istockphoto.com/photos/happy-shiba-inu-dog-on-yellow-redhaired-japanese-dog-smile-portrait-picture-id1197121742?k=20&m=1197121742&s=612x612&w=0&h=HX4DoFCL1RDlegj3P9w4O2H64sgwKvMP0VSki7sBEtE=';
      userObj.stargazerCount = 1;
      userObj.followerCount = 5;
      userObj.repoCount = 14;
      someUsers.push(userObj);
    };
    let coolObj = {
      username: 'Banana Boat',
      image: 'https://image.shutterstock.com/image-photo/portrait-beautiful-chic-red-shiba-260nw-1432450229.jpg',
      stargazerCount: 55,
      repoCount: 37,
      followerCount: 78,
    };
    let secondList = [];
    secondList.push(coolObj);
    allUsers.push(someUsers);
    allUsers.push(secondList);
    console.log(maxPages);
    let resultsPerPage = 10;
    let maxNumOfPages = Math.ceil((someUsers.length + secondList.length) / resultsPerPage);
    setTotalResults((someUsers.length + secondList.length))
    setMaxPages(maxNumOfPages);
    setPagination(allUsers);
  }, []);

  const paginateResults = (listOfUsers) => {
    let usersPerPage = 10; // Hard-coded for now
    if (listOfUsers.length < 10) {
      usersPerPage = listOfUsers.length;
    };
    let numberOfPages = Math.ceil(listOfUsers.length / usersPerPage);
    console.log('We called paginateResults');
    console.log(usersPerPage, numberOfPages, listOfUsers, '***PAGINATE STATS***');
    setMaxPages(numberOfPages);
    const paginatedResults = [];
    for (let i = 0; i < numberOfPages; i++) {
      let currentPageList = [];
      for (let j = 0; j < usersPerPage; j++) {
        let currentUser = (i * usersPerPage) + j
        console.log(currentUser, 'THIS IS CURRENT USER INDEX***');
        currentPageList.push(listOfUsers[currentUser]);
        console.log(currentPageList, 'THIS IS THE CURRENT USER LIST***');
      }
      paginatedResults.push(currentPageList);
    }
    console.log(paginatedResults, 'FOR LOOP FINISHED***');
    setPagination(paginatedResults);
  }

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
    setTotalResults(listOfUsers.length);
    paginateResults(listOfUsers);
  }

  return (
    <>
      Rendered the app!
      <UserSearchForm fetchUsers={fetchUsers} />
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
