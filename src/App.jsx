import React from 'react';
import './app.css';

import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage'
import ErrorPage from './pages/ErrorPage'
import Header from './components/Header'
import PodcastPage from './pages/PodcastPage';

function App () {

  return(
    <>
      <Header />
      <Routes>
        <Route 
          path="/" 
          element={<MainPage />} 
        />
        <Route
          path='/podcast/:podcastId'
          element={<PodcastPage />}
        />
        <Route
          path='/podcast/:podcastId/episode/:episodeId'
          element={<PodcastPage />}
        />
      </Routes>
    </>
  )
 }

export default App