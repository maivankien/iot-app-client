import instance from "../api/api.js"
import { createContext, useEffect, useState } from "react"

export const AuthContext = createContext()

export const AuthContexProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    )
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const login = async (inputs) => {
        const { data } = await instance.post("/user/login", inputs)
        setCurrentUser(data)
        setIsAuthenticated(true)
    }

    const logout = async () => {
        setCurrentUser(null)
        setIsAuthenticated(false)
    }

    const initLogin = async () => {
        if (!currentUser) return false

        try {
            const { data } = await instance.post("/user/init-login")
            setCurrentUser(data)
            setIsAuthenticated(true)
            return true
        } catch (error) {
            return false
        }
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout, initLogin, isAuthenticated, setIsAuthenticated, setCurrentUser }}>
            {children}
        </AuthContext.Provider>
    )
}

