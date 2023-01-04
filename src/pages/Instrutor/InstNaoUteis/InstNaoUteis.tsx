import { useContext, useLayoutEffect } from 'react'
import {
  TableCell,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  Box,
  TableHead,
  Checkbox,
  Pagination,
  TextField,
  Button
} from '@mui/material'
import { DiaNaoUtilContext } from '../../../context/DiaNaoUtilContext'
import styles from './InstNaoUteis.module.css'
import { Header } from '../../../components/Header/Header'
import { animateScroll as scroll } from 'react-scroll'
import { BuscarDiaNaoUteisContext } from '../../../context/BuscarDiaNaoUteisContext'
import { useForm } from 'react-hook-form'

export const InstNaoUteis = () => {
  const { diasNaoUteis, getDiaNaoUtil, totalPages, currentPage, setCurrentPage } = useContext(DiaNaoUtilContext)
  const { isSearch, setIsSearch, searchPayload, setSearchPayload, buscarDiasNaoUteis } = useContext(BuscarDiaNaoUteisContext)

  useLayoutEffect(() => {
    getDiaNaoUtil('1')
    setCurrentPage(1)
    window.scrollTo(0, 0)
    setIsSearch(false)
  }, [])

  let { register, handleSubmit, reset } = useForm()

  const buscar = (carga: any) => {
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
      <section className={styles.ContainerGeral}>
        <div className={styles.ContainerGestaoEdicoes}>
          <Box className={styles.ContainerNova}>
            <Box sx={{
              width: '100%',
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
          </Box>
          <TableContainer
            sx={{
              boxShadow: 1,
              width: 'auto',
              borderRadius: '5px',
              maxWidth: 1366,
              margin: '50px auto'
            }}
          >
            <Table
              sx={{ minWidth: 650, maxWidth: 1366 }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="justify" width={'20px'}>
                    Código
                  </TableCell>
                  <TableCell align="justify"><strong>Descrição</strong></TableCell>
                  <TableCell align="justify"><strong>Período Inicial</strong></TableCell>
                  <TableCell align="justify"><strong>Período Final</strong></TableCell>
                  <TableCell align="justify"><strong>Repetir</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {diasNaoUteis?.map((dia, index) => {
                  if (dia.repeticaoAnual === 'ATIVO') {
                    var status = true
                  } else {
                    var status = false
                  }
                  const dataIniciaFormatada = dia.dataInicial
                    .split('-')
                    .reverse()
                    .join('/')
                  const dataFinalFormatada = dia.dataFinal
                    ?.split('-')
                    .reverse()
                    .join('/')

                  return (
                    <TableRow
                      key={dia.idDiaNaoUtil}
                      id={`linha-nao-util-${index}`}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        align="justify"
                        width={'300px'}
                      >
                        {dia.idDiaNaoUtil}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        align="justify"
                        width={'300px'}
                      >
                        {dia.descricao}
                      </TableCell>
                      <TableCell align="justify" width={'300px'}>
                        {dataIniciaFormatada}
                      </TableCell>
                      <TableCell align="justify" width={'300px'}>
                        {dataFinalFormatada}
                      </TableCell>
                      <TableCell align="justify" width={'300px'}>
                        <Checkbox checked={status} />
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', mt: '5px', marginBottom: '20px' }}>
          <Pagination page={currentPage} count={totalPages} color="primary" onChange={(_, value) => mudarPaginacao(value)} />
        </Box>
      </section>
    </>
  )
}
