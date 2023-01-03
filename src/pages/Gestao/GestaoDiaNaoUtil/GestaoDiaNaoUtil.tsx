import React, { useContext, useLayoutEffect } from 'react'
import { Box, Button, Pagination, TextField } from '@mui/material'
import { Link } from 'react-router-dom'
import styles from './GestaoDiaNaoUtil.module.css'
import { Header } from '../../../components/Header/Header';
import { GestaoDiaNaoUtilTable } from '../../../components/Gestao/GestaoDiaNaoUtilTable/GestaoDiaNaoUtilTable';
import { DiaNaoUtilContext } from '../../../context/DiaNaoUtilContext';
import { animateScroll as scroll } from 'react-scroll'
import { useForm } from 'react-hook-form';
import { BuscarDiaNaoUteisContext } from '../../../context/BuscarDiaNaoUteisContext';

export const GestaoDiaNaoUtil = () => {

  const { totalPages, getDiaNaoUtil, currentPage, setCurrentPage } = useContext(DiaNaoUtilContext)
  const { isSearch, setIsSearch, searchPayload, setSearchPayload, buscarDiasNaoUteis } = useContext(BuscarDiaNaoUteisContext)

  useLayoutEffect(() => {
    setCurrentPage(1)
    window.scrollTo(0, 0)
  }, [])

  let { register, handleSubmit, reset } = useForm()

  const buscar = (carga: any) => {
    // console.log(carga)
    // let carga = {
    //   descricao: diaNaoUtil,
    //   datainicial: dataInicial,
    //   dataFinal: dataFinal
    // }
    setSearchPayload(carga);
    setIsSearch(true);
    buscarDiasNaoUteis(carga, 1);
    setCurrentPage(1);
  }

  let mudarPaginacao = (value: any) => {
    const options = {
      duration: 800,
      smooth: true
    }
    scroll.scrollToTop(options);
    setCurrentPage(value);
    isSearch ? buscarDiasNaoUteis(searchPayload, value) : getDiaNaoUtil(value);
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
            <h2>Períodos Não Úteis</h2>
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
                  label='Descrição'
                  id='descricao'
                  type='text'
                  {...register('descricao')}
                  size={'small'}
                  sx={{
                    "& .MuiInputBase-input": {
                      height: '20px',
                    },
                    width: '100%',
                  }}
                />
              </Box>
              {/* <Box
                sx={{
                  width: '100%',
                  height: '40px'
                }}
              >
                <TextField
                  label='Login'
                  id='login'
                  type='text'
                  // {...register('login')}
                  size={'small'}
                  sx={{
                    "& .MuiInputBase-input": {
                      height: '20px',
                    },
                    width: '100%',
                  }}
                />
              </Box> */}
            </Box>
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
                <Box className={styles.dateContainer} >
                  <p>Data Inicial</p>
                  <TextField id="dataInicial" className={styles.dataPicker} type={'date'} variant="standard"
                    {...register('dataInicial')}
                  // error={!!errors.dataInicial}
                  />
                  {/* {errors.dataInicial && (<span
                      className={styles.ContainerError}
                      id="data-inicial-error"
                    >
                      {errors.dataInicial.message}
                    </span>
                  )} */}
                </Box>
              </Box>
              <Box
                sx={{
                  width: '100%',
                  height: '40px'
                }}
              >
                <Box className={styles.dateContainer} id='dataFinalContainer'>
                  <p>Data Final</p>
                  <TextField id="dataFinal" className={styles.dataPicker} type={'date'} variant="standard"
                    {...register('dataFinal')}
                  // error={!!errors.dataFinal}
                  />
                </Box>
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
                    getDiaNaoUtil('1');
                    reset();
                    // setValue([])
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
          <Link to={'/gestao/cadastrar-dias-nao-uteis'}>
            <Button
              className={styles.addBtn}
              variant="contained"
              id='addButton'
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
              ADICIONAR PERÍODO NÃO ÚTIL
            </Button>
          </Link>
        </Box>
        <Box width={'80%'}>
          <GestaoDiaNaoUtilTable />
          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', mt: '10px' }}>
            <Pagination page={currentPage} count={totalPages} color="primary" onChange={(_, value) => mudarPaginacao(value)} />
          </Box>
        </Box>
      </Box>
    </>
  )
}