import React, {useState} from 'react'
import {Link, Navigate, Outlet} from 'react-router-dom'
import {Home, Search, Mail} from '@mui/icons-material'
import { AppBar, Box, Button, Drawer, List, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'

const drawerWidth = 240

const pages =[
    {
        label: 'Home',
        to: '/',
        icon: <Home/>
    },
    {
        label: 'Explore',
        to: '/explore',
        icon: <Search/>
    },
    {
        label: 'Inbox',
        to: '/inbox',
        icon: <Mail/>
    }
]

const DrawerForWideScreen = () =>(
    <Drawer
        variant='permanent'
        sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
            display: 'block',
            position: 'inherit'
        }}
    >
        <Toolbar>
            <Typography variant='h6' component='div' sx={{textAlign:'center'}}>
                Social Media Something XD
            </Typography>
        </Toolbar>
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



function MainLayout(){
    const [openDrawer, setOpenDrawer] = useState(false)

    const toggleDrawer = () => setOpenDrawer(!openDrawer)

    return (
        <>
            {/* parent */}
            <Box sx={{bgcolor: 'lightgray', display: 'flex', flexDirection: 'column', height: '100vh'}}>
                <Box sx={{flex: 1, display: 'flex'}}>
                    {/* nav */}
                    <Box>
                        <DrawerForWideScreen />
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

export default MainLayout