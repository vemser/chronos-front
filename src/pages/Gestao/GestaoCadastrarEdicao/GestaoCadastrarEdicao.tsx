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
        <div className={styles.ContainerCalendario}>
          <div className={styles.ContainerTitle}>
            <h2>Cadastrar Edição</h2>
          </div>

          <form onSubmit={handleSubmit((data: IEdicao) => createEdicao(data))}>
            <div className={styles.ContainerNomeEdicao}>
              <TextField id="nome" label="Nome da edição" variant="standard" className={styles.NomeEdicao} {...register('nome')} error={!!errors.nome} />

              {errors.nome && (<span className={styles.ContainerError} id="erro-nome">
                {errors.nome.message}
              </span>)}
            </div>
           

            <Box className={styles.ContainerMenorCalendario}>
              <Box className={styles.dateContainer} >
                <p>Data Inicial</p>

                <TextField id="dataInicial" className={styles.dataPicker} type={'date'} variant="standard" {...register('dataInicial')} error={!!errors.dataInicial}/>
                
                {errors.dataInicial && (<span className={styles.ContainerError} id="erro-data-inicial">
                  {errors.dataInicial.message}
                </span>)}
              </Box>

              <Box className={styles.dateContainer}>
                <p>Data Final</p>
                
                <TextField id="dataFinal" className={styles.dataPicker} type={'date'} variant="standard"  {...register('dataFinal')} error={!!errors.dataFinal}/>

                {errors.dataFinal && (<span className={styles.ContainerError} id="erro-data-final">
                  {errors.dataFinal.message}  
                </span>)}
              </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: '220px'}}>
              <Button className={styles.submitButton} type="submit" variant="contained" id="button-cadastrar-edicao" sx={{ mt: 3, mb: 2, backgroundColor: '#1e62fe'}}>
                Enviar
              </Button>
            </Box>
          </form>
        </div>
      </section>
    </>
  )
}
