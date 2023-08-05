import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { BiEditAlt, BiTrashAlt } from "react-icons/bi";

import './AllPost.css';

const tabs = [
  {
    name: 'Published',
    value: 'publish'
  },
  {
    name: 'Drafts',
    value: 'draft'
  },
  {
    name: 'Trashed',
    value: 'trash'
  }
];

const AllPosts = () => {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/articles')
      .then((res) => res.json())
      .then((res) => setAllPosts(res))
      .catch((error) => console.error('Error fetching data:', error));
  }, [allPosts]);

  const handleMoveToTrash = async (data) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/articles/${data?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          status: 'trash'
        }),
      });

      if (response.ok) {
        console.log('Article move to trash');
      } else {
        console.error('Error move article to trash');
      }
    } catch (error) {
      console.error('Error updating article:', error);
    }
  }

  const handleDelete =  async (data) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/articles/${data.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Article deleted successfully!');
      } else {
        console.error('Error deleting article:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  }

  return (
    <div className='all-post'>
      <div className='header'>
        <h1>All Posts</h1>
        <div className='header-button-list'>
          <Link to={`/preview`} className='header-button'>Preview Post</Link>
          <Link to={`/create`} className='header-button'>Create New Post</Link>
        </div>
      </div>
      <Tabs>
        <TabList>
          {tabs?.map((item, index) => {
            return (
              <Tab key={index}>{item?.name}</Tab>
            );
          })}
        </TabList>

        {tabs?.map((item, index) => {
          return (
            <TabPanel key={index}>
              <h3>{item?.name} Posts</h3>
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {(allPosts?.filter((x) => x?.status === item?.value)).map((post) => (
                    <tr key={post.id}>
                      <td>{post.title}</td>
                      <td>{post.category}</td>
                      <td>
                        <Link to={`/edit/${post.id}`}><BiEditAlt /> Edit</Link>
                        {item?.value !== 'trash' ? (
                          <Link onClick={()=>handleMoveToTrash(post)}><BiTrashAlt /> Trash</Link>
                        ) : (
                          <Link onClick={()=>handleDelete(post)} className='deleteButton'><BiTrashAlt /> Remove</Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TabPanel>
          );
        })}
      </Tabs>
    </div>
  );
};

export default AllPosts;

