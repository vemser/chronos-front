import React, { useContext, useState } from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp'
import Button from '@mui/material/Button'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import styles from './EditarPerfil.module.css'
import { AdminContext } from '../../context/AdminContext'
import { useForm } from 'react-hook-form'

import { AuthContext } from '../../context/AuthContext'

export const EditarPerfil = () => {
  const [selectedImage, setSelectedImage] = useState<any>(null)

  const { dadosUsuarioLogado } = React.useContext<any>(AuthContext)

  const imagemBase: any = dadosUsuarioLogado.imagem

  const { handleSubmit } = useForm()

  const { inserirFotoUsuario } = useContext(AdminContext)

  const atualizarDadosPerfil = () => {

    const formData = new FormData()

    if (selectedImage) {
      formData.append('imagem', selectedImage)
      inserirFotoUsuario(formData)
    }
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
              <h2 data-testid="titulo-editar-perfil" style={{ color: '#fff' }}>
                Editar Perfil
              </h2>{' '}
            </Box>
          </Grid>
          <form
            onSubmit={handleSubmit(() => { atualizarDadosPerfil() })}
            className={styles.FormEditar}
          >
            <Box
              minHeight={'420px'}
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
                  height={'340px'}
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
                  <Box display="flex" alignItems="center" flexDirection='column'>
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
                        data-testid="botao-trocar-foto"
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
                    {selectedImage === null ?
                      <Button variant="contained" disabled type='submit' sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '200px',
                        mt: 2,
                      }}>
                        Confirmar
                      </Button>
                      :
                      <Button variant="contained" type='submit' sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '200px',
                        mt: 2,
                      }}>
                        Confirmar
                      </Button>
                    }
                  </Box>
                </Box>
              </Box>
            </Box>
          </form>
        </Grid>
      </Grid>
    </>
  )
}