import React, { useContext, useEffect } from 'react'
import { Header } from '../../../components/Header/Header'
import { ConteudoAdmin } from '../../../components/ConteudoAdmin/ConteudoAdmin'
import { AuthContext } from '../../../context/AuthContext'
import { CalendarioGeral } from '../../../components/CalendarioGeral/CalendarioGeral'

export const AdminHome: React.FC = () => {
  const { loggedUser, roles } = useContext<any>(AuthContext)

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