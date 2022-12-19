import React, { useContext, useLayoutEffect } from 'react'
import { useParams } from 'react-router-dom'

import styles from './InstVerificarEdicao.module.css'
import {
  TableCell,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  Box,
  Button,
  TableHead,
} from '@mui/material'

import { UserContext } from '../../../context/UserContex'
import { Header } from '../../../components/Header/Header'
import { CalendarioContext } from '../../../context/CalendarioContext'
import { IEtapa, IProcesso } from '../../../utils/interfaces'

export const InstVerificarEdicao = () => {
  const { edicao } = useParams()

  const idEdicao = Number(edicao)

  const { getEtapas, etapas, edicoes } = useContext(UserContext)

  const EdicaoAtual = edicoes?.find(data => data.idEdicao == idEdicao)

  useLayoutEffect(() => {
    getEtapas(idEdicao)
  }, [])
  const { getCalendarioPorEdicao } = useContext(CalendarioContext)

  return (
    <>
      <Header />

      <Box
        sx={{
          margin: '50px auto',
          maxWidth: '1200px',
          boxShadow: 2,
          borderRadius: '12px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '20px',
            mb: '60px'
          }}
        >
          <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <h2>{EdicaoAtual?.nome}</h2>
            <Button variant="outlined">
              <p onClick={() => getCalendarioPorEdicao(EdicaoAtual)}>
                Gerar Calendario
              </p>
            </Button>
          </Box>
        </Box>

        {etapas?.map((etapa: IEtapa) => {
          return (
            <Box key={etapa.idEtapa} sx={{ padding: '20px' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: '40px' }}
                >
                  <h3>{etapa.nome}</h3>
                </Box>
              </Box>

              <Box>
                <TableContainer
                  sx={{
                    boxShadow: 1,
                    width: 'auto',
                    mt: 2,
                    borderRadius: '5px'
                  }}
                >
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="justify">Nome</TableCell>
                        <TableCell align="justify">Dias Úteis</TableCell>
                        <TableCell align="justify">Ordem</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {etapa.processos?.map((processo: IProcesso) => {
                        return (
                          <TableRow
                            key={processo.idProcesso}
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 }
                            }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              align="justify"
                            >
                              {processo.nome}
                            </TableCell>

                            <TableCell
                              component="th"
                              scope="row"
                              align="justify"
                            >
                              {processo.diasUteis}
                            </TableCell>

                            <TableCell
                              component="th"
                              scope="row"
                              align="justify"
                            >
                              {processo.ordemExecucao}
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          )
        })}
      </Box>
    </>
  )
}
