import MainLayout from '../components/layouts/MainLayout'
import Home from '../pages/main/Home'
import Explore from '../pages/main/Explore'
import Inbox from '../pages/main/Inbox'

const MainRoutes = [
    {
        path: '/',
        element: <MainLayout/>,
        children:[
            {
                path: "",
                element: <Home/>
            },
            {
                path: "/explore",
                element: <Explore/>
            },
            {
                path: "/inbox",
                element: <Inbox/>
            }
        ]
    }
]

export default MainRoutes