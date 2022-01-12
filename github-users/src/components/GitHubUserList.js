import axios from 'axios';
import React from 'react';
import GitHubUserEntry from './GitHubUserEntry.js';

const GitHubUserList = ({ users }) => {
  const stargazerCount = async (reposURL) => {
    const stargazerInfo = { title: 'Number of stargazers:', value: 0 };
    const repos = await axios(reposURL);
    repos.map(repo => stargazerInfo.value += repo.stargazers_count);
    return stargazerInfo;
  }

  const followerCount = async (followersURL) => {
    const followerInfo = { title: 'Number of followers:', value: 0 };
    const followers = await axios(followersURL);
    followerInfo.value = followers.length;
    return followerInfo;
  }

  const repoCount = async (reposURL) => {
    const repoInfo = { title: 'Number of repos:', value: 0 };
    const repos = await axios(reposURL);
    repoInfo.value = repos.length;
    return repoInfo;
  }

  const githubInfoCalls = async (followersURL, reposURL) => {
    let userInfo = [];
    const followers = await followerCount(followersURL);
    const repos = await repoCount(reposURL);
    const stargazers = await stargazerCount(reposURL);
    userInfo.push(followers, repos, stargazers);
    return userInfo;
  }

  <div className='list-of-users'>
    {users.map(async (user, i) => {
      let followersURL = user.followers_url;
      let reposURL = user.repos_url;
      const userInfo = await githubInfoCalls(followersURL, reposURL);
      return <GitHubUserEntry imageURL={user.avatar_url} index={i} userInfo={userInfo} />
    })}
  </div>
}

export default GitHubUserList;
