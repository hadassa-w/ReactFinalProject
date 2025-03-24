import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import logo from '../images/logo.png';
import "../css/style.css";
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const drawerWidth = 240;
const navItems = [
   { name: 'Login', path: '/logIn' },
   { name: 'Register', path: '/register' },
];

function NewHeader() {
   const [mobileOpen, setMobileOpen] = React.useState(false);

   const handleDrawerToggle = () => {
      setMobileOpen((prevState) => !prevState);
   };

   const drawer = (
      <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
         <Divider />
         <List>
            {navItems.map(({ name, path }) => (
               <ListItem key={name} disablePadding>
                  <ListItemButton component={Link} to={path} sx={{ textAlign: 'center' }}>
                     <ListItemText primary={name} className='listItemText' />
                  </ListItemButton>
               </ListItem>
            ))}
         </List>
      </Box>
   );

   return (
      <Box sx={{ display: 'flex' }}>
         <CssBaseline />
         <AppBar component="nav" style={{ backgroundColor: 'rgb(230, 230, 230)' }}>
            <Toolbar sx={{ alignItems: 'center' }}>
               <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { sm: 'none' } }}
               >
                  {/* <MenuIcon /> */}
               </IconButton>
               <img src={logo} alt="logo" />
               <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  {navItems.map(({ name, path }) => (
                     <Button
                        key={path}
                        component={Link}
                        to={path}
                        sx={{ color: 'purple', textTransform: 'none', marginRight: 2 }}
                     >
                        {name}
                     </Button>
                  ))}
               </Box>
            </Toolbar>
         </AppBar>
         <nav>
            <Drawer
               variant="temporary"
               open={mobileOpen}
               onClose={handleDrawerToggle}
               ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
               }}
               sx={{
                  display: { xs: 'block', sm: 'none' },
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
               }}
            >
               {drawer}
            </Drawer>
         </nav>
      </Box>
   );
}

export default NewHeader;