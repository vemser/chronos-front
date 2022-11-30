import React, { useContext } from 'react'
import styles from './GestaoEditarEdicao.module.css'
import { Box, TextField, Button } from '@mui/material'
import 'dayjs/locale/pt-br'
import { GestaoHeader } from '../../../components/Gestao/GestaoHeader/GestaoHeader'
import { IEdicao } from '../../../utils/interfaces'
import { useForm } from 'react-hook-form'
import { cadastrarEdicaoFormSchema } from '../../../utils/schemas'
import { yupResolver } from '@hookform/resolvers/yup'
import { UserContext } from '../../../context/UserContex'
import { useLocation } from 'react-router-dom'

export const GestaoEditarEdicao = () => {

  const { editEdicao } = useContext(UserContext);

  const { register, handleSubmit,  formState: { errors }} = useForm<IEdicao>(({
    resolver: yupResolver(cadastrarEdicaoFormSchema)
  }))

  const { state } = useLocation();

  return (
    <>
    <GestaoHeader />
      <section className={styles.ContainerSection}>
        <div className={styles.ContainerTitle}>
          <h2>Editar</h2>
        </div>

        <div className={styles.ContainerCalendario}>
          <form onSubmit={handleSubmit((data: IEdicao) => editEdicao(data))}>
            <div className={styles.ContainerNomeEdicao}>
              <TextField
                id="nome"
                label="Nome da edição"
                defaultValue={state.nome}
                variant="standard"
                className={styles.NomeEdicao}
                {...register('nome')}
              />
            </div>
            <div className={styles.ContainerMenorCalendario}>
              <Box>
                <p>Início</p>
                <TextField id="dataInicial" className={styles.dataPicker} type={'date'} variant="standard"  defaultValue={state.dataInicial}{...register('dataInicial')}/>
                <TextField id="dataFinal" className={styles.dataPicker} type={'date'} variant="standard"  defaultValue={state.dataFinal} {...register('dataFinal')}/>
                <TextField id="idEdicao" style={{ display: 'none'}} value={state.idEdicao} {...register('idEdicao')}/>
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
