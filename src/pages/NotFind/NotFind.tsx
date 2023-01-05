import { Header } from '../../components/Header/Header'
import style from './NotFind.module.css'
import notFindLogo from '../../assets/adminLogo.svg'
import { Link } from 'react-router-dom'

export const NotFind = () => {
  return (
    <>
      <Header />
      <div className={style.notFindContainer}>
        <img src={notFindLogo} alt="Pagína não encontrada" />
        <h1>404</h1>
        <h2>Não encontramos a página que você procura.</h2>
        <Link to='/instrutor'>Retornar</Link>
      </div>
    </>
  )
}