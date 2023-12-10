import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { AuthContext } from "../common/context/authContext"


const Home = () => {
    document.title = 'Home'
    const location = useLocation()
    const { state } = location
    const navigate = useNavigate()
    const { currentUser, initLogin } = useContext(AuthContext)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const checkAuthentication = async () => {
            if (state?.isAuthenticated) {
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
    }, [])
    return (
        <div>
            {isAuthenticated ?
                (
                    <div></div>
                )
                : ''}
        </div>
    )
}

export default Home
