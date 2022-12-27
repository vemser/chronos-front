import React, { useContext } from 'react'
import styles from './GestaoCadastrarDiaNaoUtil.module.css'
import TextField from '@mui/material/TextField'
import { Box, Button, Checkbox, FormControlLabel } from '@mui/material'
import { useForm } from 'react-hook-form'
import 'dayjs/locale/pt-br'

import { IDiaNaoUtil } from '../../../utils/interfaces'
import { DiaNaoUtilContext } from '../../../context/DiaNaoUtilContext'
import { yupResolver } from '@hookform/resolvers/yup'
import { cadastrarDiaNaoUtilFormSchema } from '../../../utils/schemas'
import { Header } from '../../../components/Header/Header'


export const GestaoCadastrarDiaNaoUtil = () => {

  const { postDiaNaoUtil } = useContext(DiaNaoUtilContext)
  const { register, handleSubmit,  formState: { errors }} = useForm<IDiaNaoUtil>(({
    resolver: yupResolver(cadastrarDiaNaoUtilFormSchema)
  }))

  const handleRepeticaoAnual = () =>{
    document.getElementById('dataFinalContainer')?.classList.toggle('hide');
  } 

  return (
    <>
    <Header/>
      <section className={styles.ContainerSection}>
        <div className={styles.ContainerCalendario}>
          <div className={styles.ContainerTitle}>
            <h2>Cadastrar Período Não Útil</h2>
          </div>

          <form onSubmit={handleSubmit((data: IDiaNaoUtil) => postDiaNaoUtil(data))}>
          <div className={styles.ContainerNomeEdicao}>
            <TextField
              id="descricao"
              label="Descrição do Período Não Útil"
              className={styles.dataPickerDescription}
              variant="standard"
              
             
              error={!!errors.descricao}
              {...register('descricao')}
            />
            {errors.descricao && (<span
              className={styles.ContainerError}
              id="descricao-error"
              >
                {errors.descricao.message}
              </span>
              )}

              <FormControlLabel control={<Checkbox onClick={() => handleRepeticaoAnual()} /> } 
              label="Repetir todos os anos"  id='repeticaoAnual' className={styles.dataPicker}
              
                {...register('repeticaoAnual')} sx={{mt: 2}}/>
          </div>


        
              <Box className={styles.ContainerMenorCalendario}>

                <Box className={styles.dateContainer} >
                  <p>Data Inicial</p>
                  <TextField id="dataInicial" className={styles.dataPicker} type={'date'} variant="standard" {...register('dataInicial')} error={!!errors.dataInicial}/>
                  {errors.dataInicial && (<span
                      className={styles.ContainerError}
                      id="data-inicial-error"
                    >
                      {errors.dataInicial.message}
                    </span>
                  )}
                </Box>

                <Box className={styles.dateContainer} id='dataFinalContainer'>
                  <p>Data Final</p>
                  <TextField id="dataFinal" className={styles.dataPicker} type={'date'} variant="standard" {...register('dataFinal')} error={!!errors.dataFinal}/>
                </Box>
              </Box>
       

            <Box className={styles.submitContainer}>
              <Button
                className={styles.submitButton}
                type="submit"
                variant="contained"
                id="button-login" 
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
                  Enviar
              </Button>
            </Box>
          </form>
        </div>
      </section>
    </>
  )
}
