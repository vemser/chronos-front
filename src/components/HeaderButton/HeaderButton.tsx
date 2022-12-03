import React from 'react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import styles from './HeaderButton.module.css'

interface IHeaderButton {
    texto?: string,
    url?: string
    id?: string
    cargos?: string
}

export const HeaderButton = (props: IHeaderButton) => {
  return (
    <Link to={`${props.url}`} id={props.id}>
        <Button sx={{ fontSize: '0.875rem', fontWeight: '600', color: '#1e62fe'}}>
          {props.texto}
        </Button>
    </Link>
  )
}
