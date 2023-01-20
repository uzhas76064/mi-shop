import {openModal, closeModal} from './modals.module'

export const doAuth = () => {
    const authBtn = document.getElementById('open-auth-btn')
    const modal = document.getElementById('auth-modal')
    const closeBtn = modal.querySelectorAll('.close')
    const loginBtn = modal.querySelector('.login-btn')
    const cartBtn = document.querySelector('.cart-btn')
    const logoutBtn = document.querySelector('.logout-btn')
    const cartModal = document.querySelector('#cart-modal')

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

    const login = () => {
        authBtn.style.display = 'none'
        cartBtn.classList.remove('d-none')
        logoutBtn.classList.remove('d-none')
        closeModal(modal)
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

    authBtn.addEventListener('click', () => {
        openModal(modal)
    })

    closeBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
            closeModal(modal)
        })
    })

    cartBtn.addEventListener('click', () => {
        openModal(cartModal)
    })

    checkAuth()
}