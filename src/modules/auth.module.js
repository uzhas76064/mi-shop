export const doAuth = () => {
    const authBtn = document.getElementById('open-auth-btn')
    const modal = document.getElementById('auth-modal')
    const closeBtn = modal.querySelectorAll('.close')
    const loginBtn = modal.querySelector('.login-btn')
    const cartBtn = document.querySelector('.cart-btn')
    const logoutBtn = document.querySelector('.logout-btn')

    const saveAuth = () => {
        const loginInput = modal.querySelector('#login-control')
        const passwordInput = modal.querySelector('#password-control')

        let user = {
            login: loginInput.value,
            password: passwordInput.value
        }

        localStorage.setItem('auth', JSON.stringify(user))
    }

    const checkAuth = () => {
        if (JSON.parse(localStorage.getItem('auth')))
            login()
    }

    const openModal = () => {
        modal.classList.add('d-block')
        modal.classList.remove('d-none')
        setTimeout(() => {
            modal.classList.add('show')
        }, 100)
    }

    const closeModal = () => {
        modal.classList.add('d-none')
        setTimeout(() => {
            modal.classList.add('hide')
        }, 500)
    }

    const login = () => {
        authBtn.style.display = 'none'
        cartBtn.classList.remove('d-none')
        logoutBtn.classList.remove('d-none')
        closeModal()
    }

    const logout = () => {
        localStorage.removeItem('auth')
        authBtn.style.display = 'block'
        cartBtn.classList.add('d-none')
        logoutBtn.classList.add('d-none')
    }

    loginBtn.addEventListener('click', () => {
        saveAuth()
        login()
    })
    logoutBtn.addEventListener('click', logout)

    authBtn.addEventListener('click', openModal)

    closeBtn.forEach((btn) => {
        btn.addEventListener('click', closeModal)
    })

    checkAuth()
}