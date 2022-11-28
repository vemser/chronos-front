import React from 'react'
import styles from './AdminCadastrar.module.css'

import TextField from '@mui/material/TextField'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp'
import Button from '@mui/material/Button'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'

import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import Checkbox from '@mui/material/Checkbox'
import FormHelperText from '@mui/material/FormHelperText'
import { AdminHeader } from '../../../components/Admin/AdminHeader/AdminHeader'

export const AdminCadastrar = () => {
  const [state, setState] = React.useState({
    Administrador: true,
    GestaoDePessoas: false,
    Instrutor: false
  })

  const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked
    })
  }

  const { Administrador, GestaoDePessoas, Instrutor } = state
  const error =
    [Administrador, GestaoDePessoas, Instrutor].filter(v => v).length !== 2

  const [value, setValue] = React.useState('')
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }
  return (
    <>
    <AdminHeader />
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
              <h2>Cadastrar Colaborador</h2>{' '}
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
                  label="Email"
                  value={value}
                  onChange={handleChange}
                  variant="standard"
                  sx={{ width: '450px' }}
                  className={styles.FormPerfil}
                />
                <FormControl
                  required
                  error={error}
                  component="fieldset"
                  sx={{ m: 3 }}
                  variant="standard"
                >
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={Administrador}
                          onChange={handleChangeCheckBox}
                          name="Administrador"
                        />
                      }
                      label="Administrador"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={GestaoDePessoas}
                          onChange={handleChangeCheckBox}
                          name="GestaoDePessoas"
                        />
                      }
                      label="Gestão De Pessoas"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={Instrutor}
                          onChange={handleChangeCheckBox}
                          name="Instrutor"
                        />
                      }
                      label="Instrutor"
                    />
                  </FormGroup>
                </FormControl>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
