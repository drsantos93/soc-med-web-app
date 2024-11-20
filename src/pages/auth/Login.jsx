import { Box, FormControl, IconButton, InputAdornment, Button, Typography } from "@mui/material";
import Loading from "../../components/Loading";
import { useRef, useState } from "react";
import CustomInput from '../../components/Input';
import ReactImg from '../../assets/react.svg'
import { AccountCircle, Visibility, VisibilityOff,Lock } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../api/auth";
import {setUser} from '../../redux/slice'
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

export default function Login(){
    const loginRef = useRef([])
    const dispatch = useDispatch()
    const nav = useNavigate()

    const [loading, setLoading] = useState(false)
    const [showPassword,setShowPassword] = useState(false)

    const handleClickShowPassword = () => setShowPassword((show)=>!show)

    const handleMouseDownPass = (event) =>{
        event.preventDefault()
    }

    const handleMouseUpPassword = (event) =>{
        event.preventDefault()
    }

    const handleLogin = (e) =>{
        e.preventDefault()
        const user = loginRef.current[0].value
        const pass = loginRef.current[1].value
        setLoading(true)
        loginUser({username: user, password: pass})
        .then(res=>{
            if(res.detail){
                toast.error("Incorrect Username or Password",{position: 'top-center'})
            }else{
                dispatch(setUser(jwtDecode(res.access)))
                sessionStorage.setItem('user',res.access)
                toast.success("Login Successful",{position: 'top-center'})
                nav("../")
            }
            setLoading(false)
        }).finally(()=>{
            setLoading(false)
        })
    }


    return (
        <Box sx={{flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center',alignItems: 'center', flexWrap: 'wrap', gap: 2}}>
          
            <Loading open={loading} />
            <Box component='form' onSubmit={handleLogin} sx={{bgcolor: '#fbfcf8', width: '500px', p: 4, borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, flexWrap: 'wrap'}}>
                <img src={ReactImg} width='100px' height='100px' />
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
                    inputRef={el=>loginRef.current[0] = el}
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
                        inputRef={el=>loginRef.current[1] = el}
                    />
                </FormControl>

                <Button type="submit" variant="contained" fullWidth>Login</Button>
            </Box>
            <Box sx={{width: '500px', p: 4, borderRadius: '50px', bgcolor: '#fbfcf8',minHeight: 0}}>
                <Link to="../register">
                    <Typography textAlign='center'>New User? Sign up now!</Typography>
                </Link>
            </Box>
        </Box>
    )
}