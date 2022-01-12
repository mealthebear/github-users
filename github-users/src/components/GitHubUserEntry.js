import React from 'react';

const GitHubUserEntry = ({ imageURL, userInfo }) => {
  return (
    <div>
      <div className='user-image'>
        <img src={imageURL} />
      </div>
      {userInfo.map((stat, i) => {
        return <div className='user-info' index={i}>
          <div className='info-title'>{stat.title}</div>
          <div clasName='info-value'>{stat.value}</div>
        </div>
      })}
    </div>
  )
}

export default GitHubUserEntry;
