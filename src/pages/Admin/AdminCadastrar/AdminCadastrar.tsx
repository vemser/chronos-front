import React, { useContext } from 'react'
import styles from './AdminCadastrar.module.css'

import TextField from '@mui/material/TextField'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { useForm } from 'react-hook-form'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import Checkbox from '@mui/material/Checkbox'

import { IColaborador } from '../../../utils/interfaces'
import { AdminContext } from '../../../context/AdminContext'
import { yupResolver } from '@hookform/resolvers/yup'
import { CadastroDePessoasSchema } from '../../../utils/schemas'
import { Header } from '../../../components/Header/Header'
import { Loader } from '../../../components/Loader/Loader'

export const AdminCadastrar = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IColaborador>({ resolver: yupResolver(CadastroDePessoasSchema) })

  const cargos = []

  const { criarDadosColaborador, loading } = useContext(AdminContext)

  return (
    <>
      <Header />
        <Grid container width={'100%'} display="flex" justifyContent="center">
        {loading == true ? <Loader /> :
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
                      id="login"
                      label="Login"
                      variant="standard"
                      sx={{ width: '450px' }}
                      className={styles.FormPerfil}
                      {...register('login')}
                      error={!!errors.login}
                    />
                    {errors.login && (
                      <span
                        className={styles.ContainerError}
                        id="colab-error-login"
                      >
                        {errors.login.message}
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
                              id="Administrador"
                              {...register('Administrador')}
                            />
                          }
                          label="Administrador"
                        />

                        <FormControlLabel
                          control={
                            <Checkbox
                              id="GestaoDePessoas"
                              {...register('GestaoDePessoas')}
                            />
                          }
                          label="Gestão De Pessoas"
                        />

                        <FormControlLabel
                          control={
                            <Checkbox id="Instrutor" 
                            {...register('Instrutor')} 
                            />
                          }
                          label="Instrutor"
                        />

                        <FormControlLabel
                          control={
                            <Checkbox id="Gestor" {...register('Gestor')} />
                          }
                          label="Gestor"
                        />

                        <FormControlLabel
                          control={
                            <Checkbox id="Aluno" {...register('Aluno')} />
                          }
                          label="Aluno"
                        />

                        <FormControlLabel
                          control={
                            <Checkbox id="Colaborador" {...register('Colaborador')} />
                          }
                          label="Colaborador"
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
      }
        </Grid>
    </>
  )
}
