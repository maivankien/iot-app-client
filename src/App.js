import {
    Outlet,
    RouterProvider,
    createBrowserRouter,
} from "react-router-dom"
import "./css/main.css"
import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Register from "./pages/Register"
import NotFound from "./pages/NotFound"
import { ToastContainer } from 'react-toastify';


const Layout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
])

function App() {
    return (
        <div className="app">
            <div className="container">
                <ToastContainer />
                <RouterProvider router={router} />
            </div>
        </div>
    )
}

export default App
