import {Box,Dialog,CssBaseline} from "@mui/material"
import Loader from '../assets/loading.svg'

const Loading = ({open}) =>{
    return (
        <Dialog
            fullScreen
            open={open}
            PaperProps={{
                style:{
                    backgroundColor: 'transparent',
                    boxShadow: 'none'
                }
            }}
        >
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 'auto'}}>
                <CssBaseline/>
                <img src={Loader} />
            </Box>
        </Dialog>
    )
}

export default Loading