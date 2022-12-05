import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../../context/AuthContext'

import { Calendario } from '../../../components/Calendario/Calendario'
import { Header } from '../../../components/Header/Header'

export const InstHome = () => {
  const { loggedUser } = useContext<any>(AuthContext)

  useEffect(() => {
    loggedUser()
  }, [])

  return <Header />
}
