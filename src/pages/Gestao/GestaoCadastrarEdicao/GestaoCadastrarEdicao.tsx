import React from 'react'
import styles from './GestaoCadastrarEdicao.module.css'
import { Header } from '../../../components/Header/Header'
import { TextField } from '@mui/material'

export const GestaoCadastrarEdicao = () => {
  return (
    <>
      <section className={styles.ContainerSection}>
        <div className={styles.ContainerTitle}>
          <h2>Cadastrar edição</h2>
        </div>
        <div className={styles.ContainerConteudo}>
          <TextField
            id="standard-multiline-flexible"
            label="Nome"
            variant="standard"
            sx={{ width: '450px' }}
            className={styles.FormPerfil}
          />
        </div>
      </section>
    </>
  )
}
