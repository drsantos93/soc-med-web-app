import { Typography, Box, Card, Button, CardHeader, Avatar, CardMedia, CardContent, ListItem, List } from "@mui/material"
import { useEffect, useLayoutEffect, useState } from "react"
import { getPosts } from "../../api/posts"

export default function Home(){
    const [posts, setPosts] = useState([])

    // for re-rendering
    // useEffect(()=>{
    //     console.log("[1] Hello useEffect")
    // },[])

    // for onload
    // nauuna eto vs. useEffect()
    useLayoutEffect(()=>{
       getPosts().then(res=>{
        console.log(res.data)
        setPosts(res.data)
       })
    },[])

    return(
        <Box sx={{flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: 2}}>
            <Box sx={{flex: 1, maxHeight: '50px'}}>
                {/* buttons here */}
                <Button sx={{float: 'right'}} variant="contained" color="success">Add Post</Button>
            </Box>
            <Box sx={{display: 'flex',flexDirection:'column', gap: 2}}>
                {
                    posts.map((item, index)=>(
                        <Card sx={{flex: 1}} key={index}>
                            <CardHeader 
                                avatar={
                                    <Avatar sx={{bgcolor: 'red'}}>
                                        {item.created_by.username.substring(0,1)}
                                    </Avatar>
                                }
                                title={`${item.created_by.username} posted`}
                                subheader={new Date(item.created_at).toLocaleString('en-US', {month: 'long', day: '2-digit', year: 'numeric'})}
                            />
                            <CardMedia
                                component="img"
                                height="50%"
                                src={item.media_link ?? 'https://img.freepik.com/premium-photo/empty-yellow-note-with-black-pin-white-yellow-background-blank-yellow-sticky-note_486333-1870.jpg'}
                                alt="Picture of post"
                            />
                            <CardContent>
                                    <Typography variant="body1">
                                        {item.description}
                                    </Typography>
                            </CardContent>
                            <CardContent sx={{borderTop: '1px solid gray',maxHeight: '50vh', overflow: 'auto'}}>
                                <List sx={{flex: 1, width: '100%'}} >
                                {
                                    item.post_comment.map((comment, cIndex)=>(
                                        <ListItem key={cIndex}>
                                            <Card sx={{width: '100%'}}>
                                                <CardHeader 
                                                    avatar={
                                                        <Avatar sx={{bgcolor: 'red'}}>
                                                            {comment.created_by}
                                                        </Avatar>
                                                    }
                                                    title={`${comment.created_by} commented`}
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
                        </Card>
                    ))
                }
            </Box>
        </Box>
    )
}