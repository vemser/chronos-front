import React, { useContext } from 'react'
import styles from './GestaoCadastrarEdicao.module.css'
import { Box, TextField, Button } from '@mui/material'
import 'dayjs/locale/pt-br'

import { IEdicao } from '../../../utils/interfaces'
import { useForm } from 'react-hook-form'
import { cadastrarEdicaoFormSchema } from '../../../utils/schemas'
import { yupResolver } from '@hookform/resolvers/yup'
import { UserContext } from '../../../context/UserContex'
import { Header } from '../../../components/Header/Header'
import { Loader } from '../../../components/Loader/Loader'

export const GestaoCadastrarEdicao = () => {

  const { createEdicao, loading } = useContext(UserContext);

  const { register, handleSubmit,  formState: { errors }} = useForm<IEdicao>(({
    resolver: yupResolver(cadastrarEdicaoFormSchema)
  }))



  return (
    <>
      <Header/>
      <section className={styles.ContainerSection}>
        <div className={styles.ContainerCalendario}>
          <div className={styles.ContainerTitle}>
            <h2>Cadastrar Edição</h2>
          </div>
          {loading == true ? <Loader /> :
          <form onSubmit={handleSubmit((data: IEdicao) => createEdicao(data))}>
            <div className={styles.ContainerNomeEdicao}>
              <TextField id="nome" label="Nome da edição" variant="standard" className={styles.NomeEdicao} {...register('nome')} error={!!errors.nome} />

              {errors.nome && (<span className={styles.ContainerError} id="erro-nome">
                {errors.nome.message}
              </span>)}
            </div>
           

            <Box className={styles.ContainerMenorCalendario}>
              <Box className={styles.dateContainer} >
                <p>Início da edição</p>

                <TextField id="dataInicial" className={styles.dataPicker} type={'date'} variant="standard" {...register('dataInicial')} error={!!errors.dataInicial}/>
                
                {errors.dataInicial && (<span className={styles.ContainerError} id="erro-data-inicial">
                  {errors.dataInicial.message}
                </span>)}
              </Box>

            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center'}}>
              <Button 
              className={styles.submitButton} 
              type="submit" 
              variant="contained" 
              id="button-cadastrar-edicao" 
              sx={{
                mt: 3, 
                mb: 2, 
                backgroundColor: '#1e62fe',
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
                Enviar
              </Button>
            </Box>
          </form>
          }
        </div>
      </section>
    </>
  )
}
