import React, { useContext } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { BlogContext } from '../context/BlogContext';

const PaginationComponent = () => {
  const { page, setPage, paginationData } = useContext(BlogContext);
  // console.log(paginationData);
  const totalPages = paginationData.totalPages;
  let pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  pages.unshift(page - 1 > 1 ? pages - 1 : 1);
  pages.unshift(1);
  pages.push(page + 1 <= totalPages ? page + 1 : totalPages);
  pages.push(totalPages);
  // console.log(pages);

  return (
    <div className=" d-flex align-items-center justify-content-center mt-3">
      <Pagination aria-label="Page navigation">
        {pages.map((item, index) => (
          <PaginationItem
            key={index}
            disabled={
              (index < 2 && page === 1) ||
              (index >= pages.length - 2 && page === totalPages)
            }
            active={index === page + 1}
          >
            <PaginationLink
              first={index === 0}
              previous={index === 1}
              next={index === pages.length - 2}
              last={index === pages.length - 1}
              // {...(index === 0 && { first: true })}
              // {...(index === 1 && { previous: true })}
              // {...(index === pages.length - 2 && { next: true })}
              // {...(index === pages.length - 1 && { last: true })}
              onClick={() => setPage(item)}
            >
              {index < 2 || index >= pages.length - 2 ? null : item}
            </PaginationLink>
          </PaginationItem>
        ))}
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
