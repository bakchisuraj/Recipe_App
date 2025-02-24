import React from 'react'
import './App.css'
import Home from './Components/Home'
import { Route, Routes } from 'react-router'
import Login from './Components/Login'
import Signin from './Components/Signin'
import RecipeDetails from './Components/RecipeDetails'
import LandingPage from './Components/LandingPage'

function App() {
 

  return (
    <>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/recipe/:id" element={<RecipeDetails/>}/>
    </Routes>
    
      
    </>
  )
}

export default App
