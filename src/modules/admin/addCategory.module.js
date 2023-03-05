import {postData, getData} from "../api.module";

export const addCategory = () => {
    const nameInput = document.getElementById('category-name')
    const imgInput = document.getElementById('category-image')
    const addBtn = document.getElementById('category-add-btn')

    // Данные категории для добавления
    const categoryData = {
        name: '',
        preview: ''
    }

    // Проверка вводимых значений на пустоту
    const checkInputValues = () => {
        if (nameInput.value === '' || imgInput.value === '') {
            addBtn.disabled = true;
        } else {
            addBtn.disabled = false;
        }
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
            getData('/categories').then(data => {
                console.log(data)
            })
        })
    })

    checkInputValues()
}