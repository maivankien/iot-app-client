import config from '../../../../common/config/domain.js'
const message = document.querySelector('.message-error')
const button = document.querySelector('.btn-primary')

function ShowError(text) {
    message.textContent = text
    setTimeout(() => {
        message.textContent = ""
    }, 3000)
}

document.querySelector('.form-register').addEventListener('submit', async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const data = {}
    formData.forEach((value, key) => {
        data[key] = value
    })
    try {
        button.classList.add('btn-opacity')
        let url = config.apiDomain + '/api/user/login'
        let result = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const status = result.status
        const response = await result.json()
        console.log(response)
        if (status == 200) {
            localStorage.setItem('token', response.token)

        } else if (status == 400) {
            ShowError("Sai tài khoản hoặc mật khẩu")
        } else {
            ShowError("Có lỗi xảy ra. Vui lòng thử lại")
        }
        button.classList.remove('btn-opacity')
    } catch (error) {
        ShowError("Có lỗi xảy ra. Vui lòng thử lại")
        button.classList.remove('btn-opacity')
        console.log(error)
    }
})
