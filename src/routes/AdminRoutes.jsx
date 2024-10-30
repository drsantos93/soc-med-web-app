import MainLayout from "../components/layouts/MainLayout"
import Dashboard from "../pages/Dashboard"
import Profiles from "../pages/Profiles"
const AdminRoutes = [
    {
        path: '/admin/',
        element: <MainLayout/>,
        children:[
            {
                path: "",
                element: <Dashboard/>
            },
            {
                path: "/admin/profile",
                element: <Profiles/>
            }
        ]
    }
]

export default AdminRoutes