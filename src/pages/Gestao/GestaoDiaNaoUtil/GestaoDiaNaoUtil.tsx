import React, { useContext, useLayoutEffect } from 'react'
import { Box, Button, Pagination } from '@mui/material'
import { Link } from 'react-router-dom'
import styles from './GestaoDiaNaoUtil.module.css'
import { Header } from '../../../components/Header/Header';
import { GestaoDiaNaoUtilTable } from '../../../components/Gestao/GestaoDiaNaoUtilTable/GestaoDiaNaoUtilTable';
import { DiaNaoUtilContext } from '../../../context/DiaNaoUtilContext';
import {  animateScroll as scroll } from 'react-scroll'


export const GestaoDiaNaoUtil = () => {

  const { totalPages, getDiaNaoUtil, currentPage, setCurrentPage } = useContext(DiaNaoUtilContext)

  useLayoutEffect(() => {    
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
      <Header/>

      <section className={styles.ContainerGeral}>
        <div className={styles.ContainerGestaoEdicoes}>

          
          <Box className={styles.ContainerNova}>
            <div className={styles.ContainerTitle}>
              <h2>Períodos Não Úteis </h2>
            </div>

            <Link to={'/gestao/cadastrar-dias-nao-uteis'}>
              <Button 
              className={styles.addBtn} 
              variant="contained" 
              id='addButton'
              sx={{
                boxShadow: '-2px 4px 10px -4px rgba(0,0,0,0.75)',
                transition: '0.5s',
                "&:hover":{
                  transform: 'scale(1.02)'
                },
                "&:active":{
                  transform: 'scale(0.98)'
                }
              }}
              > 
                ADICIONAR PERÍODO NÃO ÚTIL
              </Button>
            </Link>
          </Box>

          <GestaoDiaNaoUtilTable />

        </div>
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', mt: '10px' }}>          
            <Pagination page={currentPage} count={totalPages} color="primary" onChange={(_, value) => mudarPaginacao(value)} />
        </Box>
  </section>
    </>
  )
}