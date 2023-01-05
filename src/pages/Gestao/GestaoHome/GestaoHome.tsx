import { useContext, useEffect } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { Header } from '../../../components/Header/Header'
import { CalendarioGeral } from '../../../components/CalendarioGeral/CalendarioGeral'

export const GestaoHome = () => {
  const { loggedUser } = useContext<any>(AuthContext)

  useEffect(() => {
    loggedUser()
  }, [])

  return (
    <>
      <Header />
      <CalendarioGeral />
    </>
  )
}