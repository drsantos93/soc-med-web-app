import MainLayout from "../components/layouts/MainLayout"
const MainRoutes = {
    path: '/',
    element: <MainLayout/>,
    children:[
        {
            path: "",
            element: <Dashboard/>
        },
        {
            path: "/profiles",
            element: <Profiles/>
        }
    ]
}

export default MainRoutes