import React, { useContext } from 'react'
import styles from './GestaoCadastrarDiaNaoUtil.module.css'
import TextField from '@mui/material/TextField'
import { Box, Button, Checkbox, FormControlLabel } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Dayjs } from 'dayjs'
import 'dayjs/locale/pt-br'
import { GestaoHeader } from '../../../components/Gestao/GestaoHeader/GestaoHeader'
import { Link } from 'react-router-dom'
import { IDiaNaoUtil } from '../../../utils/interfaces'
import { DiaNaoUtilContext } from '../../../context/DiaNaoUtilContext'
import { yupResolver } from '@hookform/resolvers/yup'
import { cadastrarDiaNaoUtilFormSchema } from '../../../utils/schemas'


export const GestaoCadastrarDiaNaoUtil = () => {

 const { postDiaNaoUtil } = useContext(DiaNaoUtilContext)


  const { register, handleSubmit,  formState: { errors }} = useForm<IDiaNaoUtil>(({
    resolver: yupResolver(cadastrarDiaNaoUtilFormSchema)
  }))

  return (
    <>
    <GestaoHeader />
      <section className={styles.ContainerSection}>
        <div className={styles.ContainerTitle}>
          <h2>Cadastrar Dias Não-úteis</h2>
        </div>

        <div className={styles.ContainerCalendario}>
        <form onSubmit={handleSubmit((data: IDiaNaoUtil) => postDiaNaoUtil(data))}>
            <div className={styles.ContainerNomeEdicao}>
              <TextField
                id="descricao"
                label="Descrição do Período Não Útil"
                variant="standard"
                className={styles.NomeEdicao}
                {...register('descricao')}
              />
               {errors.descricao && (<span
                    className={styles.ContainerError}
                    id="login-error-email"
                  >
                    {errors.descricao.message}
                  </span>
                )}
            </div>
            <div className={styles.ContainerMenorCalendario}>
              <Box>
                <p>Início</p>
                <TextField id="dataInicial" className={styles.dataPicker} type={'date'} variant="standard" {...register('dataInicial')}/>
                {errors.dataInicial && (<span
                    className={styles.ContainerError}
                    id="login-error-email"
                  >
                    {errors.dataInicial.message}
                  </span>
                )}
                <TextField id="dataFinal" className={styles.dataPicker} type={'date'} variant="standard" {...register('dataFinal')}/>
                {errors.dataFinal && (<span
                    className={styles.ContainerError}
                    id="login-error-email"
                  >
                    {errors.dataFinal.message}
                  </span>
                )}
              </Box>
            </div>
            
            <Button
              className={styles.loginText}
              type="submit"
              variant="contained"
              id="button-login"
              sx={{ mt: 3, mb: 2, backgroundColor: '#1e62fe' }}
            >
              Enviar
            </Button>
          </form>
        </div>
      </section>
    </>
  )
}
