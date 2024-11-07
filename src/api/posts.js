import { URL } from "./connection"

export const getPosts = async (page) => {
    const getPage = page ? `${URL}/posts/?page=${page}` : `${URL}/posts`
    const res = await fetch(getPage,{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })

    return await res.json()
}

// the posts themselves
// currently useless for now
export const DMLPosts = async (type, inputs) =>{
    const res = await fetch(`${URL}/posts/`,{
        method: type,
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputs)
    })
    return await res.json()
}

// the comments of posts
// hiwahiwalay na
export const AddComment = async (inputs) =>{
    const res = await fetch(`${URL}/addcomment/`,{
        method: 'POST',
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputs)
    })
    return await res.json()
}