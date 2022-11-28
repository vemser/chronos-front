import React from 'react'
import styles from './GestaoNovaEtapa.module.css'
import { GestaoHeader } from '../../../components/Gestao/GestaoHeader/GestaoHeader'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button'

export const GestaoNovaEtapa = () => {
  return (
    <>
      <GestaoHeader />
      <div className={styles.ContainerGeral}>
        <div className={styles.ContainerTitle}>
          <h2>Cadastrar etapa</h2>
        </div>
        <div className={styles.ContainerCadastrarEtapa}>
          <TextField
            id="standard-multiline-flexible"
            label="Nome"
            variant="standard"
            className={styles.Nome}
          />
          <TextField
            id="standard-multiline-flexible"
            label="Ordem"
            variant="standard"
            className={styles.Nome}
          />
          <Button variant="contained" className={styles.Button}>
            Enviar
          </Button>
        </div>
      </div>
    </>
  )
}
