import React from 'react'
import { EditarPerfil } from '../../components/EditarPerfil/EditarPerfil'
import { Header } from '../../components/Header/Header'
import { Row } from '../../components/Row/Row'
import { Box } from '@mui/system'

export const PaginaInicial: React.FC = () => {
  return (
    <>
      <Header />
      <Box width={'100%'} display={'flex'} justifyContent={'center'}>
        <Box width={'80%'}>
          <Row />
        </Box>
      </Box>
    </>
  )
}
