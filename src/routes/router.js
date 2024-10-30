import { createBrowserRouter } from "react-router-dom"
import AdminRoutes from "./AdminRoutes"
import MainRoutes from "./MainRoutes"

const router = createBrowserRouter([...AdminRoutes, ...MainRoutes])

export default router