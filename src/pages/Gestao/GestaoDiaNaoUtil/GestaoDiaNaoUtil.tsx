import React from 'react'
import styles from 'GestaoDiaNaoUtil.module.css'
import { GestaoHeader } from '../../../components/Gestao/GestaoHeader/GestaoHeader'
import { GestaoNaoUteis } from '../../../components/Gestao/GestaoNaoUteis/GestaoNaoUteis'
export const GestaoDiaNaoUtil = () => {
  return (
    <>
      <GestaoHeader />
      <GestaoNaoUteis />
    </>
  )
}
