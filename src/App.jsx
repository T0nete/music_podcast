import React from 'react';
import './app.css';

import { Route, Routes, useLocation } from 'react-router-dom'
import MainPage from './pages/MainPage'
import DetailPage from './pages/DetailPage'
import EpisodeDetailPage from './pages/EpisodeDetailPage'
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
          children={
            <Route
              path='/podcast/:podcastId/episode/:episodeId'
              element={<EpisodeDetailPage />}
            />
          }
        />
        
        {/* DetailPage and EpisodeDetail could be in one component wiht conditional rendering as they share component */}
        {/* <Route 
          path="/podcast/:podcastId" 
          element={<DetailPage />}
        /> */}
        {/* <Route 
          path="/podcast/:podcastId/episode/:episodeId" 
          element={<EpisodeDetailPage />}
        /> */}
        {/* <Route 
          path="*" 
          element={<ErrorPage />}
        /> */}
      </Routes>
    </>
  )
 }

export default App