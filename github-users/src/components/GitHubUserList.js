import React from 'react';
import GitHubUserEntry from './GitHubUserEntry.js';

const GitHubUserList = ({ users }) => {
  return (
  <div className='list-of-users'>
    {users.map((user, i)  => {
      return <GitHubUserEntry index={i} userInfo={user} />
    })}
  </div>
  )
}

export default GitHubUserList;
