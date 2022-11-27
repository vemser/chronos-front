import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { AdminHome } from './pages/Admin/AdminHome/AdminHome'
import { GestaoEdicoes } from './pages/Gestao/GestaoEdicoes/GestaoEdicoes'
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

        <Route path='/' element={<Login />} />
        


        <Route path='/admin'>
          <Route index element={<AdminHome />} />

        </Route>

        <Route path='/gestao'>
          <Route index element={<AdminHome />} />
          <Route path='/gestao/edicoes' element={<GestaoEdicoes />} />
        </Route>

        <Route path="/pagina-inicial" element={<PaginaInicial />} />


      </Routes>
    </AuthProvider>
    </BrowserRouter>
  )
}
