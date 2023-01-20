const server = 'http://localhost:3001'

export const getData = (path) => {
    return fetch(server + path).then(response => response.json())
}