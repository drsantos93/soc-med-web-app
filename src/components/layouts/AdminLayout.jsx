import React, {useState} from 'react'
import {Link, Navigate, Outlet} from 'react-router-dom'
import {Home, AccountCircle, Menu, Inbox, Dashboard} from '@mui/icons-material'
import { AppBar, Box, Button, Drawer, List, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import AdminAuth from '../hoc/AdminAuth'

const drawerWidth = 240

const pages =[
    {
        label: 'Dashboard',
        to: '../admin/',
        icon: <Dashboard/>
    },
    {
        label: 'Profiles',
        to: '../admin/profile',
        icon: <AccountCircle/>
    },
    {
        label: 'Back to Home',
        to:"../",
        icon: <Home/>
    }
]

const DrawerForWideScreen = () =>(
    <Drawer
        variant='permanent'
        sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
            display: {xs: 'none',sm:'none',md:'block'},
            position: 'inherit'
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
                                    <ListItemText primary={page.label} />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    ))
                }
            </List>
        </Box>
    </Drawer>
)

const  DrawerForSmallScreen = ({open, onClose}) => (
    <Drawer
        anchor="left"
        open={open}
        onClose={onClose}
        sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box'},
            display: {xs: 'block', sm: 'block', md: 'none'}
        }}
    >
        <Toolbar />
        <Box sx={{ overflow: 'auto'}} >
            <List>
                {pages.map((page, index) => (
                    <ListItem  key={index} disablePadding>
                       
                        <Link style={{ color: 'inherit', textDecoration: 'inherit', width: '100%' }} to={page?.to ? page.to : '/'}>
                            <ListItemButton>
                                <ListItemIcon>
                                    {page.icon}
                                </ListItemIcon>
                                <ListItemText primary={page.label} />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </Box>
    </Drawer>
)


function AdminLayout(){
    const [openDrawer, setOpenDrawer] = useState(false)

    const toggleDrawer = () => setOpenDrawer(!openDrawer)

    return (
        <>
            {/* parent */}
            <Box sx={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
                <Box sx={{flex: 1, display: 'flex'}}>
                    {/* nav */}
                    <Box>
                        <AppBar sx={{ zIndex: theme => theme.zIndex.drawer + 1}}>
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
                                <Typography variant='h6' component='div' >
                                    Social Media Admin Panel
                                </Typography>
                                
                            </Toolbar>
                        </AppBar>
                        <DrawerForWideScreen />
                        <DrawerForSmallScreen open={openDrawer} onClose={toggleDrawer}/>
                    </Box>
                    {/* content */}
                    <Box pt={8} sx={{height: '100%', width: '100%', display: 'flex', flexDirection: 'row'}}>
                         <Outlet/>
                    </Box>
                   
                </Box>
                
            </Box>
        </>
    )
}

export default AdminAuth(AdminLayout)