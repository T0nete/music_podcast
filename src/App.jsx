import React from 'react';
import './app.css';
import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage'
import ErrorPage from './pages/ErrorPage'
import DetailPage from './pages/DetailPage'

function App () {
  return(
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/podcast/:podcastId" element={<DetailPage />}/>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
 }

export default App