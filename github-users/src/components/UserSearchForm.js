import React, { useState } from 'react';

const UserSearchForm = ({ fetchUsers }) => {
  const [username, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUsers(username);
  }

  return (
    <div className='search-form'>
      <h2>Look up users on GitHub!</h2>
      <form onSubmit={handleSubmit}>
        <input type='text' onChange={handleChange} placeholder='Search for users' />
        <input type='submit' value='Search' />
      </form>
    </div>
  )
}

export default UserSearchForm;
