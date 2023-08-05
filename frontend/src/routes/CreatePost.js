import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IoMdArrowBack } from "react-icons/io"; 

const initialData = {
  title: '',
  content: '',
  category: '',
  status: '',
}

const AddNew = () => {
  const [createData, setCreateData] = useState(initialData);

  const navigate = useNavigate();

  const handleSubmit = async (e, status) => {
    e.preventDefault()

    try {
      const response = await fetch('http://127.0.0.1:8000/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...createData,
          status: status
        }),
      });

      if (response.ok) {
        console.log('Article created successfully!');
        setCreateData(initialData);
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

    setCreateData({
      ...createData,
      [name]: value
    })
  }

  return (
    <div className='edit-post'>
      <div className='back-button' onClick={()=>navigate('/')}>
        <IoMdArrowBack size={30}/>Back
      </div>
      <h2>Add New Article</h2>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={createData?.title}
          name="title"
          onChange={(e)=>handleInput(e)}
          required
        />
      </div>
      <div>
        <label>Content</label>
        <textarea
          value={createData?.content}
          name="content"
          onChange={(e)=>handleInput(e)}
          required
        />
      </div>
      <div>
        <label>Category</label>
        <input
          type="text"
          value={createData?.category}
          name="category"
          onChange={(e)=>handleInput(e)}
          required
        />
      </div>
      <button onClick={(e)=>handleSubmit(e, "publish")}>Publish</button>
      <button onClick={(e)=>handleSubmit(e, "draft")}>Draft</button>
    </div>
  );
};

export default AddNew;
