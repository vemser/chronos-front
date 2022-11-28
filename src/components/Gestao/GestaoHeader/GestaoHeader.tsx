import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'

import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'

import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'

import { Link } from 'react-router-dom'
import imgLogo from '../../../assets/login-logo.png'
import { HeaderButton } from '../../HeaderButton/HeaderButton'
import styles from './GestaoHeader.module.css'
import { List } from '@mui/material'

export const GestaoHeader = () => {

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  return (
    <AppBar position="static" className={styles.header} sx={{ backgroundColor: '#ffffff'}}>
      <Container maxWidth={false} className={styles.headerContainer}>
        <Toolbar disableGutters className={styles.toolbar}>

          <Box className={styles.logoImg} sx={{display: { xs: 'none', md: 'flex' }}}>
            <Link to="/gestao">
              <img src={imgLogo} alt="Logo DBC" title='Logo' />
            </Link>
          </Box>

          <Box className={styles.menuBurgerContainer} sx={{ display: { xs: 'flex', md: 'none' } }} >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
            <MenuIcon className={styles.burgerIcon}/>
            </IconButton >
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }} 
            >
              <Box className={styles.menuBurgerOptions}>
                <Link to={'/gestao/edicoes'}>
                  <MenuItem>
                    EDIÇÕES
                  </MenuItem>
                </Link>

                <Link to={'/gestao/dias-nao-uteis'}>
                  <MenuItem>
                    DIAS NÃO ÚTEIS
                  </MenuItem>
                </Link>
              </Box>

            </Menu>
          </Box>

          <Box className={styles.logoImg} sx={{ display: { xs: 'flex', md: 'none'}}} >
            <Link to="/">
              <img src={imgLogo}  alt="Logo DBC" />
            </Link>
          </Box>

          
          <Box className={styles.navbar} sx={{display: { xs: 'none', md: 'flex' }}}>
            <ul>
              <HeaderButton texto={'EDIÇÕES'} url={'/gestao/edicoes'}/>
              <HeaderButton texto={'DIAS NÃO ÚTEIS'} url={'/gestao/dias-nao-uteis'}/>
            </ul>
          </Box>

          <Box className={styles.usuario}>

            <h3>USUARIO</h3>

            <Tooltip title="Exibir detalhes">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem>
                  <Box className={styles.menuBurgerOptions}>
                    <Link to={'/gestao/perfil'}>
                      <MenuItem>
                        EDITAR PERFIL
                      </MenuItem>
                    </Link>

                    <Link to={'/'}>
                      <MenuItem>
                        SAIR
                      </MenuItem>
                    </Link>
                  </Box>
                </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
