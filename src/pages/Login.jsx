import "../css/auth.css"
import { useContext } from "react"
import React, { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { AuthContext } from "../common/context/authContext"
import MESSAGE_AUTH from "../common/constants/messages/auth"
import { showToast } from "../components/Toast"


const Login = () => {
    useEffect(() => {
        document.title = 'Đăng nhập'
    })
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    })

    const { login } = useContext(AuthContext)

    const [searchParams] = useSearchParams()

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await login(inputs)
            const continute = searchParams.get("continue")

            return window.location.assign(continute || "/")
        } catch (err) {
            const { status, data } = err.response
            const message = MESSAGE_AUTH[status] || data.message
            showToast("error", message)
        }
    }
    return (
        <div className="auth">
            <h1>Đăng nhập</h1>
            <form>
                <input
                    required
                    type="text"
                    placeholder="Tên đăng nhập"
                    name="username"
                    onChange={handleChange}
                />
                <input
                    required
                    type="password"
                    placeholder="Mật khẩu"
                    name="password"
                    onChange={handleChange}
                />
                <button onClick={handleSubmit}>Đăng nhập</button>
                <span>
                    Bạn chưa có tài khoản? <Link to="/register">Tạo tài khoản</Link>
                </span>
            </form>
        </div>
    )
}

export default Login