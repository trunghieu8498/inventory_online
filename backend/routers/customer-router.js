pool = require('../db')

const sayHello = (request, response) => {
    response.status(200).json('lo con cec')
}

const getCustomers = (request, response) => {
    pool.query('SELECT customer_id, email, fullname, birthday, numberphone FROM CUSTOMER ORDER BY customer_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getCustomerById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT customer_id, email, fullname, birthday, numberphone FROM CUSTOMER WHERE customer_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows[0])
    })
}

const addCustomer = (request, response) => {
    const { email, password, fullname, birthday, numberphone } = request.body

    pool.query('INSERT INTO CUSTOMER (email, password, fullname, birthday, numberphone) VALUES ($1, $2, $3, $4, $5)', [email, password, fullname, birthday, numberphone], (error, results) => {
        if (error) {
            throw error
        }
        const customer = {
            email: email,
            password: password,
            fullname: fullname,
            ngaysinh: birthday,
            numberphone: numberphone,
        }
        response.status(201).json(customer)
    })
}

const updateCustomer = (request, response) => {
    const customer_id = parseInt(request.params.id)
    const { fullname, birthday, numberphone } = request.body

    pool.query(
        'UPDATE CUSTOMER SET fullname = $1, birthday = $2, numberphone = $3 WHERE customer_id = $4',
        [fullname, birthday, numberphone, customer_id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send('Du lieu nguoi dung da duoc cap nhat')
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
