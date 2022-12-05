import React, { useContext } from 'react'
import styles from './GestaoEditarDiaNaoUtil.module.css'
import TextField from '@mui/material/TextField'
import { Box, Button, Checkbox, FormControlLabel } from '@mui/material'
import { useForm } from 'react-hook-form'
import 'dayjs/locale/pt-br'
import { Link, useLocation } from 'react-router-dom'
import { IDiaNaoUtil } from '../../../utils/interfaces'
import { DiaNaoUtilContext } from '../../../context/DiaNaoUtilContext'
import { yupResolver } from '@hookform/resolvers/yup'
import { cadastrarDiaNaoUtilFormSchema } from '../../../utils/schemas'
import { Header } from '../../../components/Header/Header'

export const GestaoEditarDiaNaoUtil = () => {
  const { putDiaNaoUtil } = useContext(DiaNaoUtilContext)

  const { state } = useLocation()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IDiaNaoUtil>({
    resolver: yupResolver(cadastrarDiaNaoUtilFormSchema)
  })

  if (state.repeticaoAnual === 'ATIVO') {
    var status = true
  } else {
    var status = false
  }

  return (
    <>
      <Header />
      <section className={styles.ContainerSection}>
        <div className={styles.ContainerCalendario}>
          <div className={styles.ContainerTitle}>
            <h2>Editar {state?.descricao}</h2>
          </div>
          <form
            onSubmit={handleSubmit((data: IDiaNaoUtil) => putDiaNaoUtil(data))}
          >
            <div className={styles.ContainerNomeEdicao}>
              <TextField
                id="descricao"
                label="Descrição do Período Não Útil"
                variant="standard"
                defaultValue={state?.descricao}
                className={styles.NomeEdicao}
                {...register('descricao')}
              />
              {errors.descricao && (
                <span
                  className={styles.ContainerError}
                  id="erro-descricao-editar-n-util"
                >
                  {errors.descricao.message}
                </span>
              )}

              <FormControlLabel
                control={<Checkbox defaultChecked={status} />}
                label="Repetir todos os anos"
                id="repeticaoAnual"
                {...register('repeticaoAnual')}
              />
            </div>

            <Box className={styles.ContainerMenorCalendario}>
              <Box className={styles.dateContainer}>
                <p>Data Inicial</p>
                <TextField
                  id="dataInicial"
                  className={styles.dataPicker}
                  type={'date'}
                  variant="standard"
                  defaultValue={state?.dataInicial}
                  {...register('dataInicial')}
                />
                {errors.dataInicial && (
                  <span
                    className={styles.ContainerError}
                    id="erro-data-editar-n-util"
                  >
                    {errors.dataInicial.message}
                  </span>
                )}
              </Box>

              <Box className={styles.dateContainer}>
                <p>Data Final</p>
                <TextField
                  id="dataFinal"
                  className={styles.dataPicker}
                  type={'date'}
                  variant="standard"
                  defaultValue={state?.dataFinal}
                  {...register('dataFinal')}
                />
              </Box>
              <Box className={styles.dateContainer}>
                <TextField
                  id="idDiaNaoUtil"
                  className={styles.dataPicker}
                  sx={{ display: 'none' }}
                  value={state.idDiaNaoUtil}
                  {...register('idDiaNaoUtil')}
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: '50px' }}>
              <Button
                className={styles.submitButton}
                type="submit"
                variant="contained"
                id="button-login"
                sx={{ backgroundColor: '#1e62fe' }}
              >
                Enviar
              </Button>
            </Box>
          </form>
        </div>
      </section>
    </>
  )
}
