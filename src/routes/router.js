import { createBrowserRouter } from "react-router-dom"
import AdminRoutes from "./AdminRoutes"
import MainRoutes from "./MainRoutes"
import AuthRoutes from "./AuthRoutes"

const router = createBrowserRouter([...AdminRoutes, ...MainRoutes, ...AuthRoutes],
    {
        future:{
            v7_fetcherPersist: true,
            v7_normalizeFormMethod: true,
            v7_partialHydration: true,
            v7_relativeSplatPath: true,
            v7_skipActionErrorRevalidation: true
        }
    }
)

export default router