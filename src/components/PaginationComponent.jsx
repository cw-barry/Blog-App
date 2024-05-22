import React, { useContext } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { BlogContext } from '../context/BlogContext';

const PaginationComponent = () => {
  const { page, setPage, paginationData } = useContext(BlogContext);
  let pages = Array.from(
    { length: paginationData.totalPages },
    (_, index) => index + 1
  );
  pages.unshift(page - 1 > 1 ? pages - 1 : 1);
  pages.unshift(1);
  pages.push(
    page + 1 <= paginationData.totalPages ? page + 1 : paginationData.totalPages
  );
  pages.push(paginationData.totalPages);
  console.log(pages);

  return (
    <div className=" d-flex align-items-center justify-content-center mt-3">
      <Pagination aria-label="Page navigation">
        {pages.map((item, index) =>
          index < 2 || index >= pages.length - 2 ? (
            <PaginationItem
              key={index}
              {...(index >= pages.length - 2 &&
                page === paginationData.totalPages && { disabled: true })}
              {...(index < 2 && page === 1 && { disabled: true })}
            >
              <PaginationLink
                {...(index === 0 && { first: true })}
                {...(index === 1 && { previous: true })}
                {...(index === pages.length - 2 && { next: true })}
                {...(index === pages.length - 1 && { last: true })}
                onClick={() => setPage(item)}
              />
            </PaginationItem>
          ) : (
            <PaginationItem
              key={index}
              {...(index === page + 1 && { active: true })}
            >
              <PaginationLink onClick={() => setPage(item)}>
                {item}
              </PaginationLink>
            </PaginationItem>
          )
        )}
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
