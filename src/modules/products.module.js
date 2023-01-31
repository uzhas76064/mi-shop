import {getData} from "./api.module";

export const productsFunc = () => {
    const container = document.getElementById('products-container')
    console.log(container)

    const render = (data) => {
        data.forEach((item) => {
            console.log(item)

            container.insertAdjacentHTML('beforeend',
                `  <div class="col col-12 col-sm-6 col-lg-4 col-xl-3 mb-3">
                            <a href="#" class="card-link">
                                <div class="card">
                                    <img src="${item.preview}" class="card-img-top" alt="phone-1">
                                    <div class="card-body">
                                        <span class="mb-2 d-block text-secondary">${item.categoryName}</span>
                                        <h6 class="card-title mb-3">${item.productName}</h6>

                                        <div class="row">
                                            <div class="col d-flex align-itemns-center justify-content-between">
                                                <h4>${item.price}</h4>
                                                <button type="button" class="btn btn-outline-dark">
                                                    <img src="images/icon/shopping-cart-big.svg" alt="login">
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>`
            )
        })
    }

    const init = () => {
        const params = window.location.search
        const urlSearchParams = new URLSearchParams(params)
        const id = urlSearchParams.get('id')
        const url = id ? `/products?category=${id}` : `/products`

        getData(url)
            .then((data) => {
                render(data)
            })
            .catch(() => {
                console.error('Произошла ошибка')
            })
    }

    init()
}