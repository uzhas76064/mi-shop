export const openModal = (modal) => {
    modal.classList.add('d-block')
    modal.classList.remove('d-none')
    setTimeout(() => {
        modal.classList.add('show')
    }, 100)
}

export const closeModal = (modal) => {

    setTimeout(() => {
        modal.classList.remove('d-block')
    }, 500)
}