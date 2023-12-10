import React from "react"
import instance from "../common/api/api"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import MESSAGE_AUTH from "../common/constants/messages/auth"
import { showToast } from "../components/Toast"

const Register = () => {
    useEffect(() => {
        document.title = 'Tạo tài khoản'
    })
    const [inputs, setInputs] = useState({
        username: "",
        secret: "",
        password: "",
        confirmPassword: ""
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (inputs.password !== inputs.confirmPassword) {
            return showToast("error", MESSAGE_AUTH.PASSWORD_NOT_MATCH)
        }
        try {
            await instance.post("/user/register", inputs)
            navigate("/login")
        } catch (err) {
            const { status, data } = err.response
            const message = MESSAGE_AUTH[status] || data.message
            showToast("error", message)
        }
    }

    return (
        <div className="auth">
            <h1>Tạo tài khoản</h1>
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
                <input
                    required
                    type="password"
                    placeholder="Nhập lại mật khẩu"
                    name="confirmPassword"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Mã bí mật"
                    name="secret"
                    onChange={handleChange}
                />
                <button onClick={handleSubmit}>Tạo tài khoản</button>
                <span>
                    Bạn đã có tài khoản? <Link to="/login"> Đăng nhập</Link>
                </span>
            </form>
        </div>
    )
}

export default Register
