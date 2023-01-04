import React, { useContext, useLayoutEffect } from 'react'
import { TableCell, TableContainer, Table, TableBody, TableRow, Box, TableHead, Switch, Pagination} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import styles from './InstEdicoes.module.css'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../../context/UserContex'
import { Header } from '../../../components/Header/Header';
import {  animateScroll as scroll } from 'react-scroll'

export const InstEdicoes: React.FC = () => {

  const { edicoes, getEdicoesList, totalPages, currentPage, setCurrentPage } = useContext(UserContext);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    getEdicoesList('1')
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
    getEdicoesList(value.toString());
  }

  return (
    <>
      <Header/>

      <section className={styles.ContainerGeral}>
        <div className={styles.ContainerGestaoEdicoes}>

          <Box className={styles.ContainerNova}>
            <div className={styles.ContainerTitle}>
              <h2>Edições do Vem Ser</h2>
            </div>
          </Box>

          <TableContainer sx={{ boxShadow: 1, width: 'auto', mt: 2, borderRadius: '5px' }}>
            <Table sx={{ minWidth: 650,  }} aria-label="simple table">
              <TableHead>
                <TableRow >
                <TableCell align="justify"><strong>Edições</strong></TableCell>
                  <TableCell align="center"><strong>Detalhes</strong></TableCell>
                  <TableCell align="right"><strong>Ativo</strong></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {edicoes?.map((edicao, index) => {

                  if(edicao.status === 'ATIVO') {
                      var status = true
                  } else {
                    var status = false
                  }

                  return(
                  <TableRow
                    key={edicao.idEdicao}
                    className={`linha-edicao-${index}`}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                  >
                    <TableCell component="th" scope="row" align="justify">
                      {edicao.nome}
                    </TableCell>

                    <TableCell component="th" scope="row" align="center" width={'120px'}>
                      <SearchIcon  className={`edicao-verificar-${index}`} onClick={() => {navigate(`/instrutor/verificar-edicao/${edicao.idEdicao}`, { state: edicao })}} sx={{cursor: 'pointer', transition:'100ms all ease-in-out', '&:hover':{color: '#1e62fe'}}}/>
                    </TableCell>
 
                    <TableCell align="right" width={'40px'}>
                      <Switch  className={`edicao-status-${index}`} checked={status} />
                    </TableCell>

                  </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', mt: '10px' }}>
          <Pagination color="primary"  page={currentPage} count={totalPages}  onChange={(_, value) => mudarPaginacao(value)}/>
        </Box>
      </section>
    </>
  )
}
