import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {reset, setUser} from '../../redux/slice'
import { jwtDecode } from "jwt-decode";
// api for verifying token 
import { verifyToken } from "../../api/auth";

export default function AdminAuth(WrappedComponent){
    return () =>{
        const nav = useNavigate()
        const dispatch = useDispatch()
        const user = sessionStorage.getItem('user')

        useEffect(()=>{
            if(!user){
                dispatch(reset())
                sessionStorage.clear()
                nav('../login')
                
            }else{
                //logged in user
                console.log("hello")
                verifyToken(user).then(res=>{
                    if(res){
                        const userman = jwtDecode(user)
                        if(userman.user_id === 1){
                            dispatch(setUser(userman))
                        }else{
                            nav("../")
                        }
                    }else{
                        dispatch(reset())
                        sessionStorage.clear()
                        nav("../login")
                    }
                })
            }
        },[]) //useEffect
        return <WrappedComponent/>
    }
}