import React, { useContext, useEffect } from 'react';

import { BlogCard, Layout } from '../components/';
import { BlogContext } from '../context/BlogContext';
import PaginationComponent from '../components/PaginationComponent';

const Dashboard = () => {
  const { getBlogs, blogs } = useContext(BlogContext);
  useEffect(() => {
    getBlogs();
  }, []);
  return (
    <Layout>
      <p className="fs-2 text-center mt-5">Dashboard</p>
      <div className="container d-flex flex-wrap gap-3 justify-content-center ">
        {blogs.map((item) => (
          <div
            key={item.id}
            style={{
              width: '20rem',
            }}
          >
            <BlogCard data={item} />
          </div>
        ))}
      </div>
      <PaginationComponent />
    </Layout>
  );
};

export default Dashboard;
