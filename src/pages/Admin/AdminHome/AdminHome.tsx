import React, { useContext, useEffect, useLayoutEffect } from 'react'
import { IAdminContext } from '../../../utils/interfaces'
import { AdminContext } from '../../../context/AdminContext'
import { Header } from '../../../components/Header/Header'
import { ConteudoAdmin } from '../../../components/ConteudoAdmin/ConteudoAdmin'
import { AuthContext } from '../../../context/AuthContext'
import { CalendarioGeral } from '../../../components/CalendarioGeral/CalendarioGeral'

export const AdminHome: React.FC = () => {
  const { buscarDadosColaborador } = useContext<IAdminContext>(AdminContext)

  const { loggedUser, roles } = useContext<any>(AuthContext)

  useLayoutEffect(() => {
    buscarDadosColaborador('1')
  }, [])

  useEffect(() => {
    loggedUser()
  }, [])
  return (
    <>
      <Header />
      {roles.includes("ROLE_GESTAO_DE_PESSOAS") ? <CalendarioGeral /> : <ConteudoAdmin />}
    </>
  )
}
