import React, { useContext, useEffect } from 'react'
import { GestaoHeader } from '../../../components/Gestao/GestaoHeader/GestaoHeader'
import { AdminContext } from '../../../context/AdminContext'
import { AuthContext } from '../../../context/AuthContext'
import { IAdminContext } from '../../../utils/interfaces'
import { GestaoNovoProcesso } from '../GestaoNovoProcesso/GestaoNovoProcesso'
import styles from './GestaoHome.module.css'

export const GestaoHome = () => {
  const { dadosColaborador, buscarDadosColaborador } =
    useContext<IAdminContext>(AdminContext)
  const { dadosUsuarioLogado, loggedUser, handleLogout } =
    useContext<any>(AuthContext)
  useEffect(() => {
    loggedUser()
  }, [])

  useEffect(() => {
    buscarDadosColaborador('1')
  }, [])
  return (
    <>
      <GestaoHeader />
    </>
  )
}
