import { RouterProvider } from 'react-router-dom'
import router from './routes/router'
import { ThemeProvider } from '@emotion/react'
import theme from './theme'
import './App.css'


export default function App() {
  
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router}/>
    </ThemeProvider>
  )
}

