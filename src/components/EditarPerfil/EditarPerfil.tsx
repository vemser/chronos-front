import TextField from '@mui/material/TextField'
import React from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp'
import Button from '@mui/material/Button'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import styles from './EditarPerfil.module.css'

export const EditarPerfil = () => {
  const [value, setValue] = React.useState('')
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return (
    <>
      <Grid container width={'100%'} display="flex" justifyContent="center">
        <Grid
          container
          spacing={2}
          width={'80%'}
          alignItems={'center'}
          borderRadius={'8px'}
          boxShadow={2}
          sx={{
            mt: 2,
            mb: 3,
            padding: 0
          }}
        >
          <Grid
            container
            item
            xs={12}
            height={'50px'}
            display="flex"
            justifyContent="center"
            color={'#fff'}
            borderRadius={'8px 8px 0px 0px'}
            boxShadow={2}
            sx={{ backgroundColor: '#1E62FE', width: '100%' }}
          >
            <Box>
              {' '}
              <h2>Editar Perfil</h2>{' '}
            </Box>
          </Grid>
          <Box
            minHeight={'500px'}
            width={'100%'}
            display={'flex'}
            justifyContent={'center'}
            className={styles.ContainerPerfil}
          >
            <Box
              width={'50%'}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <Box
                width={'300px'}
                height={'300px'}
                borderRadius={'8px'}
                boxShadow={2}
              >
                {' '}
                <svg data-testid="AccountCircleSharpIcon">
                  <AccountCircleSharpIcon color={'disabled'} />
                </svg>
                <Box display="flex" justifyContent="center">
                  <Button
                    variant="contained"
                    endIcon={
                      <AddAPhotoIcon
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mb: '4px'
                        }}
                      />
                    }
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    Trocar Foto
                  </Button>
                </Box>
              </Box>
            </Box>

            <Box
              width={'50%'}
              display="flex"
              justifyContent="center"
              alignItems={'center'}
            >
              <Box display="flex" flexDirection="column" gap="20px">
                <TextField
                  id="standard-multiline-flexible"
                  label="Nome"
                  value={value}
                  onChange={handleChange}
                  variant="standard"
                  sx={{ width: '450px' }}
                  className={styles.FormPerfil}
                />
                <TextField
                  id="standard-multiline-flexible"
                  label="Senha Atual"
                  variant="standard"
                />
                <TextField
                  id="standard-multiline-flexible"
                  label="Nova Senha"
                  variant="standard"
                />
                <TextField
                  id="standard-multiline-flexible"
                  label="Confirmar Nova Senha"
                  variant="standard"
                />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
