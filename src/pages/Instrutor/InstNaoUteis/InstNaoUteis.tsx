import React, { useContext, useLayoutEffect } from 'react'
import {
  TableCell,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  Box,
  TableHead,
  Checkbox,
  Pagination
} from '@mui/material'
import { DiaNaoUtilContext } from '../../../context/DiaNaoUtilContext'
import styles from './InstNaoUteis.module.css'
import { Header } from '../../../components/Header/Header'
import {  animateScroll as scroll } from 'react-scroll'

export const InstNaoUteis = () => {
  const { diasNaoUteis, getDiaNaoUtil, totalPages, currentPage, setCurrentPage } = useContext(DiaNaoUtilContext)

  useLayoutEffect(() => {
    getDiaNaoUtil('1')
    setCurrentPage(1)
    window.scrollTo(0,0)
  }, [])

  let mudarPaginacao = (value: any) => {
    const options = {
      duration: 800,
      smooth: true
    }
    scroll.scrollToTop(options)
    setCurrentPage(value);
    getDiaNaoUtil(value)
  }

  return (
    <>
      <Header />

      <section className={styles.ContainerGeral}>
        <div className={styles.ContainerGestaoEdicoes}>
          <Box className={styles.ContainerNova}>
            <div className={styles.ContainerTitle}>
              <h2>Períodos Não Úteis</h2>
            </div>
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
                  <TableCell align="justify">Descrição</TableCell>
                  <TableCell align="justify">Período Inicial</TableCell>
                  <TableCell align="justify">Período Final</TableCell>
                  <TableCell align="justify">Repetir</TableCell>
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
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', mt: '10px' }}>          
            <Pagination page={currentPage} count={totalPages} color="primary" onChange={(_, value) => mudarPaginacao(value)} />
        </Box>
      </section>
    </>
  )
}
