import { Box, Typography } from '@mui/material'
import {useState, useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { retrieveProfiles } from '../api/profiles'

const columns =[
    {field: 'id', headerName: 'ID', width: 90},
    {
        field: 'full_name',
        headerName: 'Full Name',
        width: 150
    },
    {
        field: 'nickname',
        headerName: 'Nick Name',
        width: 150
    },
    {
        field: 'bio',
        headerName: 'Bio',
        width: 150
    },
]

function Profiles(){
    const [rows, setRows] = useState([])
    useEffect(()=>{
        retrieveProfiles()
        .then(res=>{
            setRows(res.data)
        })
    },[])
    return (
        <Box sx={{backgroundColor: '#fff'}}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination:{
                        paginationModel:{
                            pageSize: 10
                        }
                    }
                }}
                pageSizeOptions={[5, 10, 20, 30, 50, 100]}
                disableRowSelectionOnClick
            />
        </Box>
    )
}

export default Profiles