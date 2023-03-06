import {deleteData, getData, postData} from "../api.module";

export const addProduct = () => {
    const titleInput = document.getElementById('product-title')
    const nameInput = document.getElementById('product-name')
    const priceInput = document.getElementById('product-price')
    const previewInput = document.getElementById('product-image')
    const saveBtn = document.getElementById('product-add-btn')
    const container = document.getElementById('product-table')
    const select = document.getElementById('product-category')

    // Данные категории для добавления
    const productData = {
        categoryName: '',
        price: '',
        productName: '',
        preview: '',
        category: 0
    }

    // рендер талицы с добавленными категориями из БД
    const render = (data) => {
        container.innerHTML = ''

        data.forEach((item, index) => {
            container.insertAdjacentHTML('beforeend',
                ` <tr>
                               <th scope="row">${index + 1}</th>
                                    <td>${item.categoryName}</td>
                                     <td>${item.productName}</td>
                                     <td>${item.price} ₽</td>
                                     <td class="text-end">
                                      <button type="button" class="btn btn-outline-danger btn-sm" data-product="${item.id}">
                                           удалить
                                      </button>
                                </td>
                        </tr>`)
        })
    }

    const checkInputValues = () => {
        saveBtn.disabled = (titleInput.value === '' ||
            nameInput.value === '' ||
            Number(priceInput.value) === 0 ||
            previewInput.value === '' ||
            select.value === 'default')
    }

    select.addEventListener('change', () => {
        productData.category = Number(select.value)
        const url = select.value !== 'default' ?`/products?category=${productData.category}` : `/products`

        getData(url)
            .then((data) => {
                render(data)
            })
            .catch(() => {
                console.error('Произошла ошибка')
            })

        checkInputValues()
    })

    // Событие ввода имени категории
    nameInput.addEventListener('input', () => {
        productData.productName = nameInput.value
        checkInputValues()
    })

    titleInput.addEventListener('input', () => {
        productData.categoryName = titleInput.value
        checkInputValues()
    })

    // Обновление данных таблицы через запрос к API
    const updateTable = () => {
        getData('/products').then(data => {
            render(data)
        })
    }

    priceInput.addEventListener('input', () => {
        productData.price = Number(priceInput.value)
        checkInputValues()
    })

    // Обработка клика по кнопке добавления категории
    saveBtn.addEventListener('click', () => {
        postData('/products', { // Ложим на сервер данные из инпутов
            method: 'POST',
            body: JSON.stringify(productData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(data => { // Получаем данные категорий
            nameInput.value = ''
            titleInput.value = ''
            priceInput.value = ''
            previewInput.value = ''
            updateTable()
        })
    })

    // Поиск определенной кнопки через дата-атрибуты
    container.addEventListener('click', (event) => {
        if(event.target.tagName === 'BUTTON') {
            const id = event.target.dataset.product
            deleteData(`/products/${id}`).then(data => { // Удаление категории по id
                updateTable()
            })
        }
    })

    // Событие загрузки картинки категории
    previewInput.addEventListener('input', () => {
        const file = previewInput.files[0] // Получение объекта файла, т.к. он единственный, то обращаемся по индексу 0
        const fileReader = new FileReader() // Ассинхронное чтение файла

        // Проверка файла по нужному типу
        if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'iamge/jpg') {
            // Событие при успрешной закгрузки нужного файла
            fileReader.onload = function loadImg()  {
                productData.preview = fileReader.result;
            }

            // Событие ошибки при загрузке
            fileReader.onerror = function errorImg () {
                productData.preview = ''
            }
            fileReader.readAsDataURL(file)
        } else {
            previewInput.value = ''
        }
        checkInputValues()
    })

    updateTable()
    checkInputValues()
}