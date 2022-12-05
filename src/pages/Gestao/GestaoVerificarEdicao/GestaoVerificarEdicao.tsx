import React, { useContext, useLayoutEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import styles from './GestaoVerificarEdicao.module.css'
import {
  TableCell,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  Box,
  Button,
  TableHead,
  Switch
} from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import EditIcon from '@mui/icons-material/Edit'
import { UserContext } from '../../../context/UserContex'
import { Header } from '../../../components/Header/Header'
import { CalendarioContext } from '../../../context/CalendarioContext'

export const GestaoVerificarEdicao = () => {
  const { edicao } = useParams()

  const idEdicao = Number(edicao)

  const navigate = useNavigate()
  const { deleteEtapa, getEtapas, deleteProcesso, etapas, edicoes } =
    useContext(UserContext)

  const { getCalendarioPorEdicao } = useContext(CalendarioContext)

  const EdicaoAtual = edicoes?.find(data => data.idEdicao == idEdicao)

  useLayoutEffect(() => {
    getEtapas(idEdicao)
  }, [])

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

          <Button
            variant="contained"
            id="addButton"
            onClick={() =>
              navigate(`/gestao/verificar-edicao/${edicao}/nova-etapa`, {
                state: EdicaoAtual
              })
            }
          >
            {' '}
            + Adicionar nova etapa
          </Button>
        </Box>

        {etapas?.map((etapa: any, index) => {
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

                  <Box
                    sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                  >
                    <EditIcon
                      id={`editar-etapa-${index}`}
                      onClick={() =>
                        navigate(
                          `/gestao/verificar-edicao/${edicao}/editar-etapa/${etapa.idEtapa}`,
                          { state: etapa }
                        )
                      }
                      sx={{
                        cursor: 'pointer',
                        transition: '100ms all ease-in-out',
                        '&:hover': { color: '#1e62fe' }
                      }}
                    />
                    <HighlightOffIcon
                      id={`deletar-etapa-${index}`}
                      onClick={() => {
                        deleteEtapa(etapa.idEtapa, idEdicao)
                      }}
                      sx={{
                        cursor: 'pointer',
                        transition: '100ms all ease-in-out',
                        '&:hover': { color: '#1e62fe' }
                      }}
                    />
                  </Box>
                </Box>

                <Button
                  variant="contained"
                  id={`novo-processo-${index}`}
                  onClick={() =>
                    navigate(
                      `/gestao/verificar-edicao/${edicao}/novo-processo`,
                      { state: etapa }
                    )
                  }
                >
                  {' '}
                  + NOVO PROCESSO
                </Button>
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
                        <TableCell align="right">Editar</TableCell>
                        <TableCell align="right">Excluir</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {etapa.processos?.map(
                        (processo: any, procIndex: number) => {
                          return (
                            <TableRow
                              key={processo.idProcesso}
                              sx={{
                                '&:last-child td, &:last-child th': {
                                  border: 0
                                }
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

                              <TableCell
                                component="th"
                                scope="row"
                                align="center"
                                width={'120px'}
                              >
                                <EditIcon
                                  id={`editar-processo-${procIndex}`}
                                  onClick={() =>
                                    navigate(
                                      `/gestao/verificar-edicao/${idEdicao}/editar-processo/${processo.idProcesso}`,
                                      { state: processo }
                                    )
                                  }
                                  sx={{
                                    cursor: 'pointer',
                                    transition: '100ms all ease-in-out',
                                    '&:hover': { color: '#1e62fe' }
                                  }}
                                />
                              </TableCell>

                              <TableCell align="right" width={'40px'}>
                                <HighlightOffIcon
                                  id={`deletar-processo-${procIndex}`}
                                  onClick={() =>
                                    deleteProcesso(
                                      processo.idProcesso,
                                      idEdicao
                                    )
                                  }
                                  sx={{
                                    cursor: 'pointer',
                                    transition: '100ms all ease-in-out',
                                    '&:hover': { color: '#1e62fe' }
                                  }}
                                />
                              </TableCell>
                            </TableRow>
                          )
                        }
                      )}
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
