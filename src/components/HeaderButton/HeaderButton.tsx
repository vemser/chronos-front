import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

interface IHeaderButton {
    texto?: string,
    url?: string
}


export const HeaderButton = (props: IHeaderButton ) => {
  return (
    <Link to={`${props.url}`}>
        <Button variant="outlined"  
        sx={{
            color: '#fff',
            '&:hover': {
                background: "#fff",
                border: 'none',
                color: '#1e62fe'
            },

            fontSize: '1rem',
            fontWeight: '600',
            border: 'none'
        }}>
            {props.texto}</Button>
    </Link>
  )
}
