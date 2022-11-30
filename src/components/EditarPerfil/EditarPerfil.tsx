import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  IconButton
} from '@mui/material'
import React, { useContext } from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp'
import Button from '@mui/material/Button'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import styles from './EditarPerfil.module.css'
import { AdminContext } from '../../context/AdminContext'
import { useForm } from 'react-hook-form'
import { IColaborador } from '../../utils/interfaces'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import Input from '@mui/material/Input'
import FilledInput from '@mui/material/FilledInput'

interface State {
  password: string
  showPassword: boolean
}

export const EditarPerfil = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IColaborador>({})

  const [values, setValues] = React.useState<State>({
    password: '',
    showPassword: false
  })

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value })
    }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword
    })
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const { atualizarSenhaUsuario } = useContext(AdminContext)

  const { inserirFotoUsuario } = useContext(AdminContext)

  // const atualizarPerfil = () => {
  //   atualizarSenhaUsuario(data)
  // }

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
              <h2 style={{ color: '#fff' }}>Editar Perfil</h2>{' '}
            </Box>
          </Grid>
          <form
            onSubmit={handleSubmit((data: IColaborador) =>
              atualizarSenhaUsuario(data)
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
                    <label htmlFor="imagem">
                      <input
                        style={{ display: 'none' }}
                        id="imagem"
                        type="file"
                        {...register('imagem')}
                      />
                      <Button
                        component="span"
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
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          width: '200px',
                          mt: 2
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
                    sx={{ width: '450px' }}
                    className={styles.FormPerfil}
                  />
                  {/* <FormControl sx={{ m: 1, width: '30ch' }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">
                      Senha Atual
                    </InputLabel>
                    <Input
                      type={values.showPassword ? 'text' : 'password'}
                      id="senhaAtual"
                      {...register('senhaAtual')}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {values.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl> */}
                  <TextField
                    label="Senha atual"
                    id="senhaAtual"
                    {...register('senhaAtual')}
                    variant="standard"
                  />
                  <TextField
                    label="Nova Senha"
                    id="novaSenha"
                    {...register('novaSenha')}
                    variant="standard"
                  />
                  <TextField
                    id="confirmacaoNovaSenha"
                    label="Confirmar Nova Senha"
                    variant="standard"
                    {...register('confirmacaoNovaSenha')}
                  />
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
