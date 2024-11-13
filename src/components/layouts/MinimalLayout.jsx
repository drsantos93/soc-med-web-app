import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import CheckAuth from "../hoc/CheckAuth";

const MinimalLayout = () =>{
    return (
        <Box p={2} sx={{bgcolor: 'lightgray',height: '100vh', display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
            <Outlet/>
        </Box>
    )
}

export default CheckAuth(MinimalLayout)