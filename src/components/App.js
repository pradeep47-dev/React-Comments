import React from 'react'
import '../styles/App.css';

import PostForm from './PostForm';
import PostsList from './PostsList'


const App = () => (
  <div>
    <div className="App container">
          <header className="App-header">              
              <h1 className="App-title">React Comments</h1>
              <p className="App-subtitle">React Developer Skills</p>
          </header>
          <div className="PostForm-container">
              <PostForm showCancel={false} level={0}/>
          </div>      
          <div className="PostsList-container">
              <div className="Posts-Area">
                  <PostsList className="postslist"/>
              </div>
          </div>          
      </div>
  </div>
)

export default App
