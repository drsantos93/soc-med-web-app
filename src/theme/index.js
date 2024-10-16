import {createTheme} from '@mui/material'

const themeOptions = createTheme({
    palette:{
        mode: 'light',
        primary: {
            main: "#8f39e6"
        },
        secondary: {
            main: "#b8b6ba"
        },
        error:{
            main: "#e32b2b"
        }
    },
    typography:{
        fontFamily: '"Roboto", sans-serif'
    }
})

export default themeOptions