require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors');
const port = 8000

const auth = require('./routers/auth-router')
const customer = require('./routers/customer-router')
const warehouse = require('./routers/warehouse-router')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//app.get('/api/sayhello', customer.sayHello)
app.post('/api/login', auth.login)
app.post('/api/signup', auth.signup)

app.get('/api/customers', customer.getCustomers)
app.get('/api/customer/:id', customer.getCustomerById)
app.post('/api/customer/add', customer.addCustomer)
app.put('/api/customer/update/:id', customer.updateCustomer)

app.get('/api/warehouse', warehouse.getWarehouses)
app.get('/api/warehouse/:id', warehouse.getWarehouseById)
app.get('/api/warehouse/get/:id', warehouse.getWarehousesByCustomer_id)
app.post('/api/warehouse/add', warehouse.addWarehouse)
app.put('/api/warehouse/update/:id', warehouse.updateWarehouse)

//app.delete('/users/:id', db.deleteUser)

app.get('/', (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

