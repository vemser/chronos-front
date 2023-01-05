import { useEffect, useContext } from 'react'
import { EditarPerfil } from '../../components/EditarPerfil/EditarPerfil'
import { Header } from '../../components/Header/Header'
import { AuthContext } from '../../context/AuthContext'

export const Perfil = () => {
  const { loggedUser } = useContext(AuthContext)
  useEffect(() => {
    loggedUser()
  }, [])

  return (
    <>
      <Header />
      <EditarPerfil />
    </>
  )
}