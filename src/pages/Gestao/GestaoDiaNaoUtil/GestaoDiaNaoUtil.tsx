import React from 'react'
import { Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import styles from './GestaoDiaNaoUtil.module.css'
import { Header } from '../../../components/Header/Header';
import { PaginacaoNaoUtil } from '../../../components/Paginacao/PaginacaoNaoUtil/PaginacaoNaoUtil';
import { GestaoDiaNaoUtilTable } from '../../../components/Gestao/GestaoDiaNaoUtilTable/GestaoDiaNaoUtilTable';

export const GestaoDiaNaoUtil = () => {
  return (
    <>
      <Header />

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
        <div className={styles.paginacao}>
          <PaginacaoNaoUtil />
        </div>
      </section>
    </>
  )
}