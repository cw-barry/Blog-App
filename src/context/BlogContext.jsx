import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toastNotify } from '../helper/Toastify';
import { AuthContext } from './AuthContext';

export const BlogContext = createContext();
const baseUrl = 'https://cwbarry.pythonanywhere.com/';
//const baseUrl = "https://20001.fullstack.clarusway.com/";

const BlogContextProvider = ({ children }) => {
  const { userInfo } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [page, setPage] = useState(1);
  const [paginationData, setPaginationData] = useState({
    count: 0,
    next: null,
    previous: null,
    totalPages: 0,
  });

  useEffect(() => {
    if (page) {
      getBlogs(page);
    }
  }, [page]);

  const getBlogs = async (page) => {
    let url = `${baseUrl}blog/`;
    if (page) {
      url = `${baseUrl}blog/?page=${page}`;
    }
    try {
      const res = await axios.get(url);
      console.log(res.data);
      setBlogs(res.data.results);
      setPaginationData({
        count: res.data.count,
        next: res.data.next,
        previous: res.data.previous,
        totalPages: Math.ceil(res.data.count / 10),
      });
    } catch (error) {
      console.log(error);
      toastNotify(error.message, 'error');
    }
  };

  const addBlog = async (data, navigate) => {
    try {
      const formdata = new FormData();
      formdata.append('title', data.title);
      formdata.append('content', data.content);
      if (data.image) formdata.append('image', data.image, data.image.name);

      const res = await axios({
        method: 'post',
        url: `${baseUrl}blog/`,
        data: formdata,
        headers: {
          Authorization: `Token ${userInfo.key}`,
        },
      });
      console.log(res.data);
      toastNotify('Blog Added Successfully', 'success');
      navigate('/');
    } catch (error) {
      console.log(error);
      toastNotify(error.message, 'error');
    }
  };

  const updateBlog = async (id, data, navigate) => {
    try {
      const formdata = new FormData();
      formdata.append('title', data.title);
      formdata.append('content', data.content);
      if (data.image) formdata.append('image', data.image, data.image.name);

      const res = await axios({
        method: 'put',
        url: `${baseUrl}blog/${id}/`,
        data: formdata,
        headers: {
          Authorization: `Token ${userInfo.key}`,
        },
      });
      console.log(res.data);
      toastNotify('Blog Updated Successfully', 'success');
      navigate('/');
    } catch (error) {
      console.log(error);
      toastNotify(error.message, 'error');
    }
  };

  const getSingleBlog = async (id) => {
    try {
      const res = await axios.get(`${baseUrl}blog/${id}/`, {
        headers: {
          Authorization: `Token ${userInfo.key}`,
        },
      });
      console.log(res.data);
      setCurrentBlog(res.data);
    } catch (error) {
      console.log(error);
      toastNotify(error.message, 'error');
    }
  };

  const addComment = async (id, data) => {
    try {
      const res = await axios({
        method: 'post',
        url: `${baseUrl}blog/comment/`,
        data: { post: id, content: data },
        headers: {
          Authorization: `Token ${userInfo.key}`,
        },
      });
      console.log(res.data);
      toastNotify('Comment Added Successfully', 'success');
      getSingleBlog(id);
    } catch (error) {
      console.log(error);
      toastNotify(error.message, 'error');
    }
  };

  const addLike = async (slug, id) => {
    try {
      const res = await axios({
        method: 'post',
        url: `${baseUrl}blog/like/${slug}/`,
        headers: {
          Authorization: `Token ${userInfo.key}`,
        },
      });
      console.log(res.data);
      getSingleBlog(id);
    } catch (error) {
      console.log(error);
      toastNotify(error.message, 'error');
    }
  };

  const deleteBlog = async (id, navigate) => {
    try {
      const res = await axios.delete(`${baseUrl}blog/${id}/`, {
        headers: {
          Authorization: `Token ${userInfo.key}`,
        },
      });
      console.log(res.data);
      toastNotify('Post deleted successfully', 'success');
      setCurrentBlog(null);
      navigate('/');
    } catch (error) {
      console.log(error);
      toastNotify(error.message, 'error');
    }
  };

  return (
    <BlogContext.Provider
      value={{
        addBlog,
        blogs,
        getBlogs,
        getSingleBlog,
        currentBlog,
        addComment,
        deleteBlog,
        updateBlog,
        addLike,
        page,
        setPage,
        paginationData,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContextProvider;
