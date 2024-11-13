import { Box, Typography } from "@mui/material";

export default function Register(){
    return (
        <Box sx={{flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center',alignItems: 'center', flexWrap: 'wrap', gap: 2}}>
            <Typography variant="h1">
                Hello, I am Registration form
            </Typography>
        </Box>
    )
}