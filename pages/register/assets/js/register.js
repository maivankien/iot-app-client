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
    if (data.password !== data["confirm-password"]) {
        ShowError("Mật khẩu không khớp. Vui lòng thử lại")
        return
    }
    try {
        button.classList.add('btn-opacity')
        let url = config.apiDomain + '/api/user/register'
        let result = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const status = result.status
        const response = await result.json()
        if (status == 201) {
            localStorage.setItem('token', response.token)
            
        } else if (status == 403) {
            if (response.message == "Forbidden") {
                ShowError("Khóa bí mật không đúng vui lòng thử lại")
            } else {
                ShowError("Tài khoản đã tồn tại")
            }
        } else {
            ShowError("Có lỗi xảy ra. Vui lòng thử lại")
        }
        button.classList.remove('btn-opacity')
    } catch (error) {
        ShowError("Có lỗi xảy ra. Vui lòng thử lại")
        button.classList.remove('btn-opacity')
        console.error(error)
    }
})
