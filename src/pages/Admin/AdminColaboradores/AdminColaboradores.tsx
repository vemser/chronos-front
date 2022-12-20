import React, { useContext, useLayoutEffect } from 'react'
import styles from './AdminColab.module.css'
import { Box } from '@mui/system'
import { PaginacaoColaborador } from '../../../components/Paginacao/PaginacaoColaborador/PaginacaoColaborador'
import { AdminContext } from '../../../context/AdminContext'
import { ButtonCadastrar } from '../../../components/Admin/ButtonCadastrar/ButtonCadastrar'
import { Header } from '../../../components/Header/Header'
import { AdminColaboradoresTable } from '../../../components/Admin/AdminColaboradoresTable/AdminColaboradoresTable'
import { Button, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'


export const AdminColaboradores = () => {

  const { buscarDadosColaborador } = useContext(AdminContext)

  useLayoutEffect(() => {
    buscarDadosColaborador('1')
  }, [])

  const {register, handleSubmit} = useForm<any>({})

const procurar = (data: any) =>{
  console.log(data)
}
  return (
    <>
      <Header />
      <Box width={'100%'} display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} mt={'50px'}>
        <Box className={styles.ContainerHeader}>
          <div className={styles.ContainerTitulo}>
            <h2>Colaboradores</h2>
          </div>
        </Box>
        <Box sx={{
          width: '80%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'blue'
        }}>
          <Box>
            <Box
            component={'form'}
            onSubmit={handleSubmit(procurar)}
            sx={{
              display:'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'red'
            }}
            >
              <TextField 
              label= 'Buscar'
              id= 'procurar'
              type='text'
              {...register('procurar')}
              sx={{
                "& .MuiInputBase-input": {
                  height: '10px'
                }
              }}
              />
              <Button type={'submit'} variant={'contained'}>Buscar</Button>
            </Box>
          </Box>
          <Box sx={{ justifyContent: { xs: 'center', md: 'flex-end' }, background: 'green' }}><ButtonCadastrar /></Box>
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