import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { HeaderButton } from './HeaderButton'

test('deve achar o botão no header', () => {
  render(
    <BrowserRouter>
      <HeaderButton />
    </BrowserRouter>
  )
  expect(screen.getByTestId('botao-header')).toBeInTheDocument()
})