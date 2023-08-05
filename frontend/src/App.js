import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AllPost from './routes/AllPost';
import EditPost from './routes/EditPost';
import CreatePost from './routes/CreatePost';
import PreviewPost from './routes/PreviewPost';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<AllPost />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/preview" element={<PreviewPost />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
      </Router>
    </>          
  );
}

export default App;
