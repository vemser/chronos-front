import React, { useContext } from 'react'
import styles from './GestaoCadastrarEdicao.module.css'
import { Box, TextField, Button } from '@mui/material'
import 'dayjs/locale/pt-br'
import { GestaoHeader } from '../../../components/Gestao/GestaoHeader/GestaoHeader'
import { IEdicao } from '../../../utils/interfaces'
import { useForm } from 'react-hook-form'
import { cadastrarEdicaoFormSchema } from '../../../utils/schemas'
import { yupResolver } from '@hookform/resolvers/yup'
import { UserContext } from '../../../context/UserContex'

export const GestaoCadastrarEdicao = () => {

  const { createEdicao } = useContext(UserContext);

  const { register, handleSubmit,  formState: { errors }} = useForm<IEdicao>(({
    resolver: yupResolver(cadastrarEdicaoFormSchema)
  }))



  return (
    <>
    <GestaoHeader />
      <section className={styles.ContainerSection}>
        <div className={styles.ContainerTitle}>
          <h2>Cadastrar Edição</h2>
        </div>

        <div className={styles.ContainerCalendario}>
          <form onSubmit={handleSubmit((data: IEdicao) => createEdicao(data))}>
            <div className={styles.ContainerNomeEdicao}>
              <TextField
                id="nome"
                label="Nome da edição"
                variant="standard"
                className={styles.NomeEdicao}
                {...register('nome')}
              />
            </div>
            <div className={styles.ContainerMenorCalendario}>
              <Box>
                <p>Início</p>
                <TextField id="dataInicial" className={styles.dataPicker} type={'date'} variant="standard" {...register('dataInicial')}/>
                <TextField id="dataFinal" className={styles.dataPicker} type={'date'} variant="standard" {...register('dataFinal')}/>
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
