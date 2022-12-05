import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ButtonCadastrar } from './ButtonCadastrar'

describe('<ButtonCadastrar />', () => {
  test('Deve encontrar o botão na tela', () => {
    render(
      <BrowserRouter>
        <ButtonCadastrar />
      </BrowserRouter>
    )

    const botao = screen.getByTestId('botao-cadastrar')
    expect(botao).toBeInTheDocument()
  })
})
