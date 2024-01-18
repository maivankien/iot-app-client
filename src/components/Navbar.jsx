import "../css/navbar.css"
import React, { useContext } from "react"
import { AuthContext } from "../common/context/authContext"
import { useNavigate, useLocation, Link } from 'react-router-dom'
import Logo from "../common/constants/images/logo.png"

const Navbar = () => {
    const location = useLocation()
    const { state } = location
    const navigate = useNavigate()
    const { setCurrentUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext)
    const isAuth = state?.isAuthenticated ? state.isAuthenticated : isAuthenticated


    const logout = () => {
        setCurrentUser(null)
        setIsAuthenticated(false)
        navigate("/login", { state: null })
    }

    return (
        <div>
            {isAuth ? (
                <div className="navbar">
                    <div className="container">
                        <div className="logo">
                            <Link to="/">
                                <img src={Logo} alt="Logo" />
                            </Link>
                        </div>
                        <div className="links">
                            <Link className={`link`} to="/">
                                <h6>Home</h6>
                            </Link>
                            <Link className={`link`} to="?page=monitor">
                                <h6>Theo dõi</h6>
                            </Link>
                            <Link className={`link`} to="/report">
                                <h6>Báo cáo</h6>
                            </Link>
                        </div>
                        <span className="logout" onClick={logout}>
                            Đăng xuất
                        </span>
                    </div>
                </div>
            ) : ''}
        </div>
    );
}

export default Navbar
