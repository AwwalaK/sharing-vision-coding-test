import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io"; 

import Pagination from '../components/Pagination';

import './PreviewPost.css';

const Preview = () => {
  const [publishedPosts, setPublishedPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/articles')
      .then((res) => res.json())
      .then((res) => setPublishedPosts(res))
      .catch((error) => console.error('Error fetching data:', error));
  }, [publishedPosts]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = publishedPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='preview-post'>
      <div className='back-button' onClick={()=>navigate('/')}>
        <IoMdArrowBack size={30}/>Back
      </div>
      <h1>Preview</h1>
      {currentPosts.map((post) => (
        <div key={post.id} className='post-card'>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>Category: {post.category}</p>
        </div>
      ))}

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={publishedPosts.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Preview;
