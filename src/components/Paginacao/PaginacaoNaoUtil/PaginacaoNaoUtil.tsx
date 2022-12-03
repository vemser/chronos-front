import React, { useEffect, useMemo } from 'react'
import { useContext } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import style from './PaginacaoNaoUtil.module.css'
import { Box } from '@mui/material'
import { DiaNaoUtilContext } from '../../../context/DiaNaoUtilContext'

export const PaginacaoNaoUtil = () => {
  const { totalPages, getDiaNaoUtil } = useContext(DiaNaoUtilContext)
  const [searchParam] = useSearchParams()
  const pageNumber = searchParam.get('page') || '1'

  const pages = useMemo(() => {
    const pageList: number[] = []

    for (let i = 1; i <= totalPages; i++) {
      pageList.push(i)
    }

    return pageList
  }, [totalPages])

  useEffect(() => {
    getDiaNaoUtil(pageNumber)
  }, [pageNumber])

  return (
    <>
        {pageNumber === '1' ? (
          <Box className={style.pagination}>
            <ChevronLeftIcon className={style.icon} />

            <Link style={{ color: '#1e62fe' }} to={`/gestao/dias-nao-uteis?page=${pageNumber}`}>
              {pageNumber}
            </Link>

            <MoreHorizIcon className={style.icon} />

            <Link id='ultimaPagina' className={style.icon} to={`/gestao/dias-nao-uteis?page=${pages.length}`}>{pages.length}</Link>

            <Link className={style.chevron} to={`/gestao/dias-nao-uteis?page=${Number(pageNumber) + 1}`}>
              <ChevronRightIcon className="chevron" />
            </Link>
          </Box>

        ) : (Number(pageNumber) === pages.length) ? (
          <Box className={style.pagination}> 

            <Link to={`/gestao/dias-nao-uteis?page=${Number(pageNumber) - 1}`}>
              <ChevronLeftIcon className={style.icon} />
            </Link>

            <Link className={style.icon} to={`/gestao/dias-nao-uteis?page=${1}`}>
              {1}
            </Link>

            <MoreHorizIcon className={style.icon} />

            <Link style={{ color: '#1e62fe' }}  to={`/gestao/dias-nao-uteis?page=${pageNumber}`}>
              {pageNumber}
            </Link>
            
            <ChevronRightIcon className={style.icon}/>
          </Box>
        ) : (
          <Box className={style.pagination}> 
            <Link to={`/gestao/dias-nao-uteis?page=${Number(pageNumber) - 1}`}>
              <ChevronLeftIcon className={style.icon}/>
            </Link>

            <Link className={style.icon} to={`/gestao/dias-nao-uteis?page=${1}`}>
              {1}
            </Link>

            <MoreHorizIcon className={style.icon} />

            <Link style={{ color: '#1e62fe' }}  to={`/gestao/dias-nao-uteis?page=${pageNumber}`}>
              {pageNumber}
            </Link>

            <MoreHorizIcon className={style.icon} />

            <Link id='ultimaPagina' className={style.icon} to={`/gestao/dias-nao-uteis?page=${pages.length}`}>{pages.length}</Link>

            <Link to={`/gestao/dias-nao-uteis?page=${Number(pageNumber) + 1}`}>
              <ChevronRightIcon className={style.icon}/>
            </Link>
          </Box>
        )}
    </>
  )
}
