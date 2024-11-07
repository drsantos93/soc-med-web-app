import {Box, TextField, Typography, Button} from "@mui/material"
import {useState,useEffect, useMemo} from 'react'
import {DataGrid} from '@mui/x-data-grid'
import { DMLProfiles, retrieveProfiles } from '../../api/profiles'
import CustomModal from "../../components/Modal"
import { toast } from "react-toastify"
import {Edit,Delete} from '@mui/icons-material'
import $ from 'jquery'

// {field: '', headerName: '' [, any css]}


function Profiles(){
    const [rows,setRows] = useState([])
    const [open, setOpen] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [selectedProfile, setSelectedProfile] = useState({})
    const columns = useMemo(()=> [
        {
            field: 'id', // backend
            headerName: 'Profile ID',  // output
            width: 150,
            fontWeight: 'bold'
        },
        {
            field: 'nickname',
            headerName: 'Nickname',
            width: 200
        },
        {
            field: 'full_name',
            headerName: "Full Name",
            width: 200
        },
        {
            field: 'bio',
            headerName: "About Me",
            flex: 1
        },
        {
            field: 'action',
            headerName: 'Actions',
            flex: 1,
            sortable: false,
            renderCell: params =>(
                <Box
                    sx={{display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'center', mt:'7px'}}
                >
                    <Button 
                        sx={{flex: 1}}
                        variant="outlined" 
                        color="primary" 
                        onClick={()=>openModal("edit", params.row)}
                     >
                        <Edit />
                    </Button>
                    <Button 
                        sx={{flex: 1}} 
                        variant="outlined" 
                        color="error"
                        onClick={()=>DeleteProfile(params.row)}
                    >
                        <Delete />
                    </Button>
                </Box>
            )
        }
    ])

    const retrieve = () =>  retrieveProfiles().then(res=>{ setRows(res.data)} )

    useEffect(()=>{
       retrieve()
    },[])

    const openModal = (type, item) =>{
        if(type === 'edit'){
            
            setEditMode(true)
            setSelectedProfile(item)
        }

        setOpen(true)
    }

    const closeModal = () =>{
        setEditMode(false)
        setSelectedProfile({})
        setOpen(false)
    }

    const AddProfile = () =>{
        // get value using jquery
        //document.getElementById
        //$("#")
        const fullName = $("#FullName").val()
        const nickname = $("#NickName").val()
        const bio = $("#Bio").val()

        //method type for adding: POST
        DMLProfiles({full_name: fullName, nickname: nickname, bio: bio}, "POST")
        .then(response=>{
            // API response returns: "ok", "data"
            if(response.ok){
                toast.success(`${fullName} Added!`)
                retrieve()
                closeModal()
            }else{
                // API response are: "ok", "message"
                toast.error(response.message ?? "Internal Server Error!")
            }
        })
    }

    const UpdateProfile = () =>{
        const fullName = $("#FullName").val()
        const nickname = $("#NickName").val()
        const bio = $("#Bio").val()

        //method type for update: PATCH
        DMLProfiles({id: selectedProfile.id,full_name: fullName, nickname: nickname, bio: bio}, "PATCH")
        .then(response=>{
            // API response returns: "ok", "data"
            if(response.ok){
                toast.success(`Profile ID: ${selectedProfile.id} Updated!`)
                retrieve()
                closeModal()
            }else{
                // API response are: "ok", "message"
                toast.error(response.message ?? "Internal Server Error!")
            }
        })
    }

    const DeleteProfile = (item) =>{
        if(confirm(`Delete Profile ${item.nickname}?`)){
            //method type for Delete: DELETE
            DMLProfiles({id: item.id}, "DELETE")
            .then(()=>{
                // delete API has no responses
                toast.success(`Profile ${item.nickname} Deleted!`)
                retrieve()
                closeModal()
              
            })
        }
    }

    return (
        <Box sx={{flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: 2}}>
            <Box m={2}>
                <Typography variant="h2" textAlign='center'>
                    Profile management
                </Typography>
            </Box>
            <Box sx={{flex: 1}}>

                <CustomModal
                    buttonText="Add" 
                    open={open} 
                    handleOpen={() => openModal("add",null)} 
                    handleClose={() => closeModal()}
                >
                    {/* Header of modal */}
                    <Typography 
                        variant="h3" 
                        bgcolor="#3079e6"
                        sx={{flex: 1, textAlign:'center',color: 'white',p: 2, width: '100%'}}
                    >
                        {editMode ? `Update Profile of ${selectedProfile.full_name}` : "Add a Profile"}
                        
                    </Typography>
                    {/* Content of Modal */}
                    <Box sx={{flex: 1,display: 'flex', flexDirection: 'column', width: '80%', gap: 2}}>
                        
                        <TextField
                            fullWidth
                            id="FullName"
                            label="Full Name"
                            variant="outlined"
                            sx={{flex: 1}}
                            defaultValue={selectedProfile.full_name ?? ''}
                        />

                        <TextField
                            fullWidth
                            id="NickName"
                            label="Nickname"
                            variant="outlined"
                            sx={{flex: 1}}
                            defaultValue={selectedProfile.nickname ?? ''}
                        />

                        <TextField
                            fullWidth
                            id="Bio"
                            label="About Me"
                            variant="outlined"
                            sx={{flex: 1}}
                            multiline
                            rows={5}
                            defaultValue={selectedProfile.bio ?? ''}
                        />

                    </Box>

                    {/* Footer of Modal */}
                    <Box sx={{flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%'}}>
                        <Button 
                            sx={{flex: 1,color: 'white', p: 2, fontSize: '16pt'}} variant="contained" 
                            color={editMode ? "primary" : "success"}
                            onClick={() => editMode ? UpdateProfile() : AddProfile()}
                        >
                            {editMode ? "Update" : "Add"}
                            
                        </Button>
                    </Box>
                </CustomModal>

                <DataGrid
                    rows={rows}
                    columns={columns}
                    sx={{m:8}}
                    initialState={{
                        pagination:{
                            paginationModel:{
                                pageSize: 10
                            }
                        }
                    }}
                    pageSizeOptions={[10, 20, 30, 50, 100]}
                    disableRowSelectionOnClick
                    disableColumnResize
                    disableAutosize
                />
            </Box>
        </Box>
    )
}

export default Profiles