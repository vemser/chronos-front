import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login/Login'
import { PaginaInicial } from './pages/Pagina Inicial/PaginaInicial'

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/pagina-inicial" element={<PaginaInicial />} />

        <Route />

      </Routes>
    </BrowserRouter>
  )
}
