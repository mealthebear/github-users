import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import GitHubUserList from './components/GitHubUserList.js';
import UserSearchForm from './components/UserSearchForm.js';
import LoadingCircle from './components/LoadingCircle.js';

const App = () => {
  const [isLoading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [paginatedUsers, setPagination] = useState(null);
  const [currentPage, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);

  // useEffect(() => {
  //   let allUsers = [];
  //   let someUsers = [];
  //   for (let i = 0; i < 5; i++) {
  //     let userObj = {};
  //     userObj.username = 'abc';
  //     userObj.image = 'https://media.istockphoto.com/photos/happy-shiba-inu-dog-on-yellow-redhaired-japanese-dog-smile-portrait-picture-id1197121742?k=20&m=1197121742&s=612x612&w=0&h=HX4DoFCL1RDlegj3P9w4O2H64sgwKvMP0VSki7sBEtE=';
  //     userObj.url = 'http://github.com';
  //     userObj.stargazerCount = 1;
  //     userObj.followerCount = 5;
  //     userObj.repoCount = 14;
  //     someUsers.push(userObj);
  //   };
  //   let coolObj = {
  //     username: 'xyz',
  //     image: 'https://image.shutterstock.com/image-photo/portrait-beautiful-chic-red-shiba-260nw-1432450229.jpg',
  //     stargazerCount: 55,
  //     repoCount: 37,
  //     followerCount: 78,
  //   };
  //   let secondList = [];
  //   secondList.push(coolObj);
  //   allUsers.push(someUsers);
  //   allUsers.push(secondList);
  //   console.log(maxPages);
  //   let resultsPerPage = 5;
  //   let maxNumOfPages = Math.ceil((someUsers.length + secondList.length) / resultsPerPage);
  //   setTotalResults((someUsers.length + secondList.length));
  //   setMaxPages(maxNumOfPages);
  //   setPagination(allUsers);
  // }, []);

  const paginateResults = (listOfUsers) => {
    let usersPerPage = 5; // Hard-coded for now
    if (listOfUsers.length < 5) {
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
        if (currentUser >= listOfUsers.length) {
          break;
        }
        console.log(currentUser, 'THIS IS CURRENT USER INDEX***');
        currentPageList.push(listOfUsers[currentUser]);
        console.log(currentPageList, 'THIS IS THE CURRENT USER LIST***');
      }
      paginatedResults.push(currentPageList);
    }
    console.log(paginatedResults, 'FOR LOOP FINISHED***');
    setLoading(false);
    setPagination(paginatedResults);
  }

  const fetchUsers = async (username) => {
    setLoading(true);
    const usersRetrieved = await axios.get(`https://api.github.com/search/users?q=${username}&per_page=12`);
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
    console.log(listOfUsers, '**** THIS IS USER INFO!!! *****');
    setTotalResults(listOfUsers.length);
    paginateResults(listOfUsers);
  }

  const toggleLoading = () => {
    setLoading(!isLoading);
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
