import {getData} from "./api.module";

export const categoriesFunc = () => {
    getData('/categories')
        .then((data) => {
            console.log(data)
        })
        .catch(() => {
            console.error('Произошла ошибка')
        })
}