import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login/Login'
import { SignUp } from './pages/SignUp/SignUp'

export const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/sign-up' element={<SignUp />}/>
        </Routes>
    </BrowserRouter>
  )
}
