require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors');
const port = 8000

const auth = require('./routers/auth-router')
const customer = require('./routers/customer-router')
const warehouse = require('./routers/warehouse-router')
const type = require('./routers/type-router')
const deliverynote = require('./routers/deliverynote-router')
const deliverynotedetail = require('./routers/deliverynotedetail-router')
const receivednote = require('./routers/receivednote-router')
const receivednotedetail = require('./routers/receivednotedetail-router')

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

app.get('/api/type', type.getTypes)
app.get('/api/type/get/:id', type.getTypeByWarehouse_id)
app.post('/api/type/add', type.addType)

app.get('/api/deliverynote', deliverynote.getDeliveryNotes)
app.get('/api/deliverynote/:id', deliverynote.getDeliveryNoteById)
app.post('/api/deliverynote/add', deliverynote.addDeliveryNote)
app.put('/api/deliverynote/update/:id', deliverynote.updateDeliveryNote)
//app.delete('/users/:id', db.deleteUser)

app.get('/api/deliverynotedetail', deliverynotedetail.getDeliveryNoteDetails)
app.get('/api/deliverynotedetail/:id', deliverynotedetail.getDeliveryNoteDetailById)
app.post('/api/deliverynotedetail/add', deliverynotedetail.addDeliveryNoteDetail)
app.put('/api/deliverynotedetail/update/:id', deliverynotedetail.updateDeliveryNoteDetail)

app.get('/api/receivednote', receivednote.getReceivedNotes)
app.get('/api/receivednote/:id',receivednote.getReceivedNoteById)
app.post('/api/receivednote/add', receivednote.addReceivedNote)
app.put('/api/receivednote/update/:id', receivednote.updateReceivedNote)

app.get('/api/receivednotedetail', receivednotedetail.getReceivedNoteDetails)
app.get('/api/receivednotedetail/:id', receivednotedetail.getReceivedNoteDetailById)
app.post('/api/receivednotedetail/add', receivednotedetail.addReceivedNoteDetail)
app.put('/api/receivednotedetail/update/:id', receivednotedetail.updateReceivedNoteDetail)

app.get('/', (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

