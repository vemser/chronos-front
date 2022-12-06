import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { IAuthContext } from '../../utils/interfaces'
import imgHome from '../../assets/adminLogo.svg'
import styles from './ConteudoAdmin.module.css'

export const ConteudoAdmin = () => {
 
    const { dadosUsuarioLogado } =
    useContext<IAuthContext>(AuthContext)

  return (
    <>
    <div className={styles.ContainerInstrutor}>
      <div className={styles.containerBemVindo}>
        <h1>
          Seja bem vindo ao <span className={styles.corChronos}>Chronos</span>
          , {dadosUsuarioLogado.nome} !
        </h1>
      </div>
      <div>
        <img className={styles.Logo} src={imgHome} alt="" />
      </div>
    </div>
  </>
  )
}
