import React from 'react';
import GitHubUserEntry from './GitHubUserEntry.js';
import PageScroller from './PageScroller.js';

const GitHubUserList = ({ currentPage, maxPages, setPage, totalResults, users }) => {
  return (
  <div className='list-of-users'>
    <div className='result-total'>Total Number of Results: {totalResults}</div>
    {users.map((user, i)  => {
      return <GitHubUserEntry index={i} userInfo={user} />
    })}
    <PageScroller pageNumber={currentPage} maxPages={maxPages} setPage={setPage} />
  </div>
  )
}

export default GitHubUserList;
