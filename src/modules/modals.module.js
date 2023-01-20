export const openModal = (modal) => {
    modal.classList.add('d-block')
    modal.classList.remove('d-none')
    setTimeout(() => {
        modal.classList.add('show')
    }, 100)
}

export const closeModal = (modal) => {
    modal.classList.add('d-none')
    setTimeout(() => {
        modal.classList.add('hide')
    }, 500)
}