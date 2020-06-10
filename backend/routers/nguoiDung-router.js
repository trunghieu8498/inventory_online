pool = require('../db')

const sayHello = (request, response) => {
    response.status(200).json('lo con cec')
}

const getNguoiDungs = (request, response) => {
    pool.query('SELECT nguoidung_id, email, ten, ngaysinh, sodienthoai FROM NGUOIDUNG ORDER BY nguoidung_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getNguoiDungById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT nguoidung_id, email, ten, ngaysinh, sodienthoai FROM NGUOIDUNG WHERE nguoidung_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const addNguoiDung = (request, response) => {
    const { email, matkhau, ten, ngaysinh, sodienthoai } = request.body

    pool.query('INSERT INTO NGUOIDUNG (email, matkhau, ten, ngaysinh, sodienthoai) VALUES ($1, $2, $3, $4, $5)', [email, matkhau, ten, ngaysinh, sodienthoai], (error, results) => {
        if (error) {
            throw error
        }
        //response.status(201).send(`User added with ID: ${result.insertId}`)
        response.status(201).send('Da them nguoi dung')
    })
}

const updateNguoiDung = (request, response) => {
    const nguoidung_id = parseInt(request.params.id)
    const { ten,  ngaysinh, sodienthoai} = request.body

    pool.query(
        'UPDATE NGUOIDUNG SET ten = $1, ngaysinh = $2, sodienthoai = $3 WHERE nguoidung_id = $4',
        [ten, ngaysinh, sodienthoai, nguoidung_id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send('Du lieu nguoi dung da duoc cap nhat')
        }
    )
}


module.exports = {
    getNguoiDungs,
    getNguoiDungById,
    addNguoiDung,
    updateNguoiDung,
    //deleteUser,
    sayHello
}
