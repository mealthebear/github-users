import React from 'react';

const GitHubUserEntry = ({ userInfo }) => {
  return (
    <div className='user-entry'>
      <div className='user-profile'>
        <div className='user-name'>
          {userInfo.username}
        </div>
        <div className='user-image'>
          <a href={userInfo.url}><img className='profile-photo' src={userInfo.image} /></a>
        </div>
      </div>
      <div className='user-stats'>
        <div className='user-stat'>Number of Repositories: {userInfo.repoCount}</div>
        <div className='user-stat'>Number of Stargazers: {userInfo.stargazerCount}</div>
        <div className='user-stat'>Number of Followers: {userInfo.followerCount}</div>
      </div>
    </div>
  )
}

export default GitHubUserEntry;
