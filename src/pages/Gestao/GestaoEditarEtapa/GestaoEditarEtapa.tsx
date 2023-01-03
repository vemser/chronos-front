import React, { useContext } from 'react'
import styles from './GestaoEditarEtapa.module.css'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
import { useLocation, useParams } from 'react-router-dom'
import { UserContext } from '../../../context/UserContex'
import { IEtapa } from '../../../utils/interfaces'
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { EtapaSchema } from '../../../utils/schemas'
import { Header } from '../../../components/Header/Header'

export const GestaoEditarEtapa = () => {


  const { state } = useLocation();
  const { editEtapa } = useContext(UserContext);

  const { register, handleSubmit,  formState: { errors }} = useForm<IEtapa>(({
    resolver: yupResolver(EtapaSchema)
  }))

  const { edicao } = useParams();
  const idEdicao = Number(edicao)

  return (
    <>
      <Header/>
      <div className={styles.ContainerGeral}>
        <div className={styles.ContainerTitle}>
          <h2>Editar etapa</h2>
        </div>
        <div className={styles.ContainerCadastrarEtapa}>

          <form onSubmit={handleSubmit((data:IEtapa) =>  editEtapa(data, idEdicao))}>
            <TextField
              id="nome"
              label="Nome"
              variant="standard"
              className={styles.Nome}
              {...register('nome')}
              error={!!errors.nome}
              defaultValue={state?.nome}
            />
            {errors.nome && (
                  <span
                    className={styles.ContainerError}
                    id="erro-nome"
                  >
                    {errors.nome.message}
                  </span>
            )}


            <TextField
              id="ordemExecucao"
              label="Ordem"
              variant="standard"
              className={styles.Nome}
              defaultValue={state?.ordemExecucao}
              {...register('ordemExecucao')}
              error={!!errors.ordemExecucao}
            />
            {errors.ordemExecucao && (
                  <span
                    className={styles.ContainerError}
                    id="erro-ordem"
                  >
                    {errors.ordemExecucao.message}
                  </span>
            )}
            <TextField
              id="idEtapa"
              label="Ordem"
              variant="standard"
              value={state.idEtapa}
              className={styles.Nome}
              {...register('idEtapa')}
              sx={{ display: 'none'}}
            />

            <Button 
            type={'submit'} 
            variant="contained" 
            className={styles.Button}
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
              Salvar
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
