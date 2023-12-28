import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignOut from './pages/SignOut'
import Profile from './pages/Profile'
import About from './pages/About'
import Header from './components/header'
const App = () => {
  return (
    <>
    <Header />
      <Routes>
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-out' element={<SignOut />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  )
}

export default App