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
    const {  quantity, sellingprice, goods_id, deliverynote_id } = req.body

    pool.query('INSERT INTO DELIVERYNOTEDETAIL (quantity, sellingprice, goods_id, deliverynote_id) VALUES ($1, $2, $3, $4)', 
    [quantity, sellingprice, goods_id, deliverynote_id], (error, results) => {
        if (error) {
            throw error
        }
        const deliverynotedetail = {
            quantity: quantity,
            sellingprice: sellingprice,
            goods_id: goods_id,
            deliverynote_id: deliverynote_id
        }
        res.status(201).json(deliverynotedetail)
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
}