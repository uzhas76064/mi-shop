const server = 'http://localhost:3001'

export const getData = (path) => {
    return fetch(server + path).then(response => response.json())
}

export const postData = (path, data) => {
    return fetch(server + path, data)
}