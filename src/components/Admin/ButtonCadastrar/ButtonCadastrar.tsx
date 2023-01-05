import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'

export const ButtonCadastrar = () => {
  return (
    <>
      <Link to={'/admin/cadastrar'}>
        <Button 
        data-testid="botao-cadastrar" 
        variant="contained"
        sx={{
          boxShadow: '-2px 4px 10px -4px rgba(0,0,0,0.75)',
          transition: '0.5s',
          "&:hover":{
            transform: 'scale(1.02)'
          },
          "&:active":{
            transform: 'scale(0.98)'
          }
        }}
        >
          CADASTRAR COLABORADOR
        </Button>
      </Link>
    </>
  )
}
