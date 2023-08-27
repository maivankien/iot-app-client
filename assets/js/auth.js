import config from '../../common/config/domain.js'

document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem('token')
    const body = document.querySelector('body')
    if (!token) {
        window.location.href = '/pages/login/login.html'
    } else {
        let url = config.apiDomain + '/api/user/initLogin'
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'authorization': "Bearer " + token
            }
        })
        const result = await response.json()
        const status = response.status
        if (status == 401) {
            window.location.href = '/pages/login/login.html'
        }
        else {
            body.style.display = 'block'
        }
    }
})
