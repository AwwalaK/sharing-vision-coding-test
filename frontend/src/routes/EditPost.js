import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { IoMdArrowBack } from "react-icons/io"; 

import './EditPost.css';

const initialData = {
  title: '',
  content: '',
  category: '',
  status: '',
}

const EditArticle = () => {
  const { id } = useParams();
  const [editData, setEditData] = useState(initialData);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticleById = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/articles/${id}`);
        if (!response.ok) {
          throw new Error('Article not found.');
        }
        const jsonData = await response.json();
        setEditData(jsonData);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };
    fetchArticleById();
  }, [id]);

  const handleSubmit = async (e, status) => {
    e.preventDefault()

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/articles/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...editData,
          status: status
        }),
      });

      if (response.ok) {
        console.log('Article created successfully!');
        setEditData(initialData);
        navigate('/');
      } else {
        console.error('Error creating article:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating article:', error);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;

    setEditData({
      ...editData,
      [name]: value
    })
  }

  return (
    <div className='edit-post'>
      <div className='back-button' onClick={()=>navigate('/')}>
        <IoMdArrowBack size={30}/>Back
      </div>
      <h1>Edit Post</h1>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={editData?.title}
          name="title"
          onChange={(e)=>handleInput(e)}
        />
      </div>
      <div>
        <label>Content</label>
        <textarea
          value={editData?.content}
          name="content"
          onChange={(e)=>handleInput(e)}
        />
      </div>
      <div>
        <label>Category</label>
        <input
          type="text"
          value={editData?.category}
          name="category"
          onChange={(e)=>handleInput(e)}
        />
      </div>
      <button onClick={(e)=>handleSubmit(e, "publish")}>Publish</button>
      <button onClick={(e)=>handleSubmit(e, "draft")}>Draft</button>
    </div>
  );
};

export default EditArticle;
