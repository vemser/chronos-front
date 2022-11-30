import React, { useEffect, useMemo } from 'react'
import { AdminContext } from './AdminContext'
import { useContext } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

export const PaginacaoColaborador = () => {
  const { totalPages, buscarDadosColaborador } = useContext(AdminContext)
  const [searchParam] = useSearchParams()
  const pageNumber = searchParam.get('page') || '0'

  const pages = useMemo(() => {
    const pageList: number[] = []

    for (let i = 1; i <= totalPages; i++) {
      pageList.push(i)
    }
    return pageList
  }, [totalPages])

  useEffect(() => {
    buscarDadosColaborador(pageNumber)
  }, [pageNumber])

  return (
    <>
      {pageNumber === '1' ? (
        <>
          <ChevronLeftIcon className="chevron" color="secondary" />
          <Link
            style={{ color: 'var(--detail-color)' }}
            to={`/admin?page=${pageNumber}`}
          >
            {pageNumber}
          </Link>
          <Link to={`/admin?page=${Number(pageNumber) + 1}`}>
            {Number(pageNumber) + 1}
          </Link>
          <Link to={`/admin?page=${Number(pageNumber) + 2}`}>
            {Number(pageNumber) + 2}
          </Link>
          <Link to={`/admin?page=${Number(pageNumber) + 3}`}>
            {Number(pageNumber) + 3}
          </Link>
          <Link to={`/admin?page=${Number(pageNumber) + 4}`}>
            {Number(pageNumber) + 4}
          </Link>
          <Link to={`/admin?page=${Number(pageNumber) + 5}`}>
            {Number(pageNumber) + 5}
          </Link>
          <Link to={`/admin?page=${Number(pageNumber) + 6}`}>
            {Number(pageNumber) + 6}
          </Link>
          <MoreHorizIcon fill="#ffffff" />
          <Link to={`/admin?page=${pages.length}`}>{pages.length}</Link>
          <Link to={`/admin?page=${Number(pageNumber) + 1}`}>
            <ChevronRightIcon className="chevron" color="secondary" />
          </Link>
        </>
      ) : Number(pageNumber) === pages.length ? (
        <>
          <Link to={`/admin?page=${Number(pageNumber) - 1}`}>
            <ChevronLeftIcon className="chevron" color="secondary" />
          </Link>
          <Link to={`/admin?page=1`}>1</Link>
          <MoreHorizIcon fill="#ffffff" />
          <Link to={`/admin?page=${Number(pageNumber) - 6}`}>
            {Number(pageNumber) - 6}
          </Link>
          <Link to={`/admin?page=${Number(pageNumber) - 5}`}>
            {Number(pageNumber) - 5}
          </Link>
          <Link to={`/admin?page=${Number(pageNumber) - 4}`}>
            {Number(pageNumber) - 4}
          </Link>
          <Link to={`/admin?page=${Number(pageNumber) - 3}`}>
            {Number(pageNumber) - 3}
          </Link>
          <Link to={`/admin?page=${Number(pageNumber) - 2}`}>
            {Number(pageNumber) - 2}
          </Link>
          <Link to={`/admin?page=${Number(pageNumber) - 1}`}>
            {Number(pageNumber) - 1}
          </Link>
          <Link
            style={{ color: 'var(--detail-color)' }}
            to={`/admin?page=${pageNumber}`}
          >
            {pageNumber}
          </Link>
          <ChevronRightIcon className="chevron" color="secondary" />
        </>
      ) : Number(pageNumber) === 2 ? (
        <>
          <Link to={`/admin?page=${Number(pageNumber) - 1}`}>
            <ChevronLeftIcon className="chevron" color="secondary" />
          </Link>
          <Link to={`/admin?page=1`}>1</Link>
          <Link
            style={{ color: 'var(--detail-color)' }}
            to={`/admin?page=${pageNumber}`}
          >
            {pageNumber}
          </Link>
          <Link to={`/admin?page=${Number(pageNumber) + 1}`}>
            {Number(pageNumber) + 1}
          </Link>
          <Link to={`/admin?page=${Number(pageNumber) + 2}`}>
            {Number(pageNumber) + 2}
          </Link>
          <Link to={`/admin?page=${Number(pageNumber) + 3}`}>
            {Number(pageNumber) + 3}
          </Link>
          <Link to={`/admin?page=${Number(pageNumber) + 4}`}>
            {Number(pageNumber) + 4}
          </Link>
          <Link to={`/admin?page=${Number(pageNumber) + 5}`}>
            {Number(pageNumber) + 5}
          </Link>
          <MoreHorizIcon fill="#ffffff" />
          <Link to={`/admin?page=${pages.length}`}>{pages.length}</Link>
          <Link to={`/admin?page=${Number(pageNumber) + 1}`}>
            <ChevronRightIcon className="chevron" color="secondary" />
          </Link>
        </>
      ) : Number(pageNumber) > 2 && Number(pageNumber) < 4 ? (
        <>
          <Link to={`/admin?page=${Number(pageNumber) - 1}`}>
            <ChevronLeftIcon className="chevron" color="secondary" />
          </Link>
          <Link to={`/admin?page=1`}>1</Link>
          <Link to={`/admin?page=${Number(pageNumber) - 1}`}>
            {Number(pageNumber) - 1}
          </Link>
          <Link
            style={{ color: 'var(--detail-color)' }}
            to={`/admin?page=${pageNumber}`}
          >
            {pageNumber}
          </Link>
          <Link to={`/admin?page=${Number(pageNumber) + 1}`}>
            {Number(pageNumber) + 1}
          </Link>
          <Link to={`/admin?page=${Number(pageNumber) + 2}`}>
            {Number(pageNumber) + 2}
          </Link>
          <Link to={`/admin?page=${Number(pageNumber) + 3}`}>
            {Number(pageNumber) + 3}
          </Link>
          <Link to={`/admin?page=${Number(pageNumber) + 4}`}>
            {Number(pageNumber) + 4}
          </Link>
          <MoreHorizIcon fill="#ffffff" />
          <Link to={`/admin?page=${pages.length}`}>{pages.length}</Link>
          <Link to={`/admin?page=${Number(pageNumber) + 1}`}>
            <ChevronRightIcon className="chevron" color="secondary" />
          </Link>
        </>
      ) : Number(pageNumber) === pages.length - 1 ? (
        <>
          <Link to={`/admin?page=${Number(pageNumber) - 1}`}>
            <ChevronLeftIcon className="chevron" color="secondary" />
          </Link>
          <Link to={`/admin?page=1`}>1</Link>
          <MoreHorizIcon fill="#ffffff" />
          <Link to={`/admin?page=${Number(pageNumber) - 5}`}>
            {Number(pageNumber) - 5}
          </Link>
          <Link to={`/admin?page=${Number(pageNumber) - 4}`}>
            {Number(pageNumber) - 4}
          </Link>
          <Link to={`/admin?page=${Number(pageNumber) - 3}`}>
            {Number(pageNumber) - 3}
          </Link>
          <Link to={`/admin?page=${Number(pageNumber) - 2}`}>
            {Number(pageNumber) - 2}
          </Link>
          <Link to={`/admin?page=${Number(pageNumber) - 1}`}>
            {Number(pageNumber) - 1}
          </Link>
          <Link
            style={{ color: 'var(--detail-color)' }}
            to={`/admin?page=${pageNumber}`}
          >
            {pageNumber}
          </Link>
          <Link to={`/admin?page=${pages.length}`}>{pages.length}</Link>
          <Link to={`/admin?page=${Number(pageNumber) + 1}`}>
            <ChevronRightIcon className="chevron" color="secondary" />
          </Link>
        </>
      ) : Number(pageNumber) === pages.length - 2 ? (
        <>
          <Link to={`/admin?page=${Number(pageNumber) - 1}`}>
            <ChevronLeftIcon className="chevron" color="secondary" />
          </Link>
          <Link to={`/admin?page=1`}>1</Link>
          <MoreHorizIcon fill="#ffffff" />
          <Link to={`/admin?page=${Number(pageNumber) - 4}`}>
            {Number(pageNumber) - 4}
          </Link>
          <Link to={`/admin?page=${Number(pageNumber) - 3}`}>
            {Number(pageNumber) - 3}
          </Link>
          <Link to={`/admin?page=${Number(pageNumber) - 2}`}>
            {Number(pageNumber) - 2}
          </Link>
          <Link to={`/admin?page=${Number(pageNumber) - 1}`}>
            {Number(pageNumber) - 1}
          </Link>
          <Link
            style={{ color: 'var(--detail-color)' }}
            to={`/admin?page=${pageNumber}`}
          >
            {pageNumber}
          </Link>
          <Link to={`/admin?page=${Number(pageNumber) + 1}`}>
            {Number(pageNumber) + 1}
          </Link>
          <Link to={`/admin?page=${pages.length}`}>{pages.length}</Link>
          <Link to={`/admin?page=${Number(pageNumber) + 1}`}>
            <ChevronRightIcon className="chevron" color="secondary" />
          </Link>
        </>
      ) : (
        <>
          <Link to={`/admin?page=${Number(pageNumber) - 1}`}>
            <ChevronLeftIcon className="chevron" color="secondary" />
          </Link>
          <Link to={`/admin?page=1`}>1</Link>
          <MoreHorizIcon fill="#ffffff" />
          <Link to={`/admin?page=${Number(pageNumber) - 2}`}>
            {Number(pageNumber) - 2}
          </Link>
          <Link to={`/admin?page=${Number(pageNumber) - 1}`}>
            {Number(pageNumber) - 1}
          </Link>
          <Link
            style={{ color: 'var(--detail-color)' }}
            to={`/admin?page=${pageNumber}`}
          >
            {pageNumber}
          </Link>
          <Link to={`/admin?page=${Number(pageNumber) + 1}`}>
            {Number(pageNumber) + 1}
          </Link>
          <Link to={`/admin?page=${Number(pageNumber) + 2}`}>
            {Number(pageNumber) + 2}
          </Link>
          <MoreHorizIcon fill="#ffffff" />
          <Link to={`/admin?page=${pages.length}`}>{pages.length}</Link>
          <Link to={`/admin?page=${Number(pageNumber) + 1}`}>
            <ChevronRightIcon className="chevron" color="secondary" />
          </Link>
        </>
      )}
    </>
  )
}
