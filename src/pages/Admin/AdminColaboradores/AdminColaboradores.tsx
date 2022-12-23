import React, { useContext, useLayoutEffect, useState } from 'react'
import styles from './AdminColab.module.css'
import { Box } from '@mui/system'
import { PaginacaoColaborador } from '../../../components/Paginacao/PaginacaoColaborador/PaginacaoColaborador'
import { AdminContext } from '../../../context/AdminContext'
import { ButtonCadastrar } from '../../../components/Admin/ButtonCadastrar/ButtonCadastrar'
import { Header } from '../../../components/Header/Header'
import { AdminColaboradoresTable } from '../../../components/Admin/AdminColaboradoresTable/AdminColaboradoresTable'
import { Autocomplete, Button, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { BuscarContext } from '../../../context/buscaContext'

export const AdminColaboradores = () => {

  const [isSearch, setIsSearch] = useState(false)

  const [cargos] = useState<any>([
    'Aluno', 'Administrador', 'Colaborador', 'Coordenador', 'Gestão de pessoas', 'Instrutor'
  ]);

  const [mudarKeySelect, setMudarKeySelect] = useState(1)
  const [value, setValue] = useState<any>([])

  let buscarCargos = value.map((el: any) =>
    el == 'Aluno' ? 'ROLE_ALUNO' :
      el == 'Administrador' ? 'ROLE_ADMIN' :
        el == 'Colaborador' ? 'ROLE_COLABORADOR' :
          el == 'Coordenador' ? 'ROLE_GESTOR' :
            el == 'Gestão de pessoas' ? 'ROLE_GESTAO_DE_PESSOAS' :
              el == 'Instrutor' ? 'ROLE_INSTRUTOR' : ''
  )

  const { buscarDadosColaborador } = useContext<any>(AdminContext)
  const { buscarColaborador } = useContext(BuscarContext)

  useLayoutEffect(() => {
    buscarDadosColaborador('1')
  }, [])

  const { register, handleSubmit, reset } = useForm<any>({})

  const buscar = (login: any) => {
    buscarColaborador(login, buscarCargos);
  }

  return (
    <>
      <Header />
      <Box width={'100%'} display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} mt={'50px'}>
        <Box sx={{
          width: '80%',
          mb: '30px',
          boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
          backgroundColor: '#fff',
          borderRadius: '8px',
          p: '20px 40px'
        }}>
          <Box sx={{
            mb: '20px',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <h2>Colaboradores</h2>
          </Box>
          <Box
            component={'form'}
            onSubmit={handleSubmit(buscar)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              justifyContent: 'flex-start',
            }}
          >
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '50px',
                justifyContent: 'flex-start'
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '40px'
                }}
              >
                <TextField
                  label='Login'
                  id='login'
                  type='text'
                  {...register('login')}
                  size={'small'}
                  sx={{
                    "& .MuiInputBase-input": {
                      height: '20px',
                    },
                    width: '100%',
                  }}
                />
              </Box>
              <Box
                sx={{
                  width: '100%',
                  height: '40px'
                }}
              >
                <Autocomplete
                  multiple
                  id="size-small-standard"
                  size="small"
                  key={mudarKeySelect}
                  onChange={(_: any, newValue: any) => setValue(newValue)}
                  options={cargos}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Cargos"
                      placeholder="Cargos"
                    />
                  )}
                />
              </Box>
              <Box
                sx={{
                  m: '15px 0',
                  display: 'flex',
                  justifyContent: 'flex-start',
                  width: '50%',
                  gap: '20px'
                }}
              >
                <Button type={'submit'} variant={'contained'}>Filtrar</Button>
                <Button
                  variant={'contained'}
                  onClick={() => {
                    buscarDadosColaborador('1');
                    reset();
                    setMudarKeySelect(mudarKeySelect + 1);
                    setValue([])
                  }}>Limpar</Button>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ justifyContent: { xs: 'center', md: 'flex-end' } }} className={styles.ContainerButton}><ButtonCadastrar /></Box>
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