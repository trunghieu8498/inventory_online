const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8000
const nguoiDung = require('./routers/nguoiDung-router')


app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

//app.get('/api/sayhello', nguoiDung.sayHello)
app.get('/api/nguoidungs', nguoiDung.getNguoiDungs)
app.get('/api/nguoidung/:id', nguoiDung.getNguoiDungById)
app.post('/api/nguoidung/add', nguoiDung.addNguoiDung)
app.put('/api/nguoidung/update/:id', nguoiDung.updateNguoiDung)
//app.delete('/users/:id', db.deleteUser)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

