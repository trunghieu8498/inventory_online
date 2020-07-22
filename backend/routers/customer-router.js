pool = require('../db')
var uniqid = require('uniqid');

const sayHello = (req, res) => {
    res.status(200).json('lo con cec')
}

const getCustomers = (req, res) => {
    pool.query('SELECT * FROM CUSTOMER ORDER BY customer_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getCustomersAsAdmin = (req, res) => {
    pool.query('SELECT * FROM CUSTOMER', [], (error, results) => {
        if (error)
            throw error
        res.status(200).json(results.rows)
    })
}

const getCustomerById = (req, res) => {
    const id = req.params.id
    pool.query('SELECT * FROM CUSTOMER WHERE customer_id = $1', [id], (error, results) => {
        if (error) {
            // throw error
            res.status(400).json(error)
        }
        res.status(200).json(results.rows[0])
    })
}

const addCustomer = (req, res) => {
    console.log(req.body)
    const customer_id = uniqid()
    const { email, password, fullname, birthday, numberphone } = req.body

    // console.log(req.body)

    pool.query('INSERT INTO CUSTOMER (customer_id, email, password, fullname, birthday, numberphone) VALUES ($1, $2, $3, $4, $5, $6)', [customer_id, email, password, fullname, birthday, numberphone], (error, results) => {
        if (error) {
            throw error
        }
        const customer = {
            customer_id: customer_id,
            email: email,
            password: password,
            fullname: fullname,
            birthday: birthday,
            numberphone: numberphone
        }
            res.status(200).json(customer)
    })
}

const updateCustomer = (req, res) => {
    const customer_id = req.params.id
    const { fullname, birthday, numberphone } = req.body

    pool.query(
        'UPDATE CUSTOMER SET fullname = $1, birthday = $2, numberphone = $3 WHERE customer_id = $4',
        [fullname, birthday, numberphone, customer_id],
        (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).send('Du lieu nguoi dung da duoc cap nhat')
        }
    )
}


module.exports = {
    getCustomers,
    getCustomerById,
    addCustomer,
    updateCustomer,
    getCustomersAsAdmin,
    sayHello
}
