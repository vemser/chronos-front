import * as axios from 'axios'
import '@testing-library/jest-dom'
import { EditarPerfil } from './EditarPerfil'
import { render, screen } from '@testing-library/react'
import { AdminProvider } from '../../context/AdminContext'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../../context/AuthContext'
import { UserProvider } from '../../context/UserContex'

test('Deve encontrar o botão de trocar foto na tela Editar Perfil', () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <AdminProvider>
            <EditarPerfil />
          </AdminProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  )

  expect(screen.getByTestId('botao-trocar-foto')).toBeInTheDocument()
})

test('Deve encontrar o título Editar Perfil por id', () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <AdminProvider>
            <EditarPerfil />
          </AdminProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  )

  expect(screen.getByTestId('titulo-editar-perfil')).toBeInTheDocument()
})
