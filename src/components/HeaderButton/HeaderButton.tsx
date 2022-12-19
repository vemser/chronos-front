import React from 'react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { IHeaderButton } from '../../utils/interfaces'


export const HeaderButton = (props: IHeaderButton) => {
  return (
    <Link to={`${props.url}`} id={props.id}>
      <Button
        data-testid="botao-header"
        sx={{ fontSize: '0.875rem', fontWeight: '600', color: '#1e62fe' }}
      >
        {props.texto}
      </Button>
    </Link>
  )
}
