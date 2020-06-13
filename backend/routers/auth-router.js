customerRouter = require('./customer-router')

const login = (request, response) => {
    const { email, password } = request.body
    pool.query('SELECT * FROM CUSTOMER WHERE email = $1', [email], (error, result) => {
        if (error) {
            throw error
        }
        const customer = result.rows[0]

        if (customer)
            if (customer.password === password)
                return response.status(201).json(customer)
            else
                return response.status(400).json({ msg: 'Sai mật khẩu, vui lòng kiểm tra lại' })
        else
            return response.status(400).json({ msg: 'Tài khoản này không tồn tại' })
    })
}

const signup = (request, response) => {
    customerRouter.addCustomer(request, response)
}



module.exports = {
    login,
    signup
}