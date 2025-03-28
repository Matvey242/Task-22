import { getDataFunction, postDataFunction, patchDataFunction } from './functions.js'
import { SERVER_URL } from './api.js'

const list = document.querySelector('.list')
const inputNewName = document.querySelector('.i-name > input')
const inputAge = document.querySelector('.i-age > input')
const inputCity = document.querySelector('.i-city > input')
const inputName = document.querySelector('.inputname')
const addButton = document.querySelector('.addButton')
const findDiv = document.querySelector('.findDiv')

window.addEventListener('load', async () => {
    const data = JSON.parse(await getDataFunction(`${SERVER_URL}/getUsers`))
    data.forEach(user => {
        list.insertAdjacentHTML(
            `beforeend`,
            `<div style="background-color: white; width: 95%; height: 11%; border: 2px solid black; display: flex; justify-content: center; align-items: center;">${user.name}, ${user.age}, ${user.city}</div>`
        )
    })
    console.log(data)
})

findDiv.addEventListener('click', async () => {
    const inp = inputName.value
    const data = await getDataFunction(`${SERVER_URL}/getUsers/${inp}`)
    if (data) {
        list.innerHTML = ''
        list.insertAdjacentHTML(
            `beforeend`,
            `<div style="background-color: white; width: 95%; height: 11%; border: 2px solid black; display: flex; justify-content: center; align-items: center;">${data.name}, ${data.age}, ${data.city}</div>`
            )
    } else {
        list.innerHTML = ''
        list.innerText = 'Пользователь не найден'
        list.classList.add('red')
    }
})

addButton.addEventListener('click', async () => {
    const name = inputNewName.value
    const age = inputAge.value
    const city = inputCity.value
    const result = await postDataFunction(`${SERVER_URL}/addUser`, { name, age, city })
    console.log(result)
})
