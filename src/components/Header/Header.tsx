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

import { List } from '@mui/material'
import { AuthContext } from '../../context/AuthContext'
import { HeaderButton } from '../HeaderButton/HeaderButton'
import './Header.css'

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

                <MenuItem data-testid="id-menu-cadastrar" id="colaboradoresResp" className='hide' sx={{  '&:hover': { backgroundColor: 'inherit' }}}>
                  <Link to='/admin/colaboradores'>
                      <p>COLABORADORES</p>
                  </Link> 
                </MenuItem>

                <MenuItem data-testid="id-menu-cadastrar" id="gestaoEdicoesResp" className='hide' sx={{  '&:hover': { backgroundColor: 'inherit' }}}>
                  <Link to='/gestao/edicoes'>
                      <p>EDIÇÕES</p>
                  </Link> 
                </MenuItem>

                <MenuItem data-testid="id-menu-cadastrar" id="gestaoNaoUtilResp" className='hide' sx={{  '&:hover': { backgroundColor: 'inherit' }}}>
                  <Link to='/gestao/dias-nao-uteis'>
                      <p>PERÍODO NÃO ÚTIL</p>
                  </Link> 
                </MenuItem>

                <MenuItem data-testid="id-menu-cadastrar" id="instrutorEdicoesResp" className='hide' sx={{  '&:hover': { backgroundColor: 'inherit' }}}>
                  <Link to='/instrutor/edicoes'>
                      <p>EDIÇÕES</p>
                  </Link> 
                </MenuItem>
                      
                <MenuItem data-testid="id-menu-cadastrar" id="instrutorNaoUtilResp" className='hide' sx={{  '&:hover': { backgroundColor: 'inherit' }}}>
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
                sx={{ '&:hover': { backgroundColor: 'inherit' } }}
              >
                <HeaderButton
                  texto={'COLABORADORES'}
                  url={'/admin/colaboradores'}
                />
              </MenuItem>

              <MenuItem
                id="gestaoEdicoes"
                className="hide"
                sx={{ '&:hover': { backgroundColor: 'inherit' } }}
              >
                <HeaderButton texto={'EDIÇÕES'} url={'/gestao/edicoes'} />
              </MenuItem>

              <MenuItem
                id="gestaoNaoUtil"
                className="hide"
                sx={{ '&:hover': { backgroundColor: 'inherit' } }}
              >
                <HeaderButton
                  texto={'PERÍODO NÃO ÚTIL'}
                  url={'/gestao/dias-nao-uteis'}
                />
              </MenuItem>

              <MenuItem
                id="instrutorEdicoes"
                className="hide"
                sx={{ '&:hover': { backgroundColor: 'inherit' } }}
              >
                <HeaderButton texto={'EDIÇÕES'} url={'/instrutor/edicoes'} />
              </MenuItem>

              <MenuItem
                id="instrutorNaoUtil"
                className="hide"
                sx={{ '&:hover': { backgroundColor: 'inherit' } }}
              >
                <HeaderButton
                  texto={'PERÍODO NÃO ÚTIL'}
                  url={'/instrutor/dias-nao-uteis'}
                />
              </MenuItem>
            </ul>
          </Box>

          <Box className={'usuario'}>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}><h3>{dadosUsuarioLogado.nome}</h3></Box>
           
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
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
