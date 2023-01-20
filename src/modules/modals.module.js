export const openModal = (modal) => {
    document.body.insertAdjacentHTML("beforeend",
        `<div class="modal-backdrop fade show"></div>`
        )

    modal.classList.add('d-block')
    modal.classList.remove('d-none')
    setTimeout(() => {
        modal.classList.add('show')
    }, 100)
}

export const closeModal = (modal) => {
    const layout = document.querySelector('.modal-backdrop')
    modal.classList.add('d-none')
    layout && layout.classList.remove('show')
    setTimeout(() => {
        modal.classList.remove('d-block')
    }, 500)
}