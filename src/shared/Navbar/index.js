import * as React from 'react';
import { useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';
import LogoImg from '../../assets/logo.svg';
import NotesIcon from '../../assets/notes.svg';
import AlertsIcon from '../../assets/alerts.svg';
import './navbar.css';

const pages = [
  { name: 'Search', to: '/' },
  { name: 'My Accounts', to: '/my-accounts' },
  { name: 'Requests', to: '/requests' },
];
const blockedRoutes = ['/login']

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const location = useLocation();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  if (blockedRoutes.includes(location.pathname)) {
    return (
      <AppBar position="static" color="secondary">
        <Container maxWidth="xl">
          <Toolbar disableGutters className='nav-bar'>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}
            >
              <img src={LogoImg} alt='logo' />
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    )
  }

  return (
    <AppBar position="static" color="secondary">
      <Container maxWidth="xl">
        <Toolbar disableGutters className='nav-bar'>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <img src={LogoImg} alt='logo' />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu} className="nav-item-vertical">
                  <NavLink to={page.to}>
                    {page.name}
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <img src={LogoImg} alt='logo' />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
              <MenuItem key={index} className="nav-item-horizontal">
                <NavLink to={page.to}>
                  {page.name}
                </NavLink>
              </MenuItem>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 , display: { xs: 'none', md: 'flex' }}}>
            <MenuItem className="nav-icon">
              <img src={NotesIcon} alt="notes" />
            </MenuItem>
            <MenuItem className="nav-icon">
              <img src={AlertsIcon} alt="alerts" />
            </MenuItem>
          </Box>
          
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;