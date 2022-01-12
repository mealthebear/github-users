import React from 'react';

const GitHubUserEntry = ({ userInfo }) => {
  return (
    <div>
      <div className='user-name'>
        {userInfo.username}
      </div>
      <div className='user-image'>
        <img src={userInfo.image} />
      </div>
      <div className='user-stat'>Number of repos: {userInfo.repoCount}</div>
      <div className='user-stat'>Number of stargazers: {userInfo.stargazerCount}</div>
      <div className='user-stat'>Number of followers: {userInfo.followerCount}</div>
    </div>
  )
}

export default GitHubUserEntry;
