import React from 'react';

const GitHubUserEntry = ({ userInfo }) => {
  return (
    <div className='user-entry'>
      <div className='user-name'>
        {userInfo.username}
      </div>
      <div>
        <a href={userInfo.url}><img className='user-image' src={userInfo.image} /></a>
      </div>
      <div className='user-stat'>Number of repos: {userInfo.repoCount}</div>
      <div className='user-stat'>Number of stargazers: {userInfo.stargazerCount}</div>
      <div className='user-stat'>Number of followers: {userInfo.followerCount}</div>
    </div>
  )
}

export default GitHubUserEntry;
