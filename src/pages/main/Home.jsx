import { Typography, Box, Card, Button, CardHeader, Avatar, CardMedia, CardContent, ListItem, List, CardActions, TextField } from "@mui/material"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { AddComment, DMLPosts, getPosts } from "../../api/posts"
import $ from 'jquery'
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import CustomModal from "../../components/Modal"
import CustomInput from "../../components/Input"

export default function Home(){
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState()
    const [currentItem, setCurrentItem] = useState({})
    const [open, setOpen] = useState(false)
    const postRef = useRef([])
    const user = useSelector(state=>state.auth.user)

    // for re-rendering
    // useEffect(()=>{
    //     console.log("[1] Hello useEffect")
    // },[])

    // for onload
    // nauuna eto vs. useEffect()
    useLayoutEffect(()=>{
        getPosts(page).then(res=>{
            setPosts(res.data)
            setTotalPages(res.total_pages)
        })

        // on scroll functionality removed because it does not work when the page is zoomed in or zoomed out
        // replaced with "Load More function" button
    },[])


    //on reactJS hot reload this will always execute
    // this will not execute when you don't even change anything here in this file
    useEffect(()=>{
        console.log('hello')
        if(page !== 1){
            
            
            getPosts(page).then(res=>{
            
                const loadedPosts = [...posts]
                res.data?.map((item)=>{
                    loadedPosts.push(item)
                })

                setPosts(loadedPosts)
                console.log(res)
            })
        }
    },[page])


    const openModal = () =>{
        setOpen(true)
    }

    const closeModal = () =>{
        setOpen(false)
    }

    const handleCommentSend = () =>{
       
         //not recorded, but here it is the comment function
        if(currentItem.id !== undefined){
            AddComment({comment:currentItem.comment, post:currentItem.id, created_by: user?.user_id})
            .then(res=>{
                toast.success(`Commented to ${currentItem.created_by?.username} post`)
            }).finally(()=>{
                setCurrentItem({})
                $(`#commentfor${currentItem.id}`).val("")
                // for last page
                if(page === totalPages){
                    getPosts().then(res=>{
                        setPosts(res.data)
                        console.log(res.data)
                    })
                }else{
                    // for not last page; for loaded pages
                    // lol, this will kill performance, but whatever
                    for(let p = 1; p <= page; p++){
                    
                        getPosts(p).then(res=>{
                            if(p === 1){
                                setPosts(res.data)
                            }else{
                                const prevData = [...posts]
                                prevData.push(res.data)
                                setPosts(prevData)
                            }
                        })
                    }
                    
                }
            })
        }else{
            toast.error("Empty Comment")
        }
        
    }

    const handleCommentChange = (item, e) =>{
        const currentItem = item
        currentItem.comment = e.target.value
        setCurrentItem(currentItem)
    }

    const loadMore = () =>{
        // not optimized because I forgor how to do it
        if(page <= totalPages){
            setPage(page + 1)
        }
    }

    const AddPost = () =>{
        const postDesc = postRef.current[0].value
        const media = postRef.current[1].value
        
        DMLPosts("POST",{created_by: user.user_id, description: postDesc, media_link: media}).then(res=>{
            console.log(res)
            if(res.ok){
                getPosts(page).then(res=>{
                    setPosts(res.data)
                    setTotalPages(res.total_pages)
                })
                closeModal()
                toast.success('Post successfully created!',{position: 'top-center'})
            }else{
                toast.error('Something went wrong!',{position: 'top-center'})
            }
        })
    }

    return(
        <Box sx={{flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: 2}}>
            <Box sx={{flex: 1, maxHeight: '50px'}}>
                {/* buttons here */}
                <CustomModal
                    buttonText="Add Post"
                    open={open}
                    handleOpen={() => openModal("add",null)} 
                    handleClose={() => closeModal()}
                    btnSx={{ml: 2, color: 'white', fontWeight: 'bold', float: 'right'}}
                >
                    <Typography 
                        variant="h3" 
                        bgcolor="#3079e6"
                        sx={{flex: 1, textAlign:'center',color: 'white',p: 2, width: '100%'}}
                    >
                        Add a Post
                    </Typography>
                    <CustomInput
                            required
                            sx={{width: '90%'}}
                            multiline
                            rows={5}
                            variant="outlined"
                            label="Post Body"
                            inputRef={el=>postRef.current[0] = el}
                        />
                        <CustomInput
                            required
                            sx={{width: '90%'}}
                            variant="outlined"
                            label="Media Link"
                            inputRef={el=>postRef.current[1] = el}
                        />
               

                   <Button onClick={AddPost} variant="contained" color="success" fullWidth>Post Now!</Button>
                </CustomModal>
            </Box>
            <Box id="Posts" sx={{display: 'flex',alignItems: 'center',flexDirection:'column', gap: 2,maxHeight: '100%', width: '100%'}}>
                {
                    posts ?
                    posts.map((item, index)=>(
                        <Card sx={{flex: 1,minHeight: 0, width: '100%'}} key={index}>
                            <CardHeader 
                                avatar={
                                    <Avatar sx={{bgcolor: 'red'}}>
                                        {item.created_by?.first_name.substring(0,1).toUpperCase()}{item.created_by?.last_name.substring(0,1).toUpperCase()}
                                    </Avatar>
                                }
                                title={`${item.created_by?.first_name} ${item.created_by?.last_name} posted`}
                                subheader={new Date(item.created_at).toLocaleString('en-US', {month: 'long', day: '2-digit', year: 'numeric'})}
                            />
                            <CardContent>
                                <Typography variant="body1">
                                    {item.description}
                                </Typography>
                            </CardContent>
                            {
                                item.media_link ? 
                                <CardMedia
                                    component="img"
                                    height="300px"
                                    width="100%"
                                    sx={{objectFit: 'contain'}}
                                    src={item.media_link ?? 'https://img.freepik.com/premium-photo/empty-yellow-note-with-black-pin-white-yellow-background-blank-yellow-sticky-note_486333-1870.jpg'}
                                    alt="Picture of post"
                                /> 
                                : null
                            }
                            
                            {/* card content for comment section */}
                            <CardContent sx={[
                                {borderTop: '1px solid gray',minHeight:0, overflow: 'auto'},
                                item?.media_link ? {minHeight: '400px',maxHeight: '400px'} : {minHeight: '700px',maxHeight: '700px'}
                            ]}>
                                <List sx={{flex: 1, width: '100%',minHeight: 0}} >
                                {
                                    item.post_comment?.toReversed().map((comment, cIndex)=>(
                                        <ListItem key={cIndex}>
                                            <Card sx={{width: '100%'}}>
                                                <CardHeader 
                                                    avatar={
                                                        <Avatar sx={{bgcolor: 'red'}}>
                                                            {comment.created_by?.first_name.substring(0,1).toUpperCase()}{comment.created_by?.last_name.substring(0,1).toUpperCase()}
                                                        </Avatar>
                                                    }
                                                    title={`${comment.created_by?.first_name} ${comment.created_by?.last_name} commented`}
                                                    subheader={new Date(comment.created_at).toLocaleString('en-US', {month: 'long', day: '2-digit', year: 'numeric'})}
                                                />
                                                
                                                <CardContent>
                                                        <Typography variant="body1">
                                                            {comment.comment}
                                                        </Typography>
                                                </CardContent>
                                            </Card>
                                        </ListItem>
                                    ))
                                }
                                </List>
                            </CardContent>
                            <CardActions sx={{display: 'flex', flexDirection: 'column', alignItems: 'start', p: 2}}>
                                <Box>
                                    <Typography variant="h5">Comment:</Typography>
                                </Box>
                                <Box sx={{flex: 1,width: '100%',minHeight:0}}>
                                    {/* comment textarea */}
                                    <TextField id={`commentfor${item.id}`} fullWidth multiline rows={5} 
                                    onChange={e => handleCommentChange(item,e)}/>
                                </Box>
                                <Box sx={{flex:1,mt: 2,width: '100%', display: 'block',minHeight:0}}>
                                    <Button variant="contained" sx={{fontSize: '12pt',float: 'right'}} onClick={() => handleCommentSend()}>Send Comment</Button>
                                </Box>
                            </CardActions>
                        </Card>
                    ))
                    : null
                }
                <Button onClick={()=>loadMore()} disabled={page === totalPages} fullWidth>
                    {
                        page === totalPages ? "Nothing to load" : "Load More"
                    }
                    
                </Button>
            </Box>
        </Box>
    )
}