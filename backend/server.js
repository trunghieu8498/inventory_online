require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors');
const port = 8000

console.log(process.env)

const customer = require('./routers/customer-router')
const auth = require('./routers/auth-router')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//app.get('/api/sayhello', customer.sayHello)
app.get('/api/nguoidungs', customer.getCustomers)
app.get('/api/nguoidung/:id', customer.getCustomerById)
app.post('/api/nguoidung/add', customer.addCustomer)
app.put('/api/nguoidung/update/:id', customer.updateCustomer)

app.post('/api/login', auth.login)
app.post('/api/signup', auth.signup)


//app.delete('/users/:id', db.deleteUser)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

