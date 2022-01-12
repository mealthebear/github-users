import React from 'react';

const PageScroller = ({ maxPages, pageNumber, setPage }) => {
  const decrementPage = () => {
    const currentPage = (pageNumber - 1);
    setPage(currentPage);
  }

  const incrementPage = () => {
    console.log('INVOKED INCREMENT FUNCTION***');
    const currentPage = (pageNumber + 1);
    console.log(currentPage, 'THIS IS THE NEWLY INCREMENTED PAGE NUMBER');
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
      <div className='page-number'>{pageNumber}</div>
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
