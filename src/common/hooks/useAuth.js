import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../context/authContext"

const useAuth = () => {
    const navigate = useNavigate()
    const { currentUser, initLogin } = useContext(AuthContext)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const checkAuthentication = async () => {
            if (currentUser) {
                return setIsAuthenticated(true)
            }

            const isAuthenticatedResult = await initLogin()

            if (!isAuthenticatedResult) {
                navigate('/login')
            }

            setIsAuthenticated(isAuthenticatedResult)
        }

        checkAuthentication()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser, initLogin, navigate])

    return { isAuthenticated }
}

export default useAuth
