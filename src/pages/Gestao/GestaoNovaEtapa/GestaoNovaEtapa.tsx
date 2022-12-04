import React, { useContext } from 'react'
import styles from './GestaoNovaEtapa.module.css'

import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
import { useLocation } from 'react-router-dom'
import { UserContext } from '../../../context/UserContex'
import { IEtapa } from '../../../utils/interfaces'
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { EtapaSchema } from '../../../utils/schemas'
import { Header } from '../../../components/Header/Header'

export const GestaoNovaEtapa = () => {

  const { state } = useLocation();
  const { createEtapa } = useContext(UserContext);

  const { register, handleSubmit,  formState: { errors }} = useForm<IEtapa>(({
    resolver: yupResolver(EtapaSchema)
  }))


  return (
    <>
      <Header/>
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
              error={!!errors.nome}
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
              type='number'
              variant="standard"
              className={styles.Nome}
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

            <Button type={'submit'} variant="contained" className={styles.Button}>
              Enviar
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
