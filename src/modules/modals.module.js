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
    modal.classList.remove('show')
    layout && layout && layout.classList.remove('show')
    layout.classList.add('d-none')

    setTimeout(() => {
        modal.classList.remove('d-block')
        layout &&  layout.classList.remove()
    }, 500)
}