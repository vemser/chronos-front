import React, { useEffect } from 'react'
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

import { Link, useNavigate } from 'react-router-dom'
import imgLogo from '../../assets/login-logo.png'

import { AuthContext } from '../../context/AuthContext'
import { HeaderButton } from '../HeaderButton/HeaderButton'
import './Header.css'
import { NavLink } from 'react-router-dom'
import { Divider } from '@mui/material'
import { ListItemIcon } from '@mui/material'
import { Logout, PersonAdd, Settings } from '@mui/icons-material'

export const Header = () => {
  const { dadosUsuarioLogado, handleLogout, loggedUser, roles } =
    React.useContext<any>(AuthContext)

  const navigate = useNavigate()
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  ) 

  useEffect(() => {
    loggedUser()
    renderizarBotoes()
  }, [])

  const imagemBase = dadosUsuarioLogado.imagem
  const userEmail = localStorage.getItem('user')
  let homeLink = ''

  if (roles && roles.includes('ROLE_ADMIN')) {
    homeLink = '/admin'
  } else if (roles && roles.includes('ROLE_GESTAO_DE_PESSOAS')) {
    homeLink = '/gestao'
  } else {
    homeLink = '/instrutor'
  }

  // BOTOES

  const renderizarBotoes = () => {

    roles.includes('ROLE_ADMIN') && document.getElementById('colaboradores')?.classList.remove('hide')
    roles.includes('ROLE_ADMIN') && document.getElementById('colaboradoresResp')?.classList.remove('hide')

    roles.includes('ROLE_GESTAO_DE_PESSOAS') === true && document.getElementById('gestaoEdicoes')?.classList.remove('hide')
    roles.includes('ROLE_GESTAO_DE_PESSOAS') === true && document.getElementById('gestaoEdicoesResp')?.classList.remove('hide')

    roles.includes('ROLE_GESTAO_DE_PESSOAS') === true && document.getElementById('gestaoNaoUtil')?.classList.remove('hide')
    roles.includes('ROLE_GESTAO_DE_PESSOAS') === true && document.getElementById('gestaoNaoUtilResp')?.classList.remove('hide')

    roles.includes('ROLE_INSTRUTOR') && !roles.includes('ROLE_GESTAO_DE_PESSOAS') && document.getElementById('instrutorEdicoes')?.classList.remove('hide')
    roles.includes('ROLE_INSTRUTOR') && !roles.includes('ROLE_GESTAO_DE_PESSOAS') && document.getElementById('instrutorEdicoesResp')?.classList.remove('hide')

    roles.includes('ROLE_INSTRUTOR') && !roles.includes('ROLE_GESTAO_DE_PESSOAS') && document.getElementById('instrutorNaoUtil')?.classList.remove('hide')
    roles.includes('ROLE_INSTRUTOR') && !roles.includes('ROLE_GESTAO_DE_PESSOAS') && document.getElementById('instrutorNaoUtilResp')?.classList.remove('hide')

  }

  roles.includes('ROLE_ADMIN') && document.getElementById('colaboradores')?.classList.remove('hide')
  roles.includes('ROLE_ADMIN') && document.getElementById('colaboradoresResp')?.classList.remove('hide')

  roles.includes('ROLE_GESTAO_DE_PESSOAS') === true && document.getElementById('gestaoEdicoes')?.classList.remove('hide')
  roles.includes('ROLE_GESTAO_DE_PESSOAS') === true && document.getElementById('gestaoEdicoesResp')?.classList.remove('hide')

  roles.includes('ROLE_GESTAO_DE_PESSOAS') === true && document.getElementById('gestaoNaoUtil')?.classList.remove('hide')
  roles.includes('ROLE_GESTAO_DE_PESSOAS') === true && document.getElementById('gestaoNaoUtilResp')?.classList.remove('hide')

  roles.includes('ROLE_INSTRUTOR') && !roles.includes('ROLE_GESTAO_DE_PESSOAS') && document.getElementById('instrutorEdicoes')?.classList.remove('hide')
  roles.includes('ROLE_INSTRUTOR') && !roles.includes('ROLE_GESTAO_DE_PESSOAS') && document.getElementById('instrutorEdicoesResp')?.classList.remove('hide')

  roles.includes('ROLE_INSTRUTOR') && !roles.includes('ROLE_GESTAO_DE_PESSOAS') && document.getElementById('instrutorNaoUtil')?.classList.remove('hide')
  roles.includes('ROLE_INSTRUTOR') && !roles.includes('ROLE_GESTAO_DE_PESSOAS') && document.getElementById('instrutorNaoUtilResp')?.classList.remove('hide')


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

  let activeStyle = {
    color: '#1e62fe',
    borderBottom: '2px solid #1e62fe',
    marginBottom: '5px'
  }

  return (
    <AppBar
      position="static"
      className={'header'}
      sx={{ backgroundColor: '#ffffff' }}
    >
      <Container maxWidth={false} className={'headerContainer'}>
        <Toolbar disableGutters className={'toolbar'}>
          <Box
            data-testid="id-logo"
            className={'logoImg'}
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            <Link to={homeLink}>
              <img src={imgLogo} alt="Logo DBC" title="Logo" />
            </Link>
          </Box>

          <Box
            className={'menuBurgerContainer'}
            sx={{ display: { xs: 'flex', md: 'none' } }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon className={'burgerIcon'} />
            </IconButton>
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
              <Box className={'menuBurgerOptions'}>
                <ul>

                  <MenuItem id="colaboradoresResp" className='hide' sx={{ '&:hover': { backgroundColor: 'inherit' } }}>
                    <Link to='/admin/colaboradores'>
                      <p>COLABORADORES</p>
                    </Link>
                  </MenuItem>

                  <MenuItem id="gestaoEdicoesResp" className='hide' sx={{ '&:hover': { backgroundColor: 'inherit' } }}>
                    <Link to='/gestao/edicoes'>
                      <p>EDIÇÕES</p>
                    </Link>
                  </MenuItem>

                  <MenuItem id="gestaoNaoUtilResp" className='hide' sx={{ '&:hover': { backgroundColor: 'inherit' } }}>
                    <Link to='/gestao/dias-nao-uteis'>
                      <p>PERÍODO NÃO ÚTIL</p>
                    </Link>
                  </MenuItem>

                  <MenuItem id="instrutorEdicoesResp" className='hide' sx={{ '&:hover': { backgroundColor: 'inherit' } }}>
                    <Link to='/instrutor/edicoes'>
                      <p>EDIÇÕES</p>
                    </Link>
                  </MenuItem>

                  <MenuItem id="instrutorNaoUtilResp" className='hide' sx={{ '&:hover': { backgroundColor: 'inherit' } }}>
                    <Link to='/instrutor/dias-nao-uteis'>
                      <p>PERÍODO NÃO ÚTIL</p>
                    </Link>
                  </MenuItem>

                </ul>
              </Box>
            </Menu>
          </Box>

          <Box
            className={'logoImg'}
            sx={{ display: { xs: 'flex', md: 'none' } }}
          >
            <Link to="/">
              <img src={imgLogo} alt="Logo DBC" />
            </Link>
          </Box>

          <Box
            className={'navbar'}
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            <ul>
              <MenuItem
                id="colaboradores"
                className="hide"
                sx={{ cursor:'default', '&:hover': { backgroundColor: 'inherit' } }}
              >
                <NavLink to='/admin/colaboradores'
                  style={({ isActive }) =>
                    isActive ? activeStyle : undefined
                  }
                  className={'links'}
                >
                  <p>COLABORADORES</p>
                </NavLink>
              </MenuItem>
              <MenuItem
                id="gestaoEdicoes"
                className="hide"
                sx={{ cursor:'default', '&:hover': { backgroundColor: 'inherit' } }}
              >                
                <NavLink to='/gestao/edicoes'
                  style={({ isActive }) =>
                    isActive ? activeStyle : undefined
                  }
                  className={'links'}
                >
                  <p>EDIÇÕES</p>
                </NavLink>
              </MenuItem>
              <MenuItem
                id="gestaoNaoUtil"
                className="hide"
                sx={{ cursor:'default', '&:hover': { backgroundColor: 'inherit' } }}
              >
                <NavLink to='/gestao/dias-nao-uteis'
                  style={({ isActive }) =>
                    isActive ? activeStyle : undefined
                  }
                  className={'links'}
                >
                  <p>PERÍODO NÃO ÚTIL</p>
                </NavLink>
              </MenuItem>
              <MenuItem
                id="instrutorEdicoes"
                className="hide"
                sx={{ cursor:'default', '&:hover': { backgroundColor: 'inherit' } }}
              >                
                <NavLink to='/instrutor/edicoes'
                  style={({ isActive }) =>
                    isActive ? activeStyle : undefined
                  }
                  className={'links'}
                >
                  <p>EDIÇÕES</p>
                </NavLink>
              </MenuItem>
              <MenuItem
                id="instrutorNaoUtil"
                className="hide"
                sx={{ cursor:'default', '&:hover': { backgroundColor: 'inherit' } }}
              >
                <NavLink to='/instrutor/dias-nao-uteis'
                  style={({ isActive }) =>
                    isActive ? activeStyle : undefined
                  }
                  className={'links'}
                >
                  <p>PERÍODO NÃO ÚTIL</p>
                </NavLink>                
              </MenuItem>
            </ul>
          </Box>

          <Box className={'usuario'}>
            <Box className='nome-usuario' sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column' }}>
              <h3 style={{ textTransform: 'capitalize' }}>{dadosUsuarioLogado.login?.replace('.', ' ')}</h3>
              <span>{dadosUsuarioLogado?.login}</span>
            </Box>

            <Tooltip title="Exibir detalhes">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {dadosUsuarioLogado.imagem === null ? (
                  <Avatar
                    alt={`${dadosUsuarioLogado.imagem}`}
                    src={dadosUsuarioLogado.imagem}
                  />
                ) : (
                  <img
                    data-testid="imagem-usuario"
                    alt=""
                    width={'250px'}
                    className={'BorderRadius'}
                    src={`data:image/png;base64, ${dadosUsuarioLogado.imagem}`}
                  />
                )}
              </IconButton>
            </Tooltip>

            {/* <Menu
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
              <ul>
                <Box className={'menuBurgerOptions'}>
                  <MenuItem
                    className={'HoverButton'}
                    id={'button-editar-perfil'}
                    onClick={() => {
                      navigate('/perfil')
                    }}
                  >
                    EDITAR PERFIL
                  </MenuItem>

                  <Box onClick={handleLogout}>
                    <MenuItem>SAIR</MenuItem>
                  </Box>
                </Box>
              </ul>
            </Menu> */}

      <Menu
        anchorEl={anchorElUser}
        id="account-menu"
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        onClick={handleCloseUserMenu}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => {navigate('/perfil')}}>
        {dadosUsuarioLogado.imagem === null ? (
                  <Avatar
                    alt={`${dadosUsuarioLogado.imagem}`}
                    src={dadosUsuarioLogado.imagem}
                  />
                ) : (
                  <img
                    data-testid="imagem-usuario"
                    alt=""
                    width={'20px'}
                    className={'minImg'}
                    src={`data:image/png;base64, ${dadosUsuarioLogado.imagem}`}
                  />
                )}
           Editar Perfil
        </MenuItem>
        {/* <MenuItem>
          <Avatar /> My account
        </MenuItem> */}
        <Divider />
        {/* <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem> */}
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" fill={'red'} />
          </ListItemIcon>
          Sair
        </MenuItem>
      </Menu>        


          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
