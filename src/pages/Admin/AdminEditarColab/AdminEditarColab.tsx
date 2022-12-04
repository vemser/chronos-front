import React, { useContext, useState } from 'react'
import styles from './AdminEditarColab.module.css'

import TextField from '@mui/material/TextField'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp'

import { useForm } from 'react-hook-form'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import Checkbox from '@mui/material/Checkbox'
import FormHelperText from '@mui/material/FormHelperText'

import { IColaborador } from '../../../utils/interfaces'
import { AdminContext } from '../../../context/AdminContext'

import { useLocation } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'
import { yupResolver } from '@hookform/resolvers/yup'

import { EditarFormSchema } from '../../../utils/schemas'
import { Header } from '../../../components/Header/Header'

export const AdminEditarColab = () => {
  const { state } = useLocation()
  const { editarColaborador } = useContext(AdminContext)
  console.log(state)
  const { dadosUsuarioLogado, loggedUser } = React.useContext<any>(AuthContext)

  // const aaaa = state.map((value: any) => {
  //   return console.log(value.cargos)
  // })
  // console.log(aaaa)

  const [selectedImage, setSelectedImage] = useState<any>(null)

  // const {
  //   register,
  //   handleSubmit
  //   // formState: { errors }
  // } = useForm<IColaborador>({})
  // // resolver: yupResolver(CadastroDePessoasSchema)

  const { register, handleSubmit, formState: { errors} } = useForm<IColaborador>({
    defaultValues: {
      nome: state.nome,
      email: state.email,
      imagem: state.imagem,
      cargos: state.cargos
    }, 
     resolver: yupResolver(EditarFormSchema) 
  })


  const atualizarDadosPerfil = (idUsuario: number, data: IColaborador) => {
    editarColaborador(data, idUsuario)
  }

  return (
    <>
      <Header/>
      <Grid container width={'100%'} display="flex" justifyContent="center">
        <form
          className={styles.FormAdmin}
          onSubmit={handleSubmit((data: IColaborador) =>
            atualizarDadosPerfil(state.idUsuario, data)
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
              color={'#fff'}
              borderRadius={'8px 8px 0px 0px'}
              boxShadow={2}
              sx={{ backgroundColor: '#1E62FE', width: '100%' }}
            >
              <Box>
                {' '}
                <h2>Editar Colaborador</h2>{' '}
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
                  <div className={styles.ContainerImagem}>
                    {state.imagem === null && selectedImage === null ? (
                      <svg data-testid="AccountCircleSharpIcon" width={'250px'}>
                        <AccountCircleSharpIcon color={'disabled'} />
                      </svg>
                    ) : state.imagem === null && selectedImage !== null ? (
                      <img
                        alt="not fount"
                        width={'250px'}
                        className={styles.BorderRadius}
                        src={URL.createObjectURL(selectedImage)}
                      />
                    ) : state.imagem !== null && selectedImage !== null ? (
                      <img
                        alt="not fount"
                        width={'250px'}
                        className={styles.BorderRadius}
                        src={URL.createObjectURL(selectedImage)}
                      />
                    ) : (
                      <img
                        alt="not fount"
                        width={'250px'}
                        className={styles.BorderRadius}
                        src={`data:image/png;base64, ${state.imagem}`}
                      />
                    )}
                  </div>
                  <Box display="flex" justifyContent="center">
                    <label htmlFor="imagem">
                      <input
                        style={{ display: 'none' }}
                        id="imagem"
                        type="file"
                        onChange={(e: any) => {
                          if (e.target.files && e.target.files.length > 0) {
                            setSelectedImage(e.target.files[0])
                          }
                        }}
                      />
                    </label>
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
                      id="colab-error-email"
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
                    value={state.email}
                  />
                  <FormControl
                    required
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
                            defaultChecked={state.cargos.some((item : IColaborador) => item.descricao == 'Administrador')}
                          />
                        }
                        label="Administrador"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            
                            id="GestaoDePessoas"
                            {...register('GestaoDePessoas')}
                            defaultChecked={state.cargos.some((item : IColaborador) => item.descricao == 'Gestão de pessoas')}
                          />
                        
                        }
                        label="Gestão De Pessoas"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                          
                            id="Instrutor"
                            {...register('Instrutor')}
                            defaultChecked={state.cargos.some((item : IColaborador) => item.descricao == 'Instrutor')}
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
