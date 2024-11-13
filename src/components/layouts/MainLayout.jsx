import React, {Fragment, useEffect, useState} from 'react'
import {Link, Navigate, Outlet, useNavigate} from 'react-router-dom'
import {Home, Search, Mail, AdminPanelSettings} from '@mui/icons-material'
import { AppBar, Box, Button, Drawer, List, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, Card, CardContent } from '@mui/material'
import CheckAuth from '../hoc/CheckAuth'
import { useDispatch, useSelector } from 'react-redux'
import { reset } from '../../redux/slice'
const drawerWidth = 240

const pages =[
    {
        label: 'Home',
        to: '../',
        icon: <Home/>
    },
    {
        label: 'Explore',
        to: '../explore',
        icon: <Search/>
    },
    {
        label: 'Inbox',
        to: '../inbox',
        icon: <Mail/>
    },
    {
        label: 'Admin Panel',
        to: '../admin',
        icon: <AdminPanelSettings/>,
        exclusiveId: 1
    }
]


function MainLayout(){
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const nav = useNavigate()

    const handleLogout = () =>{
        
        dispatch(reset())
        sessionStorage.clear()
        nav("../login")
    }


    return (
        <>
            {/* parent */}
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh'}}>
                <Box sx={{flex: 1, display: 'flex'}}>
                    {/* nav */}
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
                        <Box sx={{overflow: 'auto', flex: 1}}>
                            <List> 
                                
                                {
                                    pages.map((page,index) => (
                                        <Fragment key={index}>
                                            {/* warning: nested ternary operation below */}
                                            {
                                                page?.exclusiveId ?
                                                 page?. exclusiveId === user?.user_id ?
                                                 <ListItem  disablePadding>
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
                                             : null
                                             :
                                             <ListItem  disablePadding>
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
                                            }
                                           
                                        </Fragment>
                                    ))
                                }
                            </List>
                        </Box>
                        <Box mt={2} p={2}>
                            <Card elevation={10}>
                                <Typography><b>Name: </b> {`${user?.full_name}`} </Typography>
                                <Typography><b>Email: </b>{user?.email}</Typography>
                            </Card>
                        </Box>
                        <Box>
                            <Button fullWidth variant='contained' color='error' onClick={handleLogout}>Logout</Button>
                        </Box>
                    </Drawer>
                    {/* content */}
                    <Box p={2} sx={{bgcolor:'lightgray',height: '100%', width: '100%', display: 'flex', flexDirection: 'row'}}>
                         <Outlet/>
                    </Box>
                   
                </Box>
                
            </Box>
        </>
    )
}

export default CheckAuth(MainLayout)