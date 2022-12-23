import React, { useContext, useLayoutEffect } from 'react'
import { Box, Button, Pagination } from '@mui/material'
import { Link } from 'react-router-dom'
import styles from './GestaoDiaNaoUtil.module.css'
import { Header } from '../../../components/Header/Header';
import { PaginacaoNaoUtil } from '../../../components/Paginacao/PaginacaoNaoUtil/PaginacaoNaoUtil';
import { GestaoDiaNaoUtilTable } from '../../../components/Gestao/GestaoDiaNaoUtilTable/GestaoDiaNaoUtilTable';
import { DiaNaoUtilContext } from '../../../context/DiaNaoUtilContext';


export const GestaoDiaNaoUtil = () => {

  const { totalPages, getDiaNaoUtil, currentPage, setCurrentPage } = useContext(DiaNaoUtilContext)

  useLayoutEffect(() => {    
    setCurrentPage(1)
    window.scrollTo(0,0)
  }, [])

  let mudarPaginacao = (value: any) => {
    window.scrollTo(0,0)
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
              <Button className={styles.addBtn} variant="contained" id='addButton'> ADICIONAR PERÍODO NÃO ÚTIL</Button>
            </Link>
          </Box>

          <GestaoDiaNaoUtilTable />

        </div>
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', mt: '10px' }}>          
          {/* <PaginacaoNaoUtil /> */}
            <Pagination page={currentPage} count={totalPages} color="primary" onChange={(_, value) => mudarPaginacao(value)} />
        </Box>
  </section>
    </>
  )
}