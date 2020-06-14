customerRouter = require('./customer-router')

const login = (req, res) => {
    const { email, password } = req.body
    pool.query('SELECT * FROM CUSTOMER WHERE email = $1', [email], (error, result) => {
        if (error) {
            throw error
        }
        const customer = result.rows[0]
        
        if (customer)
            if (customer.password === password)
                return res.status(201).json(customer)
            else
                return res.status(400).json({ msg: 'Sai mật khẩu, vui lòng kiểm tra lại' })
        else
            return res.status(400).json({ msg: 'Tài khoản này không tồn tại' })
    })
}

const signup = (req, res) => {
    customerRouter.addCustomer(req, res)
}



module.exports = {
    login,
    signup
}