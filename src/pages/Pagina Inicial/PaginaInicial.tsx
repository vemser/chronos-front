import React from 'react'
import { EditarPerfil } from '../../components/EditarPerfil/EditarPerfil'
import { Header } from '../../components/Header/Header'
import { Row } from '../../components/Row/Row'
import { Box } from '@mui/system'
import { GestaoCadastrarEdicao } from '../Gestao/GestaoCadastrarEdicao/GestaoCadastrarEdicao'

export const PaginaInicial: React.FC = () => {
  return (
    <>
      <Header />
      <GestaoCadastrarEdicao />
      {/* <CadastrarColaborador />
      <Box width={'100%'} display={'flex'} justifyContent={'center'}>
        <Box width={'80%'}>
          <Row />
        </Box>
      </Box> */}
    </>
  )
}
