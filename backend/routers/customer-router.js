pool = require('../db')
var uniqid = require('uniqid');

const sayHello = (req, res) => {
    res.status(200).json('lo con cec')
}

const getCustomers = (req, res) => {
    pool.query('SELECT customer_id, email, fullName, birthday, numberPhone FROM CUSTOMER ORDER BY customer_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getCustomerById = (req, res) => {
    const id = req.params.id
    pool.query('SELECT customer_id, email, fullName, birthday, numberPhone FROM CUSTOMER WHERE customer_id = $1', [id], (error, results) => {
        if (error) {
            // throw error
            res.status(400).json(error)
        }
        console.log(results)
        res.status(200).json(results.rows[0])
    })
}

const addCustomer = (req, res) => {
    console.log(req.body)
    const customer_id = uniqid()
    const { email, password, fullName, birthday, numberPhone } = req.body

    // console.log(req.body)

    pool.query('INSERT INTO CUSTOMER (customer_id, email, password, fullName, birthday, numberPhone) VALUES ($1, $2, $3, $4, $5, $6)', [customer_id, email, password, fullName, birthday, numberPhone], (error, results) => {
        if (error) {
            throw error
        }
        const customer = {
            customer_id: customer_id,
            email: email,
            password: password,
            fullname: fullName,
            birthday: birthday,
            numberphone: numberPhone
        }
            res.status(200).json(customer)
    })
}

const updateCustomer = (req, res) => {
    const customer_id = req.params.id
    const { fullName, birthday, numberPhone } = req.body

    pool.query(
        'UPDATE CUSTOMER SET fullName = $1, birthday = $2, numberPhone = $3 WHERE customer_id = $4',
        [fullName, birthday, numberPhone, customer_id],
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
    //deleteUser,
    sayHello
}
