import React from 'react'
import { useState } from 'react'
import { AppBar, Toolbar, IconButton, Button, Menu, MenuItem, Tooltip, Card, CardContent, CardActionArea, CardActions, Popover, Alert } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { Typography } from '@mui/material'
import AdbIcon from '@mui/icons-material/Adb'
import { Box } from '@mui/material'
import { Link as RouterLink, MemoryRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { TextField } from '@mui/material'
import loginService from '../services/login'
import { setLoggedInUser } from '../reducers/loggedInUserReducer'
import fooditemService from '../services/fooditem'
import recipeService from '../services/recipes'

export default function HeaderBar({ logout }) {

  const [anchorElementUser, setAnchorElementUser] = useState(null)
  const [anchorElementNavigation, setAnchorElementNavigation] = useState(null)
  const [anchorElementLogin, setAnchorElementLogin] = useState(null)
  const loggedInUser = useSelector(state => state.loggedInUser)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState(null)

  const dispatch = useDispatch()

  const handleUserMenu = (event) => {
    console.log(event.currentTarget)
    setAnchorElementUser(event.currentTarget)
  }

  const handleOpenNavigationMenu = (event) => {
    setAnchorElementNavigation(event.currentTarget)
  }

  const handleOpenLoginMenu = (event) => {
    setAnchorElementLogin(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorElementUser(null)

  }

  const handleCloseLoginMenu = () => {
    setAnchorElementLogin(null)
    setUsername('')
    setPassword('')
  }

  const handleCloseNavigationMenu = () => {
    setAnchorElementNavigation(null)
  }

  const handleLogout = () => {
    logout()
    setAnchorElementUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(username)
    console.log(password)
    // if successful login, handleCloseLoginMenu()


    try {

      const userdata = {
        username,
        password
      }
      const receivedTokenAndUserdata = await loginService.loginUser(userdata)
      //Error thrown if unsuccessful login.

      console.log('token', receivedTokenAndUserdata)
      dispatch(setLoggedInUser(receivedTokenAndUserdata))
      window.localStorage.setItem('MatappSavedLocalUser', JSON.stringify(receivedTokenAndUserdata))
      fooditemService.setToken(receivedTokenAndUserdata.token)
      recipeService.setToken(receivedTokenAndUserdata.token)
      //Cleanup
      handleCloseLoginMenu()

    } catch (error) {
      //Show error in login window
      console.log(error.response.data.error)
      setAlert(error.response.data.error)
    }

    console.log('submitted!')
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
                //onClick={() => showLogin(true)}
                onClick={handleOpenLoginMenu}
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  alignItems: 'center',
                  color: 'inherit',
                  textDecoration: 'none'
                }}>
                Login
              </Button>
              <Popover
                component="form"
                onSubmit={handleLogin}
                id='login-menu'
                open={Boolean(anchorElementLogin)}
                anchorEl={anchorElementLogin}
                onClose={handleCloseLoginMenu}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <Box
                  sx={{
                    alignContent: 'right'
                  }}>
                  <Typography
                    variant='h6'
                    sx={{
                      color: 'inherit',
                      p: 2,
                    }}
                  >
                  Login
                  </Typography>
                </Box>
                <Box
                  sx={{
                    px: 2,
                    py: 1
                  }}>
                  <TextField value={username} onChange={( event ) => setUsername(event.target.value)} controlId="formUsername" id="username" label="username" variant="filled" /><br />
                </Box>
                <Box
                  sx={{
                    px: 2,
                    py: 1
                  }}
                >
                  <TextField value={password} onChange={( event ) => setPassword(event.target.value)} id="password" label="password" variant="filled" type="password" />
                </Box>
                {alert ? <Alert
                  severity='warning'
                  onClose={() => setAlert(null)}
                >{alert}</Alert> :
                  <></>
                }
                <Box
                  sx={{
                    p:2
                  }}>
                  <Button
                    onClick={handleCloseLoginMenu}
                    variant='contained'
                  >
                  Close
                  </Button>
                  {' '}
                  <Button
                    variant='contained'
                    onClick={handleLogin}
                    type='submit'
                  >
                  Login
                  </Button>
                </Box>
              </Popover>
            </Box>
          }


        </Toolbar>
      </AppBar>
    </div>
  )
}