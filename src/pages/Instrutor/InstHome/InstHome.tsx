import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { Header } from '../../../components/Header/Header'
import { Calendario } from '../../../components/Calendario/Calendario'



export const InstHome = () => {


  const { loggedUser} = useContext<any>(AuthContext)
  
  useEffect(() => {
    loggedUser()
  }, [])

  return (
    <>
      <Header />
      <Calendario />
    </>
  )
}

