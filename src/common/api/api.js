import dotenv from 'dotenv'
import axios from 'axios'
dotenv.config()

const user = JSON.parse(localStorage.getItem("user")) || {}
const token = user.token || ""

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
})


export default instance



