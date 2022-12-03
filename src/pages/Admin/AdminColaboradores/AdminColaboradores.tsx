import React, { useContext, useLayoutEffect } from 'react'
import styles from './AdminColab.module.css'
import { Box } from '@mui/system'
import { AdminHeader } from '../../../components/Admin/AdminHeader/AdminHeader'
import { AdminListar } from '../AdminListar/AdminListar'
import { PaginacaoColaborador } from '../../../components/Paginacao/PaginacaoColaborador/PaginacaoColaborador'
import { AdminContext } from '../../../context/AdminContext'
import { UserContext } from '../../../context/UserContex'
import { ButtonCadastrar } from '../../../components/Admin/ButtonCadastrar/ButtonCadastrar'

export const AdminColaboradores = () => {

  const {dadosColaborador, buscarDadosColaborador} = useContext(AdminContext)
  useLayoutEffect(() => {
    buscarDadosColaborador('1')
  }, [])

  return (
    <>
      <AdminHeader />

       <Box width={'100%'} display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} mt={'50px'}>
       
        <Box className={styles.ContainerHeader}>
            <div className={styles.ContainerTitulo}>
            <h2 >Colaboradores</h2>
            </div>
            <div className={styles.ContainerButton}><ButtonCadastrar /></div>
          </Box>
        <Box width={'80%'}>
          <AdminListar />
          <div>
            <PaginacaoColaborador />
          </div>
        </Box>
      </Box> 
    </>
  )
}
