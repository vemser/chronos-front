import React, { useContext } from 'react'
import styles from './AdminCadastrar.module.css'

import TextField from '@mui/material/TextField'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp'
import Button from '@mui/material/Button'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import { useForm } from 'react-hook-form'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import Checkbox from '@mui/material/Checkbox'
import FormHelperText from '@mui/material/FormHelperText'

import { IColaborador } from '../../../utils/interfaces'
import { AdminContext } from '../../../context/AdminContext'
import Input from '@mui/material/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { CadastroDePessoasSchema } from '../../../utils/schemas'
import { Header } from '../../../components/Header/Header'

export const AdminCadastrar = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IColaborador>({ resolver: yupResolver(CadastroDePessoasSchema) })

  const cargos = []

  const { criarDadosColaborador } = useContext(AdminContext)

  return (
    <>
      <Header/>
      <Grid container width={'100%'} display="flex" justifyContent="center">
        <form
          className={styles.FormAdmin}
          onSubmit={handleSubmit((data: IColaborador) =>
            criarDadosColaborador(data)
          )}
        >
          <Grid
            container
            spacing={2}
            width={'80%'}
            alignItems={'center'}
            borderRadius={'8px'}
            boxShadow={2}
            sx={{
              mt: '50px',
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
              color={'#000'}
            
     
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
              alignItems={'center'}
              className={styles.ContainerPerfil}
            >
              <Box
                width={'100%'}
                display="flex"
                justifyContent="center"
                alignItems={'center'}
              >
                <Box display="flex" flexDirection="column" gap="20px">
                  <TextField
                    id="nome"
                    label="Nome"
                    variant="standard"
                    sx={{ width: '450px' }}
                    className={styles.FormPerfil}
                    {...register('nome')}
                    error={!!errors.nome}
                  />
                  {errors.nome && (
                    <span
                      className={styles.ContainerError}
                      id="colab-error-nome"
                    >
                      {errors.nome.message}
                    </span>
                  )}
                  <TextField
                    id="email"
                    label="Email"
                    variant="standard"
                    sx={{ width: '450px' }}
                    className={styles.FormPerfil}
                    {...register('email')}
                    error={!!errors.email}
                  />
                  {errors.email && (
                    <span
                      className={styles.ContainerError}
                      id="colab-error-email"
                    >
                      {errors.email.message}
                    </span>
                  )}
                  <FormControl
                    required
                    // error={error}
                    component="fieldset"
                    sx={{ m: 3 }}
                    variant="standard"
                  >
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            // checked={Administrador}
                            id="Administrador"
                            {...register('Administrador')}
                          />
                        }
                        label="Administrador"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            // checked={GestaoDePessoas}
                            id="GestaoDePessoas"
                            {...register('GestaoDePessoas')}
                          />
                        }
                        label="Gestão De Pessoas"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            // checked={Instrutor}

                            id="Instrutor"
                            {...register('Instrutor')}
                          />
                        }
                        label="Instrutor"
                      />
                    </FormGroup>
                  </FormControl>
                  <div className={styles.ContainerEnviar}>
                    <label htmlFor="submit">
                      <input
                        type="submit"
                        className={styles.BotaoEnviar}
                        value="Enviar"
                      />
                    </label>
                  </div>
                </Box>
              </Box>
            </Box>
          </Grid>
        </form>
      </Grid>
    </>
  )
}
