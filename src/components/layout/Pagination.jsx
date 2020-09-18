import React from 'react';
// import {pagination} from 'react-bootstrap';
import _ from 'lodash';

const Pagination = props => {
     const { itemsCount, pageSize,onPageChange,currentPage } = props;
    const pagesCount = Math.ceil(itemsCount / pageSize);

    if (pagesCount===1) return null;

    const pages = _.range(1, pagesCount +1); 

    return ( <div>
        <nav style={{backgroundColor:'none'}}>
            <ul className='pagination' style={{cursor:'pointer'}}>
            {pages.map(page=> 
                <li key = {page} className={page === currentPage ? 'page-item active' : 'page-item'} >
                         <a className='page-link' onClick={ ()=> onPageChange(page)}>
                            {page}
                        </a>
                    </li>
                )}  
            </ul>
        </nav>
    </div> );
}
export default Pagination;

