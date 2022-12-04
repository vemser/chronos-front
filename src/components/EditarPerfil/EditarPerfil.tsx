import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  IconButton,
} from '@mui/material'
import React, { useContext, useState } from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp'
import Button from '@mui/material/Button'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import styles from './EditarPerfil.module.css'
import { AdminContext } from '../../context/AdminContext'
import { useForm } from 'react-hook-form'
import { IColaborador } from '../../utils/interfaces'

import { useLocation } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

import { yupResolver } from '@hookform/resolvers/yup'
import { editarPerfilFormSchema } from '../../utils/schemas'

interface State {
  password: string
  showPassword: boolean
}

export const EditarPerfil = () => {
  const [selectedImage, setSelectedImage] = useState<any>(null)

  const { dadosUsuarioLogado, loggedUser } = React.useContext<any>(AuthContext)
  console.log(dadosUsuarioLogado)

  const imagemBase = dadosUsuarioLogado.imagem
  const { state } = useLocation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IColaborador>({
    defaultValues: {
      nome: dadosUsuarioLogado.nome,
    },
    resolver: yupResolver(editarPerfilFormSchema),
  })

  const [values, setValues] = React.useState<State>({
    password: '',
    showPassword: false,
  })

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value })
    }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const { atualizarSenhaUsuario, inserirFotoUsuario } = useContext(AdminContext)

  const atualizarDadosPerfil = (data: IColaborador) => {
    const formData = new FormData()
    if (selectedImage) {
      formData.append('imagem', selectedImage)
      inserirFotoUsuario(formData)
    }

    atualizarSenhaUsuario(data)
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
            padding: 0,
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
              <h2 style={{ color: '#fff' }}>Editar Perfil</h2>{' '}
            </Box>
          </Grid>
          <form
            onSubmit={handleSubmit((data: IColaborador) =>
              atualizarDadosPerfil(data)
            )}
            className={styles.FormEditar}
          >
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
                  height={'300px'}
                  className={styles.ContainerMedio}
                  borderRadius={'8px'}
                  boxShadow={2}
                >
                  {' '}
                  <div className={styles.ContainerImagem}>
                    {imagemBase === null && selectedImage === null ? (
                      <svg data-testid="AccountCircleSharpIcon" width={'250px'}>
                        <AccountCircleSharpIcon color={'disabled'} />
                      </svg>
                    ) : imagemBase === null && selectedImage !== null ? (
                      <img
                        alt="not fount"
                        width={'250px'}
                        className={styles.BorderRadius}
                        src={URL.createObjectURL(selectedImage)}
                      />
                    ) : imagemBase !== null && selectedImage !== null ? (
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
                        src={`data:image/png;base64, ${imagemBase}`}
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
                      <Button
                        component="span"
                        variant="contained"
                        endIcon={
                          <AddAPhotoIcon
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              mb: '4px',
                            }}
                          />
                        }
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          width: '200px',
                          mt: 2,
                        }}
                      >
                        Trocar Foto
                        <input type="file" hidden name="[name]" />
                      </Button>
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
                    {...register('nome')}
                    variant="standard"
                    className={styles.FormPerfil}
                  />
                  {errors.nome && (
                    <span className={styles.ContainerError} id="nome-error">
                      {' '}
                      {errors.nome.message}{' '}
                    </span>
                  )}
                  <TextField
                    label="Senha atual"
                    id="senhaAtual"
                    type={'password'}
                    {...register('senhaAtual')}
                    variant="standard"
                    error={!!errors.novaSenha}
                  />
                  {errors.senhaAtual && (
                    <span
                      className={styles.ContainerError}
                      id="senha-atual-error"
                    >
                      {errors.senhaAtual.message}
                    </span>
                  )}

                  <TextField
                    label="Nova Senha"
                    id="novaSenha"
                    type={'password'}
                    {...register('novaSenha')}
                    variant="standard"
                    error={!!errors.novaSenha}
                  />
                  {errors.novaSenha && (
                    <span
                      className={styles.ContainerError}
                      id="nova-senha-error"
                    >
                      {errors.novaSenha.message}
                    </span>
                  )}

                  <TextField
                    id="confirmacaoNovaSenha"
                    label="Confirmar Nova Senha"
                    type={'password'}
                    variant="standard"
                    {...register('confirmacaoNovaSenha')}
                    error={!!errors.confirmacaoNovaSenha}
                  />
                  {errors.confirmacaoNovaSenha && (
                    <span
                      className={styles.ContainerError}
                      id="confirmacao-error"
                    >
                      {errors.confirmacaoNovaSenha.message}
                    </span>
                  )}

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
          </form>
        </Grid>
      </Grid>
    </>
  )
}
