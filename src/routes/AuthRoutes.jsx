import MinimalLayout from "../components/layouts/MinimalLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

const AuthRoutes = [{
    path: '/',
    element: <MinimalLayout/>,
    children: [
        {
            path: '/login',
            element: <Login/>
        },
        {
            path: '/register',
            element: <Register/>
        }
    ]
}]

export default AuthRoutes