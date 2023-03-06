import {postData, getData, deleteData} from "../api.module";

export const addCategory = () => {
    const nameInput = document.getElementById('category-name')
    const imgInput = document.getElementById('category-image')
    const addBtn = document.getElementById('category-add-btn')
    const container = document.getElementById('category-container')
    const select = document.getElementById('product-category')

    // Данные категории для добавления
    const categoryData = {
        name: '',
        preview: ''
    }

    // рендер талицы с добавленными категориями из БД
    const render = (data) => {
        container.innerHTML = ''

        data.forEach((item, index) => {
            container.insertAdjacentHTML('beforeend',
                `<tr>
                          <th scope="row">${index + 1}</th>
                          <td>${item.name}</td>
                          <td class="text-end">
                              <button type="button" class="btn btn-outline-danger btn-sm" data-category="${item.id}">
                                     удалить
                              </button>
                          </td>
                       </tr>`
            )

            // Рендер пунктов выпадающего списка
            select.insertAdjacentHTML('beforeend', `<option value=${item.id}>${item.name}</option>`)
        })


    }

    // Проверка вводимых значений на пустоту
    const checkInputValues = () => {
        addBtn.disabled = nameInput.value === '' || imgInput.value === '';
    }

    // Обновление данных таблицы через запрос к API
    const updateTable = () => {
        getData('/categories').then(data => {
            render(data)
        })
    }

    // Событие ввода имени категории
    nameInput.addEventListener('input', () => {
        categoryData.name = nameInput.value
        checkInputValues()
    })

    // Слобытие загрузки картинки категории
    imgInput.addEventListener('input', () => {
        const file = imgInput.files[0] // Получение объекта файла, т.к. он единственный, то обращаемся по индексу 0
        const fileReader = new FileReader() // Ассинхронное чтение файла

        // Проверка файла по нужному типу
        if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'iamge/jpg') {
            // Событие при успрешной закгрузки нужного файла
            fileReader.onload = function loadImg()  {
                categoryData.preview = fileReader.result;
            }

            // Событие ошибки при загрузке
            fileReader.onerror = function errorImg () {
                categoryData.preview = ''
            }
            fileReader.readAsDataURL(file)
        } else {
            imgInput.value = ''
        }
        checkInputValues()
    })

    // Обработка клика по кнопке добавления категории
    addBtn.addEventListener('click', () => {
        postData('/categories', { // Ложим на сервер данные из инпутов
            method: 'POST',
            body: JSON.stringify(categoryData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(data => { // Получаем данные категорий
            nameInput.value = ''
            imgInput.value = ''
            updateTable()
        })
    })

    // Поиск определенной кнопки через дата-атрибуты
    container.addEventListener('click', (event) => {
        if(event.target.tagName === 'BUTTON') {
            const id = event.target.dataset.category
            deleteData(`/categories/${id}`).then(data => { // Удаление категории по id 
                updateTable()
            })
        }
    })

    checkInputValues()
    updateTable()
}