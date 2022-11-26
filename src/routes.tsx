import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { Login } from './pages/Login/Login'
import { PaginaInicial } from './pages/Pagina Inicial/PaginaInicial'

const ROLES = {
  'Admin': 'Admin',
  'Home': 'ROLE_HOME',
  'Gestao': 'Gestao'
}

export const AppRoutes = () => {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/pagina-inicial" element={<PaginaInicial />} />

      </Routes>
    </AuthProvider>
    </BrowserRouter>
  )
}
