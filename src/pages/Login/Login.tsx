import { Button, TextField } from '@mui/material'
import { Box } from '@mui/material'
import { boxSizing } from '@mui/system'
import React from 'react'
import loginLogo from '../../assets/login-logo.png'
import styles from './Login.module.css'
import { shadows } from '@mui/system';

export const Login = () => {
  return (
    <Box display={'flex'} className={styles.container}>
        <Box component="div" sx={{ width: '50%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent:'center'}} className={styles.image}>
            <img src={loginLogo} alt="" style={{width: '80%'}}/>
        </Box>
    
        <Box 
            display={'flex'} 
            alignItems={'center'} 
            width={'50%'} 
            justifyContent={'center'}
            >
            <Box 
                display={'flex'} 
                flexDirection={'column'} 
                gap={'50px'} 
                alignItems={'center'} 
                justifyContent={'center'}
                borderRadius={'8px'}
                padding={'30px'}
                boxShadow={2}
                >
                <h1 className={styles.blue}>Login</h1>
                <Box className={styles.loginText}
                    display={'flex'} 
                    flexDirection={'column'} 
                    gap={'40px'} 
                    alignItems={'center'} 
                    justifyContent={'center'}
                    >
                    <label htmlFor=""></label>
                    <TextField className={styles.loginText} id='outlined-basic' label='Usuário' variant='outlined' sx={{width: 400, color:'palette.primary.dark' }}/>
                    <TextField className={styles.loginText} id='outlined-basic' label='Senha' variant='outlined' sx = {{width: 400, color:'#1e62fe'}}/>
                </Box>

                <Button className={styles.loginText}
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2, width: '400px', backgroundColor:'#1e62fe'}}
                    >
                    Enviar
                </Button>
            </Box>
        </Box>
    </Box>  
  )
}
