import Report from './Report'
import Monitor from './Monitor'
import Control from '../components/Control'
import { useNavigate, useLocation, useSearchParams  } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { AuthContext } from "../common/context/authContext"


const Home = () => {
    document.title = 'Home'
    const location = useLocation()
    const { state } = location
    const navigate = useNavigate()
    const { initLogin } = useContext(AuthContext)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const [searchParams] = useSearchParams()
    const page = searchParams.get('page')

    const renderComponentByPath = (path) => {
        switch (path) {
            case '':
                return <Control />
            case 'monitor':
                return <Monitor />
            case 'report':
                return <Report />
            default:
                return <Control />
        }
    }

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
            {isAuthenticated ? renderComponentByPath(page) : ''}
        </div>
    )
}

export default Home
