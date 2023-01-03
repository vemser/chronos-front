import React, { useContext, useLayoutEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import EditIcon from '@mui/icons-material/Edit'
import { UserContext } from '../../../context/UserContex'
import { Header } from '../../../components/Header/Header'
import { CalendarioContext } from '../../../context/CalendarioContext'
import { IEtapa, IProcesso } from '../../../utils/interfaces'
import { TOptionsConfirmDialog } from '../../../utils/interfaces'
import { ConfirmDialog } from '../../../components/ConfirmDialog'
import { Loader } from '../../../components/Loader/Loader'

export const GestaoVerificarEdicao = () => {
  const { edicao } = useParams()

  const idEdicao = Number(edicao)

  const navigate = useNavigate()
  const { getEdicoesList, deleteEtapa, getEtapas, deleteProcesso, etapas, edicoes } =
    useContext(UserContext)

  const { getCalendarioPorEdicao } = useContext(CalendarioContext)

  const EdicaoAtual = edicoes?.find(data => data.idEdicao == idEdicao)

  useLayoutEffect(() => {
    getEdicoesList('1')
    getEtapas(idEdicao)
  }, [])

  const [confirmDialog, setConfirmDialog] = React.useState<TOptionsConfirmDialog>({
    isOpen: false,
    title: "",
    onConfirm: () => { }
  });

  return (
    <>
      <Header />
      {etapas && etapas.length == 0 ? <Loader /> : 
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
              <Button variant="outlined"
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
              sx={{
                boxShadow: '-2px 7px 15px -4px rgba(0,0,0,0.75)',
                transition: '0.3s',
                "&:hover":{
                  boxShadow: '-2px 7px 15px -4px rgba(0,0,0,0.75)',
                  transform: 'scale(1.02)'
                },
                "&:active":{
                  transform: 'scale(0.98)'
                }
              }}
            >
              {' '}
              + Adicionar nova etapa
            </Button>
          </Box>

          {etapas?.map((etapa: IEtapa, index) => {
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
                        onClick={(event) => {
                          setConfirmDialog({
                            isOpen: true,
                            title: `Confirma a exclusão da etapa ${etapa.nome}?`,
                            onConfirm: () => {
                              setConfirmDialog({
                                ...confirmDialog,
                                isOpen: false
                              })
                              deleteEtapa(etapa.idEtapa, idEdicao)
                            }
                          });
                        }} sx={{
                          cursor: 'pointer',
                          width: '25px',
                          height: '25px',
                          "&:hover": { color: 'red', transform: 'scale(1.05)' },
                          "& :active": {
                            transform: 'scale(.99)',
                          }
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
                    sx={{
                      boxShadow: '-2px 7px 15px -4px rgba(0,0,0,0.75)',
                      transition: '0.3s',
                      "&:hover":{
                        boxShadow: '-2px 7px 15px -4px rgba(0,0,0,0.75)',
                        transform: 'scale(1.02)'
                      },
                      "&:active":{
                        transform: 'scale(0.98)'
                      }
                    }}
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
                          <TableCell align="justify"><strong>Nome</strong></TableCell>
                          <TableCell align="justify"><strong>Dias Úteis</strong></TableCell>
                          <TableCell align="justify"><strong>Ordem</strong></TableCell>
                          <TableCell align="right"><strong>Editar</strong></TableCell>
                          <TableCell align="right"><strong>Excluir</strong></TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {etapa.processos?.map(
                          (processo: IProcesso, procIndex: number) => {
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
                                    onClick={(event) => {
                                      setConfirmDialog({
                                        isOpen: true,
                                        title: `Confirma a exclusão do processo ${processo.nome}?`,
                                        onConfirm: () => {
                                          setConfirmDialog({
                                            ...confirmDialog,
                                            isOpen: false
                                          })
                                          deleteProcesso(processo.idProcesso, idEdicao)
                                        }
                                      });
                                    }} sx={{
                                      cursor: 'pointer',
                                      width: '25px',
                                      height: '25px',
                                      "&:hover": { color: 'red', transform: 'scale(1.05)' },
                                      "& :active": {
                                        transform: 'scale(.99)',
                                      }
                                    }} 
                                  />
                                </TableCell>
                              </TableRow>
                            )
                          }
                        )}
                      </TableBody>
                    </Table>
                    <ConfirmDialog
                      confirmDialog={confirmDialog}
                      setConfirmDialog={setConfirmDialog}
                    />
                  </TableContainer>
                </Box>
              </Box>
            )
          })}
        </Box>
      }
    </>
  )
}
