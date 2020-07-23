const goodsRouter = require('./goods-router')
const deliverynoteRouter = require('./deliverynote-router')
const pool = require('../db')
var uniqid = require('uniqid');

const getDeliveryNoteDetails = (req, res) => {
    pool.query('SELECT * FROM DELIVERYNOTEDETAIL ORDER BY deliverynotedetail_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getDeliveryNoteDetailsByDeliveryNoteId = (req, res) => {
    const id = req.params.id
    pool.query('SELECT * FROM DELIVERYNOTEDETAIL WHERE deliverynote_id = $1', [id], async (error, results) => {
        if (error)
            throw error
        console.log(results.rows)
        const promises = results.rows.map(row => {
            return new Promise(resolve => {
                const { goods_id } = row
                pool.query('SELECT * FROM GOODS WHERE goods_id = $1', [goods_id], (error, results) => {
                    if (error)
                        throw error

                    delete row.goods_id
                    row.goods = results.rows[0]
                    resolve(row)
                })
            })
        })

        Promise.all(promises)
            .then(result => {
                res.status(200).json(result)
            })
    })
}

const getDeliveryNoteDetailById = (req, res) => {
    const id = req.params.id
    pool.query('SELECT * FROM DELIVERYNOTEDETAIL WHERE deliverynotedetail_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows[0])
    })
}

const addDeliveryNoteDetail = (req, res) => {
    const deliverynotedetail_id =  uniqid()
    const {  quantity, sellingprice, goods_id, deliverynote_id } = req.body

    pool.query('INSERT INTO DELIVERYNOTEDETAIL ( deliverynotedetail_id, quantity, sellingprice, goods_id, deliverynote_id) VALUES ($1, $2, $3, $4, $5)', 
    [deliverynotedetail_id, quantity, sellingprice, goods_id, deliverynote_id], (error, results) => {
        if (error) {
            throw error
        }
        const deliverynotedetail = {
            deliverynotedetail_id: deliverynotedetail_id,
            quantity: quantity,
            sellingprice: sellingprice,
            goods_id: goods_id,
            deliverynote_id: deliverynote_id
        }
        res.status(201).json(deliverynotedetail)
    })
}

const addListDeliveryNoteDetail = (deliveryNoteDetails, deliverynote_id) => {
    // let array = []
    deliveryNoteDetails.forEach(_deliveryNoteDetail => {
        const deliverynotedetail_id = uniqid()
        const { goods_id, inventorynumber } = _deliveryNoteDetail.goods
        const { quantity, sellingprice } = _deliveryNoteDetail
        pool.query('INSERT INTO DELIVERYNOTEDETAIL (deliverynotedetail_id, quantity, sellingprice, goods_id, deliverynote_id) VALUES ($1, $2, $3, $4, $5)',
            [deliverynotedetail_id, quantity, sellingprice, goods_id, deliverynote_id], (error, results) => {
                if (error)
                    throw error

                pool.query('UPDATE GOODS SET inventorynumber = $1 WHERE goods_id = $2', [inventorynumber - quantity, goods_id], (error, results) => {
                    if (error)
                        throw error
                })
            })
    })
}

const updateDeliveryNoteDetail = (req, res) => {
    const deliverynotedetail_id = req.params.id
    const { quantity, sellingprice } = req.body

    pool.query(
        'UPDATE DELIVERYNOTEDETAIL SET quantity = $1 , sellingprice =$2  WHERE deliverynotedetail_id = $3',
        [ quantity, sellingprice, deliverynotedetail_id],
        (error, results) => {
            if (error) {
                throw error
            }
            const deliverynotedetail = {
                quantity: quantity,  
                sellingprice: sellingprice      
            }
            res.status(201).json(deliverynotedetail)
        }
    )
}


module.exports = {
    getDeliveryNoteDetails,
    getDeliveryNoteDetailById,
    addDeliveryNoteDetail,
    updateDeliveryNoteDetail,
    addListDeliveryNoteDetail,
    getDeliveryNoteDetailsByDeliveryNoteId
}