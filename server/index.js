const express = require('express')
const morgan = require('morgan')
const fs = require('fs')
const cors = require('cors')
require('dotenv').config()
const path = require('path')

const app = express()

const PORT = process.env.PORT || 3000
const CLIENT_URL = process.env.CLIENT_URL

app.use(morgan(':method :url :status'))

app.use(express.json())

const allowedOrigins = [CLIENT_URL]
app.use(
	cors({
		methods: ['GET', 'POST'],
		origin: allowedOrigins
	})
)

app.get('/getUsers', (req, res) => {
    try {
    const data = fs.readFileSync(path.join(__dirname, 'db', 'db.json'), 'utf-8')
    res.json(data)
    } catch (error) {
        console.log('Ошибка при получении пользователей', error)
		res.send('Ошибка при получении пользователей', error)
    }
})

app.get('/getUsers/:name', (req, res) => {
	try {
		const { name } = req.params
		const users = JSON.parse(fs.readFileSync(path.join(__dirname, 'db', 'db.json'), 'utf-8'))
		const user = users.find(user => user.name.toLowerCase() == name.toLowerCase() || user.age == name || user.city.toLowerCase() == name.toLowerCase())
		res.json(user)
	} catch (error) {
		console.log('Ошибка при получении пользователя', error)
		res.send('Ошибка при получении пользователя', error)
	}
})

app.post('/addUser', (req, res) => {
    try {
        const user = req.body
        const users = JSON.parse(fs.readFileSync(path.join(__dirname, 'db', 'db.json'), 'utf-8'))
        users.push(user)
        fs.writeFileSync(path.join(__dirname, 'db', 'db.json'), JSON.stringify(users))
        res.json({ message: `Пользователь ${user.name} успешно добавлен` })
    } catch (error) {
        console.error('Ошибка при добавлении пользователя', error)
        res.json({ message: 'Ошибка при добавлении пользователя', error: error.message })
    }
})


app.listen(PORT, () => {
	console.log(`server is listening port: ${PORT}`)
})