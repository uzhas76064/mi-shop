import {getData} from "./api.module";
import {closeModal, openModal} from "./modals.module";

export const cartFunc = () => {
    const cartModal = document.querySelector('#cart-modal')
    const closeBtn = cartModal.querySelectorAll('.close-btn')
    const openCartBtn = document.querySelector('#open-cart-btn')
    const container = document.getElementById('cart-container')

    let priceSum = 0

    const render = (data) => {
        container.innerHTML = ''

        data.forEach((item) => {
            console.log(item)


            container.insertAdjacentHTML('beforeend',
                `<div class="row border-bottom pb-3 pt-3">
                            <div class="col col-12 col-md-6 mb-3 mb-md-0 fs-4">
                                ${item.name}
                            </div>
                            <div
                                class="col col-12 col-md-6 fs-4 d-flex align-items-center justify-content-end flex-wrap">
                                <h4 class="me-3 d-flex align-itemns-center">${item.price} ₽</h4>
                            </div>
                       
                        </div>`

            )
        })

        let S = 0
        data.map(item => S += item.price)

        container.insertAdjacentHTML('beforeend', `
         <div class="modal-footer">
            <div class="badge bg-dark cart-totlal-price__wrapper">
                <h4 id="cart-totlal-price">${S} ₽</h4>
            </div>
            <button type="button" class="btn btn-dark">Оформить заказ</button>
            <button type="button" class="btn btn-outline-dark me-2 close-btn close" data-bs-dismiss="modal">Отмена
            </button>
        </div>`)
    }

    openCartBtn.addEventListener('click', () => {
        getData('/cart')
            .then((data) => {
                render(data)
                openModal(cartModal)
            })
            .catch(() => {
                console.error('Произошла ошибка')
            })
    })

    closeBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
            closeModal(cartModal)
        })
    })
}