import React, { useEffect, useMemo } from 'react'
import { AdminContext } from './AdminContext'
import { useContext } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

export const PaginacaoColaborador = () => {
  const { totalPages, buscarDadosColaborador } = useContext(AdminContext)
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
    buscarDadosColaborador(pageNumber)
    console.log(pageNumber)
  }, [pageNumber])

  return (
    <div>
      {pages.map(item => (
        <Link key={item} to={`/admin?page=${item}`}>
          {item}
        </Link>
      ))}
    </div>
  )
}
