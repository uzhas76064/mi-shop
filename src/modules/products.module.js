import {getData, postData} from "./api.module";
const hashGenerator = require('hash-generator')

export const productsFunc = () => {
    const container = document.getElementById('products-container')

    const render = (data) => {
        console.log(data)
        data.forEach((item) => {

            container.insertAdjacentHTML('beforeend',
                `  <div class="col col-12 col-sm-6 col-lg-4 col-xl-3 mb-3">
                            <a href="#" class="card-link">
                                <div class="card">
                                    <img src="${item.preview}" class="card-img-top" alt="phone-1">
                                    <div class="card-body">
                                        <span class="mb-2 d-block text-secondary">${item.categoryName}</span>
                                        <h6  class="card-title mb-3">${item.productName}</h6>

                                        <div class="row">
                                            <div class="col d-flex align-itemns-center justify-content-between">
                                                <h4>${item.price}</h4>
                                                <button type="button" class="add-to-cart btn btn-outline-dark">
                                                    <img src="images/icon/shopping-cart-big.svg" alt="login" data-price="${item.price}" data-productName="${item.productName}" data-id="${item.id}">
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>`
            )
        })

        const addToCartBtn = document.querySelectorAll('.add-to-cart')
        //console.log(addToCartBtn)

        addToCartBtn.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                console.log(e.target.nodeName)
                console.log(e.target.dataset.id)
                const productId = e.target.dataset.id
                let count = 1;

                const cartData = {
                    id: hashGenerator(8),
                    productId,
                    name: e.target.dataset.productname,
                    count,
                    price: Number(e.target.dataset.price)
                }
                console.log(cartData)

                postData('/cart', {
                    method: 'POST',
                    body: JSON.stringify(cartData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(data => {
                    return data
                })
                count++
            })

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