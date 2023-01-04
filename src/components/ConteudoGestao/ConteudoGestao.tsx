import { useContext } from 'react'
import styles from './ConteudoGestao.module.css'
import imgHome from '../../assets/gestaoLogo.svg'
import { IAuthContext } from '../../utils/interfaces'
import { AuthContext } from '../../context/AuthContext'

export const ConteudoGestao = () => {
  const { dadosUsuarioLogado } = useContext<IAuthContext>(AuthContext)

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
