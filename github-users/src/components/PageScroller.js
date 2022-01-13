import React from 'react';

const PageScroller = ({ maxPages, pageNumber, setPage }) => {
  const decrementPage = () => {
    const currentPage = (pageNumber - 1);
    setPage(currentPage);
  }

  const incrementPage = () => {
    const currentPage = (pageNumber + 1);
    setPage(currentPage);
  }

  return (
    <div className='page-scroller'>
      <div 
        className='arrow'
        disabled={pageNumber === 1 ? true : false}
        onClick={pageNumber === 1 ? null : () => decrementPage()}
      >
        {'<'}
      </div>
      <div className='page-number'>Page {pageNumber} of {maxPages}</div>
      <div 
        className='arrow'
        disabled={maxPages === pageNumber ? true : false}
        onClick={maxPages === pageNumber ? null : () => incrementPage()}
      >
        {'>'}
      </div>
    </div>
  )
}

export default PageScroller;
