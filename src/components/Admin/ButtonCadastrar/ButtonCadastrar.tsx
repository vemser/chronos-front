import React from 'react'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'

export const ButtonCadastrar = () => {
  return (
    <>
      <Link to={'/admin/cadastrar'}>
        <Button data-testid="botao-cadastrar" variant="contained">
          CADASTRAR COLABORADOR
        </Button>
      </Link>
    </>
  )
}
