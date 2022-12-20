import React, { useContext, useLayoutEffect } from 'react'
import styles from './AdminColab.module.css'
import { Box } from '@mui/system'
import { PaginacaoColaborador } from '../../../components/Paginacao/PaginacaoColaborador/PaginacaoColaborador'
import { AdminContext } from '../../../context/AdminContext'
import { ButtonCadastrar } from '../../../components/Admin/ButtonCadastrar/ButtonCadastrar'
import { Header } from '../../../components/Header/Header'
import { AdminColaboradoresTable } from '../../../components/Admin/AdminColaboradoresTable/AdminColaboradoresTable'


export const AdminColaboradores = () => {

  const {buscarDadosColaborador} = useContext(AdminContext)
  
  useLayoutEffect(() => {
    buscarDadosColaborador('1')
  }, [])

  return (  
    <>
      <Header/>

        <Box width={'100%'} display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} mt={'50px'}>

        <Box className={styles.ContainerHeader}>
            <div className={styles.ContainerTitulo}>
            <h2>Colaboradores</h2>
            </div>
            <Box className={styles.ContainerButton} sx={{ justifyContent: { xs: 'center', md: 'flex-end' } }}><ButtonCadastrar /></Box>
          </Box>
        <Box width={'80%'}>
          <AdminColaboradoresTable />

          <div>
            <PaginacaoColaborador />
          </div>
        </Box>
      </Box> 
    </>
  )
}