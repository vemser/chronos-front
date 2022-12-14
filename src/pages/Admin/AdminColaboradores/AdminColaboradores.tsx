import { useContext, useLayoutEffect, useState } from 'react'
import styles from './AdminColab.module.css'
import { Box } from '@mui/system'
import { AdminContext } from '../../../context/AdminContext'
import { ButtonCadastrar } from '../../../components/Admin/ButtonCadastrar/ButtonCadastrar'
import { Header } from '../../../components/Header/Header'
import { AdminColaboradoresTable } from '../../../components/Admin/AdminColaboradoresTable/AdminColaboradoresTable'
import { Autocomplete, Button, Pagination, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { BuscarContext } from '../../../context/buscaContext'
import { IAdminContext } from '../../../utils/interfaces'
import { animateScroll as scroll } from 'react-scroll'

export const AdminColaboradores = () => {

  const { buscarDadosColaborador, totalPages, currentPage, setCurrentPage } = useContext<IAdminContext>(AdminContext)
  const { buscarColaborador, isSearch, setIsSearch, searchPayload, setSearchPayload } = useContext(BuscarContext)

  const [mudarKeySelect, setMudarKeySelect] = useState(1)
  const [value, setValue] = useState<any>([])
  const [cargos] = useState<any>([
    'Aluno', 'Administrador', 'Colaborador', 'Coordenador', 'Gestão de pessoas', 'Instrutor'
  ]);

  let buscarCargos = value.map((el: any) => {
      let test: any = {
        'Aluno': 'ROLE_ALUNO',
        'Administrador': 'ROLE_ADMIN',
        'Colaborador': 'ROLE_COLABORADOR',
        'Coordenador': 'ROLE_GESTOR',
        'Gestão de pessoas': 'ROLE_GESTAO_DE_PESSOAS',
        'Instrutor': 'ROLE_INSTRUTOR',
      }
      return test[el]
    }
  )

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    buscarDadosColaborador('1')
    setCurrentPage(1)
    setIsSearch(false)
  }, [])

  const { register, handleSubmit, reset } = useForm<any>({})

  const buscar = (login: any) => {
    console.log(buscarCargos)
    let carga = {
      login: login,
      buscarCargos: buscarCargos
    }
    setSearchPayload(carga)
    setIsSearch(true)
    buscarColaborador(login, buscarCargos, 1);
    setCurrentPage(1);
  }

  let mudarPaginacao = (value: any) => {
    const options = {
      duration: 800,
      smooth: true
    }
    scroll.scrollToTop(options)
    setCurrentPage(value);
    isSearch ? buscarColaborador(searchPayload.login, searchPayload.buscarCargos, value) : buscarDadosColaborador(value);
  }

  return (
    <>
      <Header />
      <Box width={'100%'} display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} mt={'50px'} mb={"50px"}>
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
              flexDirection: 'column'
            }}
          >
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '50px',
                justifyContent: 'flex-start',
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
            </Box>
            <Box
              sx={{
                width: '100%'
              }}
            >
              <Box
                sx={{
                  m: '10px 0',
                  display: 'flex',
                  justifyContent: 'flex-start',
                  width: '50%',
                  gap: '20px'
                }}
              >
                <Button
                  type={'submit'}
                  variant={'contained'}
                  sx={{
                    boxShadow: '-2px 4px 10px -4px rgba(0,0,0,0.75)',
                    transition: '0.5s',
                    "&:hover": {
                      transform: 'scale(1.02)'
                    },
                    "&:active": {
                      transform: 'scale(0.98)'
                    }
                  }}
                >
                  Filtrar
                </Button>
                <Button
                  variant={'contained'}
                  onClick={() => {
                    buscarDadosColaborador('1');
                    reset();
                    setMudarKeySelect(mudarKeySelect + 1);
                    setValue([])
                    setIsSearch(false)
                    setCurrentPage(1);
                  }}
                  sx={{
                    boxShadow: '-2px 4px 10px -4px rgba(0,0,0,0.75)',
                    transition: '0.5s',
                    "&:hover": {
                      transform: 'scale(1.02)'
                    },
                    "&:active": {
                      transform: 'scale(0.98)'
                    }
                  }}
                >
                  Limpar
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ justifyContent: { xs: 'center', md: 'flex-end' } }} className={styles.ContainerButton}>
          <ButtonCadastrar />
        </Box>
        <Box width={'80%'}>
          <AdminColaboradoresTable />
          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', mt: '10px' }}>
            <Pagination page={currentPage} count={totalPages} color="primary" onChange={(_, value) => mudarPaginacao(value)} />
          </Box>
        </Box>
      </Box>
    </>
  )
}