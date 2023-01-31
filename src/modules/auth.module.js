import {openModal, closeModal} from './modals.module'
import {getData} from "./api.module";

export const doAuth = () => {
    const authBtn = document.getElementById('open-auth-btn')
    const modal = document.getElementById('auth-modal')
    const closeBtn = modal.querySelectorAll('.close')
    const loginBtn = modal.querySelector('.login-btn')
    const cartBtn = document.querySelector('#open-cart-btn')
    const logoutBtn = document.querySelector('.logout-btn')
    const cartModal = document.querySelector('#cart-modal')

    const saveAuth = () => {
        const loginInput = modal.querySelector('#login-control')
        const passwordInput = modal.querySelector('#password-control')


        getData('/profile').then(data => {
            console.log(data)
            if (data.login === loginInput.value && data.password === passwordInput.value) {
                login()
                localStorage.setItem('auth', JSON.stringify(data))
            }
            else {
                alert('Введены неверные данные')
                logout()
            }

        })
    }

    const checkAuth = () => {
        const user = JSON.parse(localStorage.getItem('auth'))

        if(user) {
            getData('/profile').then(data => {
                console.log(data)
                if (data.login === user.login && data.password === user.password) {
                    login()
                }
            })
        }
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