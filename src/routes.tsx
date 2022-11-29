import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AdminProvider } from './context/AdminContext'
import { AuthProvider } from './context/AuthContext'
import { AdminCadastrar } from './pages/Admin/AdminCadastrar/AdminCadastrar'
import { AdminEditarColab } from './pages/Admin/AdminEditarColab/AdminEditarColab'
import { AdminHome } from './pages/Admin/AdminHome/AdminHome'
import { AdminListar } from './pages/Admin/AdminListar/AdminListar'
import { AdminPerfil } from './pages/Admin/AdminPerfil/AdminPerfil'
import { GestaoCadastrarDiaNaoUtil } from './pages/Gestao/GestaoCadastrarDiaNaoUtil/GestaoCadastrarDiaNaoUtil'
import { GestaoCadastrarEdicao } from './pages/Gestao/GestaoCadastrarEdicao/GestaoCadastrarEdicao'
import { GestaoDiaNaoUtil } from './pages/Gestao/GestaoDiaNaoUtil/GestaoDiaNaoUtil'
import { GestaoEdicoes } from './pages/Gestao/GestaoEdicoes/GestaoEdicoes'
import { GestaoHome } from './pages/Gestao/GestaoHome/GestaoHome'
import { GestaoNovaEtapa } from './pages/Gestao/GestaoNovaEtapa/GestaoNovaEtapa'
import { GestaoNovoProcesso } from './pages/Gestao/GestaoNovoProcesso/GestaoNovoProcesso'
import { GestaoPerfil } from './pages/Gestao/GestaoPerfil/GestaoPerfil'
import { GestaoVerificarEdicao } from './pages/Gestao/GestaoVerificarEdicao/GestaoVerificarEdicao'
import { Login } from './pages/Login/Login'
import { NotFind } from './pages/NotFind/NotFind'
import { PaginaInicial } from './pages/Pagina Inicial/PaginaInicial'
import { PrivateRoute } from './pages/PrivateRoute/PrivateRoute'

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AdminProvider>
          <Routes>
            <Route path="/" element={<Login />} />

            <Route path="*" element={<NotFind />} />

          <Route path='/admin' element={<PrivateRoute roleRequired='ROLE_ADMIN'/>}>
            <Route index element={<AdminHome />} />
            <Route path ='/admin/perfil' element={<AdminPerfil />} />
            <Route path="/admin/listar" element={<AdminListar />} />
            <Route path="/admin/cadastrar" element={<AdminCadastrar />} />
            <Route path="/admin/editar-colaborador/:colaborador" element={<AdminEditarColab />} />
          </Route>

          <Route path='/gestao' element={<PrivateRoute roleRequired='ROLE_GESTAO_DE_PESSOAS'/>}>
            <Route index element={<GestaoHome />} />
            <Route path='/gestao/perfil' element={<GestaoPerfil />} />
            <Route path='/gestao/dias-nao-uteis' element={<GestaoDiaNaoUtil />} />
            <Route path='/gestao/cadastrar-dias-nao-uteis' element={<GestaoCadastrarDiaNaoUtil />} />
            <Route path='/gestao/edicoes' element={<GestaoEdicoes />} />
            <Route path='/gestao/cadastrar-edicao' element={<GestaoCadastrarEdicao />} />
            <Route path='/gestao/verificar-edicao/:edicao' element={<GestaoVerificarEdicao />}/>
            <Route path='/gestao/verificar-edicao/:edicao/nova-etapa' element={<GestaoNovaEtapa />} />
            <Route path='/gestao/verificar-edicao/:edicao/novo-processo'element={<GestaoNovoProcesso />} />
          </Route>

          <Route path='/instrutor' element={<PrivateRoute roleRequired='ROLE_INSTRUTOR'/>}>
            
          </Route>
        </Routes>
        </AdminProvider>
        </AuthProvider>
    </BrowserRouter>
  )
}
