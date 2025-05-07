import * as React from 'react';
import {
   AppBar, Box, CssBaseline, Divider, Drawer, IconButton, List, ListItem,
   ListItemButton, ListItemText, Toolbar, Button, Typography, Avatar,
   Badge, Container, Fade
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import logo from '../images/logo.png';

const drawerWidth = 280;

export default function Header() {
   const [mobileOpen, setMobileOpen] = React.useState(false);
   const { isLoggedIn, setIsLoggedIn } = useAuth();
   const navigate = useNavigate();
   const location = useLocation();
   const [scrolled, setScrolled] = React.useState(false);

   // Handle scroll effect for navbar
   React.useEffect(() => {
      const handleScroll = () => {
         const isScrolled = window.scrollY > 20;
         if (isScrolled !== scrolled) {
            setScrolled(isScrolled);
         }
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, [scrolled]);

   const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

   const handleLogOut = () => {
      setIsLoggedIn(false);
      navigate('/');
   };

   const isActive = (path: any) => {
      return location.pathname === path;
   };

   const navItems = isLoggedIn ? [
      { name: 'Recipes', path: '/recipes', icon: <CollectionsBookmarkIcon />, badge: 0 },
      { name: 'My Recipes', path: '/myRecipes', icon: <RestaurantMenuIcon />, badge: 0 },
      { name: 'Create Recipe', path: '/addRecipe', icon: <AddCircleIcon />, badge: 0 },
      { name: 'Log Out', path: '/', icon: <ExitToAppIcon />, action: handleLogOut, badge: 0 },
   ] : [
      { name: 'Log In', path: '/logIn', icon: <LoginIcon />, badge: 0 },
      { name: 'Sign Up', path: '/register', icon: <HowToRegIcon />, badge: 0 },
   ];

   const drawer = (
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
         <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            backgroundColor: 'primary.main',
            color: 'white'
         }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
               <Avatar
                  src={logo}
                  alt="Logo"
                  sx={{ width: 40, height: 40, mr: 1.5 }}
               />
               <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Recipe App
               </Typography>
            </Box>
            <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
               <CloseIcon />
            </IconButton>
         </Box>

         <Divider />

         <List sx={{ flexGrow: 1, py: 2 }}>
            {navItems.map(({ name, path, icon, action, badge }) => (
               <ListItem key={name} disablePadding>
                  <ListItemButton
                     component={Link}
                     to={path}
                     onClick={action || handleDrawerToggle}
                     sx={{
                        py: 1.5,
                        px: 3,
                        borderRadius: '0 24px 24px 0',
                        mr: 2,
                        backgroundColor: isActive(path) ? 'rgba(103, 58, 183, 0.08)' : 'transparent',
                        color: isActive(path) ? 'primary.main' : 'text.primary',
                        '&:hover': {
                           backgroundColor: 'rgba(103, 58, 183, 0.12)',
                           color: 'primary.main',
                        },
                        transition: 'all 0.2s ease-in-out',
                     }}
                  >
                     <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%'
                     }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                           {React.cloneElement(icon, {
                              sx: {
                                 color: isActive(path) ? 'primary.main' : 'text.secondary',
                                 mr: 2,
                                 transition: 'color 0.2s ease'
                              }
                           })}
                           <ListItemText
                              primary={name}
                              primaryTypographyProps={{
                                 fontWeight: isActive(path) ? 'bold' : 'normal',
                              }}
                           />
                        </Box>
                        {badge > 0 && (
                           <Badge color="error" badgeContent={badge} />
                        )}
                     </Box>
                  </ListItemButton>
               </ListItem>
            ))}
         </List>

         <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
               © 2025 Recipe App
            </Typography>
         </Box>
      </Box>
   );

   return (
      <Box sx={{ display: 'flex' }}>
         <CssBaseline />
         <AppBar
            component="nav"
            sx={{
               backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)',
               backdropFilter: 'blur(10px)',
               boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.08)' : 'none',
               transition: 'all 0.3s ease-in-out',
               color: 'text.primary',
               borderBottom: scrolled ? 'none' : '1px solid rgba(0,0,0,0.05)',
            }}
            elevation={0}
         >
            <Container maxWidth="xl">
               <Toolbar sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  minHeight: scrolled ? 64 : 80,
                  transition: 'min-height 0.3s ease'
               }}>
                  <IconButton
                     color="inherit"
                     aria-label="open drawer"
                     edge="start"
                     onClick={handleDrawerToggle}
                     sx={{ display: { sm: 'none' } }}
                  >
                     <MenuIcon />
                  </IconButton>

                  <Fade in={true} timeout={1000}>
                     <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                     }}>
                        <Box
                           sx={{
                              display: 'flex',
                              alignItems: 'center',
                              cursor: 'pointer'
                           }}
                           onClick={() => navigate('/')}
                        >
                           <Box
                              component="img"
                              src={logo}
                              alt="logo"
                              sx={{ height: 65, cursor: 'pointer', paddingRight: "50px" }}
                              onClick={handleLogOut}
                           />
                        </Box>
                        <Typography
                           variant="h4"
                           sx={{
                              fontWeight: 700,
                              backgroundImage: 'linear-gradient(45deg, #9c27b0, #ff9800)',
                              backgroundClip: 'text',
                              color: 'transparent',
                              WebkitBackgroundClip: 'text',
                              letterSpacing: '0.5px'
                           }}
                        >
                           Recipe App
                        </Typography>
                     </Box>
                  </Fade>

                  <Box sx={{
                     display: { xs: 'none', sm: 'flex' },
                     alignItems: 'center',
                     justifyContent: 'center',
                     gap: 1
                  }}>
                     {navItems.map(({ name, path, icon, action }) => (
                        <Button
                           key={path}
                           component={Link}
                           to={path}
                           onClick={action}
                           sx={{
                              px: { sm: 1.5, md: 2 },
                              py: 1,
                              borderRadius: '12px',
                              display: 'flex',
                              alignItems: 'center',
                              color: isActive(path) ? 'purple' : 'gray',
                              backgroundColor: isActive(path) ? 'rgba(181, 58, 183, 0.08)' : 'transparent',
                              fontWeight: isActive(path) ? 'bold' : 'medium',
                              textTransform: 'none',
                              fontSize: '0.95rem',
                              transition: 'all 0.2s ease-in-out',
                              mx: { sm: 0.5, md: 1 },
                              '&:hover': {
                                 backgroundColor: 'rgba(181, 58, 183, 0.08)',
                                 transform: 'translateY(-2px)',
                                 color: 'purple'
                              },
                           }}
                        >
                           {React.cloneElement(icon, {
                              sx: {
                                 mr: { sm: 0.5, md: 1 },
                                 fontSize: '1.2rem',
                                 color: isActive(path) ? 'purple' : 'gray'
                              }
                           })}
                           <Typography sx={{
                              display: { sm: name === 'Log In' || name === 'Sign Up' ? 'block' : 'none', md: 'block' }
                           }}>
                              {name}
                           </Typography>
                        </Button>
                     ))}
                  </Box>
               </Toolbar>
            </Container>
         </AppBar>

         <nav>
            <Drawer
               variant="temporary"
               open={mobileOpen}
               onClose={handleDrawerToggle}
               ModalProps={{ keepMounted: true }}
               sx={{
                  display: { xs: 'block', sm: 'none' },
                  '& .MuiDrawer-paper': {
                     boxSizing: 'border-box',
                     width: drawerWidth,
                  },
               }}
            >
               {drawer}
            </Drawer>
         </nav>

         {/* Extra toolbar to push content down */}
         <Toolbar sx={{ minHeight: scrolled ? 64 : 80, transition: 'min-height 0.3s ease' }} />
      </Box>
   );
}