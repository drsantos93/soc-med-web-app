import AdminLayout from "../components/layouts/AdminLayout"
import Dashboard from "../pages/admin/Dashboard"
import Profiles from "../pages/admin/Profiles"
const AdminRoutes = [
    {
        path: '/admin/',
        element: <AdminLayout/>,
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