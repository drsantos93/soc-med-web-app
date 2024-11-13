import {URL} from './connection'

export const verifyToken = async(accessToken)=>{
    const res = await fetch(`${URL}/token/verify/`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({token: accessToken})
    })
    const ret = await res.json()
    //ret with value == token is unverified
    //ret without value == token is verified
    if(ret.detail){
        return false
    }

    return true
}

export const loginUser = async(inputs) =>{
   const res = await fetch(`${URL}/login/`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputs)
   })
   return await res.json()
}

export const registerUser = async(inputs) =>{
    const res = await fetch(`${URL}/users/`,{
         method: 'POST',
         headers: {
            Accept: 'application/json',
             'Content-Type': 'application/json'
         },
         body: JSON.stringify(inputs)
    })
    return await res.json()
 }