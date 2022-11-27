import React from 'react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import styles from './HeaderButton.module.css'

interface IHeaderButton {
    texto?: string,
    url?: string
}

export const HeaderButton = (props: IHeaderButton ) => {
  return (
    <Link to={`${props.url}`}>
        <Button variant="outlined" className={styles.botao}>
          {props.texto}
        </Button>
    </Link>
  )
}
