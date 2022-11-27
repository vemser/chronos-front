import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'

import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'

import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'

import { Link } from 'react-router-dom'
import ImgLogo from '../../assets/logo-dbc-branco.png'
import { HeaderButton } from '../../HeaderButton/HeaderButton'

const pages = ['Products', 'Pricing', 'Blog']
const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

export const AdminHeader = () => {
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
    <AppBar position="static" sx={{ backgroundColor: '#1e62fe' }}>
      <Container maxWidth={false} sx={{ maxWidth: '80%' }}>
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            gap: '60px',
            alignItems: 'center',
            height: '80px',
            justifyContent: 'space-between'
          }}
        >
          <Box
            display={'flex'}
            justifyContent={'center'}
            sx={{
              display: { xs: 'none', md: 'flex' }
            }}
          >
            <Link to="/">
              {' '}
              <img src={ImgLogo} width="100px" alt="" />
            </Link>
          </Box>

          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              alignItems: 'center'
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
            <MenuIcon sx={{ fill: '#fff'}}/>
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
                display: { xs: 'block', md: 'none' }, color:"#fff"
              }} 
            >
              <Box display={'flex'} flexDirection={'column'}>
             
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link to={'/'} style={{
                    fontWeight: '500',
                    fontSize: '1rem'
                  }}>
                    EDIÇÃO
                  </Link>
                </MenuItem>

                <MenuItem onClick={handleCloseUserMenu}>
                  <Link to={'/'} style={{
                    fontWeight: '500',
                    fontSize: '1rem'
                  }}>
                    ETAPA
                  </Link>
                </MenuItem>

                <MenuItem onClick={handleCloseUserMenu}>
                  <Link to={'/'} style={{
                    fontWeight: '500',
                    fontSize: '1rem'
                  }}>
                    PROCESSO
                  </Link>
                </MenuItem>

              </Box>

            </Menu>
          </Box>

          <Box
            justifyContent={'center'}
            sx={{
              display: { xs: 'flex', md: 'none' }
            }}
          >
            <Link to="/">
              {' '}
              <img src={ImgLogo} width="100px" alt="Logo DBC" />
            </Link>
          </Box>


          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap:'40px'}}>
            <HeaderButton texto={'Edição'} url={'/'}/>
          
            <HeaderButton texto={'Etapa'} url={'/aaa'}/>
              
            <HeaderButton texto={'Processo'} url={'/aaa'}/>
          </Box>

          <Box
            sx={{
              flexGrow: 0,
              display: 'flex',
              gap: '10px',
              alignItems: 'center'
            }}
          >

            <h3 style={{color: '#fff'}}>USUARIO</h3>

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
              <MenuItem onClick={handleCloseUserMenu}>
                  <Link to={'/'} style={{
                    fontWeight: '500',
                    fontSize: '1rem'
                  }}>
                    Editar Perfil
                  </Link>
                </MenuItem>

                <MenuItem onClick={handleCloseUserMenu}>
                  <Link to={'/'} style={{
                    fontWeight: '500',
                    fontSize: '1rem'
                  }}>
                    Sair
                  </Link>
                </MenuItem>
            </Menu>
            <Link style={{color: '#fff'}} to="/">Sair</Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
