import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import NavbarSearchModal from './NavbarSearchModal';
import logo from '../assets/dental-buddy-logo.png';

const pages = [
  { title: 'Home', route: '/home' },
  { title: 'Patient Records', route: '/patient-records' },
  { title: 'Appointments', route: '/appointments' },
  { title: 'AI Dental Assistant', route: '/ai-assistant' },
  { title: 'Illustrations', route: '/illustrations' },
];

const morePages = [
  { title: 'Inventory', route: '/stock' },
  { title: 'Finance & Billing', route: '/finance' },
  { title: 'Dental Diary', route: '/notes' },
  { title: 'Settings', route: '/config' },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElMore, setAnchorElMore] = React.useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleOpenMoreMenu = (event) => setAnchorElMore(event.currentTarget);
  const handleCloseMoreMenu = () => setAnchorElMore(null);

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: 'rgb(42, 151, 201)',
        boxShadow: 3,
        zIndex: 999,
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>

        {/* Logo + Title */}
        <Box
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => navigate('/home')}
        >
          <img
            src={logo}
            alt="DentalBuddy Logo"
            style={{
              height: 50,
              width: 50,
              borderRadius: '50%',
              objectFit: 'cover',
              marginRight: 10,
              backgroundColor: 'white',
            }}
          />
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: 'white',
                lineHeight: 1.2,
              }}
            >
              DENTAL BUDDY
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: 'white',
                fontSize: '0.9rem',
                letterSpacing: 0.5,
              }}
            >
              Your Complete Dental Practice Manager
            </Typography>
          </Box>
        </Box>

        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, alignItems: 'center' }}>
          {pages.map((page) => (
            <Typography
              key={page.title}
              onClick={() => navigate(page.route)}
              sx={{
                color: 'white',
                fontWeight: 500,
                fontSize: '1.09rem',
                cursor: 'pointer',
                '&:hover': {
                  color: '#e0f7fa',
                  textDecoration: 'underline',
                },
              }}
            >
              {page.title}
            </Typography>
          ))}

          {/* More Dropdown */}
          <IconButton onClick={handleOpenMoreMenu} sx={{ color: 'white' }}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorElMore}
            open={Boolean(anchorElMore)}
            onClose={handleCloseMoreMenu}
          >
            {morePages.map((page) => (
              <MenuItem
                key={page.title}
                onClick={() => {
                  navigate(page.route);
                  handleCloseMoreMenu();
                }}
              >
                {page.title}
              </MenuItem>
            ))}
          </Menu>

          {/* Global Search (Admin Only) */}
          <NavbarSearchModal />
        </Box>

        {/* Mobile Hamburger */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton onClick={handleOpenNavMenu} sx={{ color: 'white' }}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorElNav}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
          >
            {[...pages, ...morePages].map((page) => (
              <MenuItem
                key={page.title}
                onClick={() => {
                  navigate(page.route);
                  handleCloseNavMenu();
                }}
              >
                {page.title}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
