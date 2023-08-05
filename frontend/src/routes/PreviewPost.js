import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io"; 

import './PreviewPost.css';

const Preview = () => {
  const [publishedPosts, setPublishedPosts] = useState([]);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const responseAwal = await fetch(`http://127.0.0.1:8000/api/articles`);
        const response = await fetch(`http://127.0.0.1:8000/api/articles/${limit}/${offset}`);
        if (!response.ok) {
          throw new Error('Failed to fetch articles.');
        }

        const data = await response.json();
        const dataAwal = await responseAwal.json();
        setPublishedPosts(data);
        setTotalPages(dataAwal.length);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, [limit, offset]);

  const handleNextPage = () => {
    if (limit + 1 < totalPages) {
      setOffset(offset+limit);
    }
  };

  const handlePreviousPage = () => {
    if (limit - 1 >= 0) {
      setOffset(offset-limit);
    }
  };
  
  return (
    <div className='preview-post'>
      <div className='back-button' onClick={()=>navigate('/')}>
        <IoMdArrowBack size={30}/>Back
      </div>
      <h1>Preview</h1>
      {(publishedPosts?.filter((x) => x?.status === 'publish'))?.map((post) => (
        <div key={post.id} className='post-card'>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>Category: {post.category}</p>
        </div>
      ))}
      
      <button onClick={handlePreviousPage}>Previous Page</button>
      <button onClick={handleNextPage}>Next Page</button>
    
    </div>
  );
};

export default Preview;
