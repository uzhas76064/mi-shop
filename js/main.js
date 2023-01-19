const authBtn = document.getElementById('open-auth-btn')
const modal = document.getElementById('auth-modal')
const closeBtn = modal.querySelectorAll('.close')
const loginBtn = modal.querySelector('.login-btn')
const cartBtn = document.querySelector('.cart-btn')
const logoutBtn = document.querySelector('.logout-btn')

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
    authBtn.style.display = 'block'
    cartBtn.classList.add('d-none')
    logoutBtn.classList.add('d-none')
}

loginBtn.addEventListener('click', login)
logoutBtn.addEventListener('click', logout)

authBtn.addEventListener('click', openModal)

closeBtn.forEach((btn) => {
    btn.addEventListener('click', closeModal)
})