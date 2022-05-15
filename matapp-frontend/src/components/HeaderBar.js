import React from 'react'
import { useState } from 'react'
import { AppBar, Toolbar, IconButton, Button, Menu, MenuItem, Tooltip } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { Typography } from '@mui/material'
import AdbIcon from '@mui/icons-material/Adb'
import { Box } from '@mui/material'
import { Link as RouterLink, MemoryRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

export default function HeaderBar({ logout, showLogin }) {

  const [anchorElementUser, setAnchorElementUser] = useState(null)
  const [anchorElementNavigation, setAnchorElementNavigation] = useState(null)
  const loggedInUser = useSelector(state => state.loggedInUser)


  const handleUserMenu = (event) => {
    console.log(event.currentTarget)
    setAnchorElementUser(event.currentTarget)
  }

  const handleOpenNavigationMenu = (event) => {
    setAnchorElementNavigation(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorElementUser(null)

  }

  const handleCloseNavigationMenu = () => {
    setAnchorElementNavigation(null)
  }

  const handleLogout = () => {
    //@TODO: Fix user logout
    console.log('Log out user')
    logout()
    setAnchorElementUser(null)
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              color: 'inherit'
            }}
          >
            RECIPES
          </Typography>
          <Box sx={{ flexgrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="medium"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleOpenNavigationMenu}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-navigation'
              anchorEl={anchorElementNavigation}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElementNavigation)}
              onClose={handleCloseNavigationMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              <MenuItem onClick={handleCloseNavigationMenu}>
                <Typography
                  textAlign='center'
                  component={RouterLink}
                  to='/'
                  color='inherit'
                  textDecoration='none'
                >
                  Home
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavigationMenu}>
                <Typography
                  textAlign='center'
                  component={RouterLink}
                  to='/fooditems/'
                  color='inherit'
                  textDecoration='none'
                >
                  Fooditems
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant='h6'
            noWrap
            component='div'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            RECIPES
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              onClick={handleCloseNavigationMenu}
              component={RouterLink}
              to='/'
              sx={{ my: 2, color: 'inherit', display: 'block' }}
            >
              Home
            </Button>
            <Button
              onClick={handleCloseNavigationMenu}
              component={RouterLink}
              to='/fooditems/'
              sx={{ my: 2, color: 'inherit', display: 'block' }}
            >
              Fooditems
            </Button>
          </Box>
          <Box sx={{ flexGrow: 1 }} />

          {loggedInUser ?
            <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
              <Typography
                variant="subtitle1"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  alignItems: 'center',
                  color: 'inherit',
                  textDecoration: 'none'
                }}
              >
                {loggedInUser.username}
              </Typography>
              <Tooltip title="Open user menu">
                <IconButton
                  size="large"
                  onClick={handleUserMenu}
                  aria-label="test menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                >

                  <AccountCircle />
                </IconButton>
              </Tooltip>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElementUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                open={Boolean(anchorElementUser)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                <MenuItem onClick={handleClose}>Test2</MenuItem>
              </Menu>
            </Box> :
            <Box>
              <Button
                variant="RouterLink"
                noWrap
                onClick={() => showLogin(true)}
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  alignItems: 'center',
                  color: 'inherit',
                  textDecoration: 'none'
                }}>
                Login
              </Button>
            </Box>
          }


        </Toolbar>
      </AppBar>
    </div>
  )
}