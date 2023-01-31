import {getData} from "./api.module";

export const categoriesFunc = () => {
    const render = (data) => {
        const container = document.getElementById('categories-container')
        data.forEach((item) => {
            container.insertAdjacentHTML('beforeend',
                ` <div class="col col-12 col-md-6 col-lg-4 mb-3">
                            <a href="/catalog.html?id=${item.id}" class="card-link">
                                <div class="card">
                                    <img src="${item.preview}" class="card-img-top" alt="phones"/>
                                    <div class="card-body">
                                        <h5 class="card-title">${item.name}</h5>
                                    </div>
                                </div>
                            </a>
                        </div>`
            )
        })
    }

    getData('/categories')
        .then((data) => {
            render(data)
        })
        .catch(() => {
            console.error('Произошла ошибка')
        })
}