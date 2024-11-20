import { Box, FormControl, IconButton, InputAdornment, Button, Typography } from "@mui/material";
import Loading from "../../components/Loading";
import { useRef, useState } from "react";
import CustomInput from '../../components/Input';
import ReactImg from '../../assets/react.svg'
import { AccountCircle, Visibility, VisibilityOff,Lock, Mail, Badge } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../api/auth";
import {setUser} from '../../redux/slice'
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";


export default function Register(){
    const regRef = useRef([])
    const dispatch = useDispatch()
    const nav = useNavigate()

    const [loading, setLoading] = useState(false)
    const [showPassword,setShowPassword] = useState(false)
    const [showConfPassword, setShowConfPassword] = useState(false)

    const handleClickShowPassword = () => setShowPassword((show)=>!show)
    const handleClickShowConfPassword = () => setShowConfPassword((show) => !show)

    const handleMouseDownPass = (event) =>{
        event.preventDefault()
    }

    const handleMouseUpPassword = (event) =>{
        event.preventDefault()
    }

    const handleRegister = (e) =>{
        e.preventDefault()
        const usern = regRef.current[0].value
        const pass = regRef.current[1].value
        const passc = regRef.current[2].value
        const email = regRef.current[3].value
        const fname = regRef.current[4].value
        const lname = regRef.current[5].value

        // check if password and confirm password is equal
        if(pass === passc){
            //then register
            registerUser({
                username: usern,
                email: email,
                first_name: fname,
                last_name: lname,
                password: pass,
                password_confirmation: passc
            }).then(res=>{
                if(res.ok){
                    toast.success("Registration successful! You can now log in to your account.")
                    nav('../login')
                }else{
                    for(const [test,value] of Object.entries(res.data)){
                        toast.error(value[0])
                    }
                }
            }).catch(e=>{
                toast.error(e)
            })
        }else{
            //password and confirm password is not equal
            toast.error("Password and confirm password does not match!!!!!!")
        }
    }


    return (
        <Box sx={{flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center',alignItems: 'center', flexWrap: 'wrap', gap: 2}}>
          
            <Loading open={loading} />
            <Box component='form' onSubmit={handleRegister} sx={{bgcolor: '#fbfcf8', width: '500px', p: 4, borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, flexWrap: 'wrap'}}>
                <Typography variant="h4">New User Registration</Typography>
                <CustomInput
                    required
                    fullWidth
                    variant="outlined"
                    label="Username"
                    slotProps={{
                        input:{
                            startAdornment:(
                                <InputAdornment position="start">
                                    <AccountCircle/>
                                </InputAdornment>
                            )
                        }
                    }}
                    inputRef={el=>regRef.current[0] = el}
                />
                <FormControl fullWidth>
                    <CustomInput
                        required
                        fullWidth
                        variant="outlined"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        slotProps={{
                            input:{
                                startAdornment:(
                                    <InputAdornment position="start">
                                        <Lock/>
                                    </InputAdornment>
                                ),
                                endAdornment:(
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPass}
                                            onMouseUp={handleMouseUpPassword}
                                        >
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }
                        }}
                        inputRef={el=>regRef.current[1] = el}
                    />
                </FormControl>
                <FormControl fullWidth>
                    <CustomInput
                        required
                        fullWidth
                        variant="outlined"
                        label="Confirm Password"
                        type={showConfPassword ? 'text' : 'password'}
                        slotProps={{
                            input:{
                                startAdornment:(
                                    <InputAdornment position="start">
                                        <Lock/>
                                    </InputAdornment>
                                ),
                                endAdornment:(
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowConfPassword}
                                            onMouseDown={handleMouseDownPass}
                                            onMouseUp={handleMouseUpPassword}
                                        >
                                            {showConfPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }
                        }}
                        inputRef={el=>regRef.current[2] = el}
                    />
                </FormControl>
                <CustomInput
                    required
                    fullWidth
                    type="email"
                    variant="outlined"
                    label="Email"
                    slotProps={{
                        input:{
                            startAdornment:(
                                <InputAdornment position="start">
                                    <Mail/>
                                </InputAdornment>
                            )
                        }
                    }}
                    inputRef={el=>regRef.current[3] = el}
                />

                <CustomInput
                    required
                    fullWidth
                    variant="outlined"
                    label="First Name"
                    slotProps={{
                        input:{
                            startAdornment:(
                                <InputAdornment position="start">
                                    <Badge/>
                                </InputAdornment>
                            )
                        }
                    }}
                    inputRef={el=>regRef.current[4] = el}
                />
                <CustomInput
                    required
                    fullWidth
                    variant="outlined"
                    label="Last Name"
                    slotProps={{
                        input:{
                            startAdornment:(
                                <InputAdornment position="start">
                                    <Badge/>
                                </InputAdornment>
                            )
                        }
                    }}
                    inputRef={el=>regRef.current[5] = el}
                />

                <Button type="submit" variant="contained" fullWidth>Register</Button>
            </Box>
            <Box sx={{width: '500px', p: 4, borderRadius: '50px', bgcolor: '#fbfcf8',minHeight: 0}}>
                <Link to="../login">
                    <Typography textAlign='center'>Back to Login</Typography>
                </Link>
            </Box>
        </Box>
    )
}