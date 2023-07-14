import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BulletinBoard from './containers/BulletinBoard'
import './App.css';
import { PostData } from './types'
import PostPage from './containers/PostPage';
import './styles/index.css'

const App: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([])

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<BulletinBoard posts={posts} setPosts={setPosts} />} />
          <Route path="/post/:postId" element={<PostPage posts={posts} setPosts={setPosts} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
