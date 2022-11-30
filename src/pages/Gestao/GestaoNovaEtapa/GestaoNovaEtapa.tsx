import React, { useContext } from 'react'
import styles from './GestaoNovaEtapa.module.css'
import { GestaoHeader } from '../../../components/Gestao/GestaoHeader/GestaoHeader'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
import { useLocation } from 'react-router-dom'
import { UserContext } from '../../../context/UserContex'
import { IEtapa } from '../../../utils/interfaces'
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { cadastrarEtapaFormSchema } from '../../../utils/schemas'

export const GestaoNovaEtapa = () => {

  const { state } = useLocation();
  const { createEtapa } = useContext(UserContext);

  const { register, handleSubmit,  formState: { errors }} = useForm<IEtapa>(({
    resolver: yupResolver(cadastrarEtapaFormSchema)
  }))


  return (
    <>
      <GestaoHeader />
      <div className={styles.ContainerGeral}>
        <div className={styles.ContainerTitle}>
          <h2>Cadastrar etapa</h2>
        </div>
        <div className={styles.ContainerCadastrarEtapa}>

          <form onSubmit={handleSubmit((data:IEtapa) =>  createEtapa(data, state.idEdicao))}>
            <TextField
              id="nome"
              label="Nome"
              variant="standard"
              className={styles.Nome}
              {...register('nome')}
            />
            <TextField
              id="ordemExecucao"
              label="Ordem"
              variant="standard"
              className={styles.Nome}
              {...register('ordemExecucao')}
            />
            <Button type={'submit'} variant="contained" className={styles.Button}>
              Enviar
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
