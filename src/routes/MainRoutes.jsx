import MainLayout from "../components/layouts/MainLayout"
import Dashboard from "../pages/Dashboard"
import Profiles from "../pages/Profiles"
const MainRoutes = [
    {
        path: '/',
        element: <MainLayout/>,
        children:[
            {
                path: "",
                element: <Dashboard/>
            },
            {
                path: "/profile",
                element: <Profiles/>
            }
        ]
    }
]

export default MainRoutes