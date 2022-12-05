import { Header } from './Header'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../../context/AuthContext'

describe('<Header/>', () => {
  test('Deve encontrar a logo no header', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </BrowserRouter>
    )

    const botao = screen.getByTestId('id-logo')
    expect(botao).toBeInTheDocument()
  })

  test('Deve encontrar o cadastrar colaborador no header', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </BrowserRouter>
    )

    const botao = screen.getByTestId('id-menu-cadastrar')
    expect(botao).toBeInTheDocument()
  })

  test('Deve encontrar a imagem ou icone do usuário logado', async () => {
    await render(
      <BrowserRouter>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </BrowserRouter>
    )

    const botao = screen.getByTestId('imagem-usuario')
    expect(botao).toBeInTheDocument()
  })
})
