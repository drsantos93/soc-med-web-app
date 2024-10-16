import MainLayout from "../components/layouts/MainLayout"
import Dashboard from "../pages/Dashboard"
const MainRoutes = {
    path: '/',
    element: <MainLayout/>,
    children:[
        {
            path: "",
            element: <Dashboard/>
        },
    ]
}

export default MainRoutes