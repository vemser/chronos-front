import React from 'react'
import { EditarPerfil } from '../../components/EditarPerfil/EditarPerfil'
import { Header } from '../../components/Header/Header'
import { Row } from '../../components/Row/Row'
import { Box } from '@mui/system'
import { CadastrarColaborador } from '../CadastrarColaborador/CadastrarColaborador'

export const PaginaInicial: React.FC = () => {
  return (
    <>
      <Header />
      {/* <CadastrarColaborador /> */}
      <Box width={'100%'} display={'flex'} justifyContent={'center'}>
        <Box width={'80%'}>
          <Row />
        </Box>
      </Box>
    </>
  )
}
