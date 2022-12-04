import React, { useContext } from 'react'
import styles from './GestaoEditarEdicao.module.css'
import { Box, TextField, Button } from '@mui/material'
import 'dayjs/locale/pt-br'

import { IEdicao } from '../../../utils/interfaces'
import { useForm } from 'react-hook-form'
import { cadastrarEdicaoFormSchema } from '../../../utils/schemas'
import { yupResolver } from '@hookform/resolvers/yup'
import { UserContext } from '../../../context/UserContex'
import { useLocation } from 'react-router-dom'
import { Header } from '../../../components/Header/Header'

export const GestaoEditarEdicao = () => {

  const { editEdicao } = useContext(UserContext);

  const { register, handleSubmit,  formState: { errors }} = useForm<IEdicao>(({
    resolver: yupResolver(cadastrarEdicaoFormSchema)
  }))

  const { state } = useLocation();

  return (
    <>
    <Header/>
      <section className={styles.ContainerSection}>

        <div className={styles.ContainerCalendario}>
          <div className={styles.ContainerTitle}>
            <h2>Editar</h2>
          </div>

          <form onSubmit={handleSubmit((data: IEdicao) => editEdicao(data))}>
            <div className={styles.ContainerNomeEdicao}>
              <TextField
                id="nome"
                label="Nome da edição"
                defaultValue={state.nome}
                variant="standard"
                className={styles.NomeEdicao}
                {...register('nome')}
                error={!!errors.nome}
              />
              {errors.nome && (<span
                className={styles.ContainerError}
                id="erro-nome"
                >
                  {errors.nome.message}
                </span>
              )}
            </div>

            <Box className={styles.ContainerMenorCalendario}>
              <Box className={styles.dateContainer} >
                <p>Data Inicial</p>
                <TextField id="dataInicial" className={styles.dataPicker} defaultValue={state.dataInicial} type={'date'} variant="standard" {...register('dataInicial')} error={!!errors.dataInicial}/>
                {errors.dataInicial && (<span
                  className={styles.ContainerError}
                    id="erro-data-inicial"
                  >
                  {errors.dataInicial.message}
                  </span>
                )}
                </Box>

                <Box className={styles.dateContainer}>
                  <p>Data Final</p>
                  <TextField id="dataFinal" className={styles.dataPicker} defaultValue={state.dataFinal} type={'date'} variant="standard"  {...register('dataFinal')} error={!!errors.dataFinal}/>
                   
                  {errors.dataFinal && (<span
                      className={styles.ContainerError}
                      id="erro-data-inicial"
                    >
                      {errors.dataFinal.message}
                      
                    </span>
                  )}
                </Box>

                <TextField id="idEdicao" sx={{ display: 'none'}} value={state.idEdicao} {...register('idEdicao')}/>

              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center', mt: '220px'}}>
              <Button
                className={styles.submitButton}
                type="submit"
                variant="contained"
                id="button-login" 
                sx={{ mt: 3, mb: 2, backgroundColor: '#1e62fe' }}
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
