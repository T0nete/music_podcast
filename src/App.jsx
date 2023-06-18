import React from 'react';
import './app.css';
import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage'
import DetailPage from './pages/DetailPage'
import EpisodeDetailPage from './pages/EpisodeDetailPage'
import ErrorPage from './pages/ErrorPage'

function App () {
  return(
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/podcast/:podcastId" element={<DetailPage />}/>
      <Route path="/podcast/:podcastId/episode/:episodeId" element={<EpisodeDetailPage />}/>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
 }

export default App