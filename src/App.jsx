import React from 'react';
import './app.css';
import { Route, Routes, useLocation } from 'react-router-dom'
import MainPage from './pages/MainPage'
import DetailPage from './pages/DetailPage'
import EpisodeDetailPage from './pages/EpisodeDetailPage'
import ErrorPage from './pages/ErrorPage'
import Header from './components/Header'
import { useState } from 'react';


function App () {
  const [isLoading, setIsLoading] = useState(false)
  const location = useLocation()

  // Another option could be to have loading as a global state
  const handlePageLoading = (isLoading) => {
    setIsLoading(isLoading)
  }

  return(
    <>
      <Header isLoading={isLoading}/>
      <Routes location={location}>
        <Route 
          path="/" 
          element={<MainPage isLoading={isLoading} handlePageLoading={handlePageLoading}/>} 
        />
        <Route 
          path="/podcast/:podcastId" 
          element={<DetailPage isLoading={isLoading} handlePageLoading={handlePageLoading}/>}
        />
        <Route 
          path="/podcast/:podcastId/episode/:episodeId" 
          element={<EpisodeDetailPage isLoading={isLoading} handlePageLoading={handlePageLoading}/>}
        />
        <Route 
          path="*" 
          element={<ErrorPage />}
        />
      </Routes>
    </>
  )
 }

export default App