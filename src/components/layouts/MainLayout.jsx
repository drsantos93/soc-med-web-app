import React, {useState} from 'react'
import {Link, Navigate, Outlet} from 'react-router-dom'
import {Home, AccountCircle, Menu} from '@mui/icons-material'
import { AppBar, Box, Button, Drawer, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'

const drawerWidth = 240

const pages =[
    {
        label: 'Dashboard',
        to: '/',
        icon: <Home/>
    },
    {
        label: 'Profiles',
        to: '/profile',
        icon: <AccountCircle/>
    }
]

const DrawerForWideScreen = () =>(
    <Drawer
        variant='permanent'
        sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
            display: {xs: 'none',sm:'none',md:'block'}
        }}
    >
        <Toolbar/>
        <Box sx={{overflow: 'auto'}}>
            <List>
                {
                    pages.map((page,index) => (
                        <ListItem key={index} disablePadding>
                            {/* if an object has a ? beside it (page?.to), the ? usually checks if the object is null/undefined; ? = null safe */}
                            <Link style={{color: 'inherit', textDecoration: 'inherit', width: '100%'}} to={page?.to ? page.to : '/'}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {page?.icon ? page.icon : null}
                                    </ListItemIcon>
                                    <ListItemText sx={{pl: 6}} primary={page.label} />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    ))
                }
            </List>
        </Box>
    </Drawer>
)

function MainLayout(){
    const [openDrawer, setOpenDrawer] = useState(false)

    const toggleDrawer = () => setOpenDrawer(!openDrawer)

    return (
        <>
            <Box sx={{flexGrow: 1}}>
                <AppBar position='fixed' sx={{ zIndex: theme => theme.zIndex.drawer + 1}}>
                    <Toolbar>
                        <IconButton 
                        size='large'
                        edge='start'
                        color='inherit'
                        aria-label='menu'
                        sx={{mr:2,display: {sm: 'block', md: 'none'}}}
                        onClick={toggleDrawer}
                        >
                            <Menu/>
                        </IconButton>
                        {/* our web app icon */}
                        <Typography variant='h6' component='div' sx={{flexGrow: 1}}>
                            Social Media Admin Panel
                        </Typography>
                        
                    </Toolbar>
                </AppBar>
                <DrawerForWideScreen />
            </Box>
            <Box sx={{mt: 8, pl:{md: `${drawerWidth}px`, sm: 0}}}>
                <Box>
                    <Outlet/>
                </Box>
                
            </Box>
        </>
    )
}

export default MainLayout