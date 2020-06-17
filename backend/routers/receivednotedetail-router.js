const goodsRouter = require('./goods-router')
const receivednoteRouter = require('./receivednote-router')
const pool = require('../db')

const getReceivedNoteDetails = (req, res) => {
    pool.query('SELECT * FROM RECEIVEDNOTEDETAIL ORDER BY receivednotedetail_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getReceivedNoteDetailById = (req, res) => {const id = parseInt(req.params.id)
    pool.query('SELECT * FROM RECEIVEDNOTEDETAIL WHERE receivednotedetail_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows[0])
    })
}

const addReceivedNoteDetail = (req, res) => {
    const {  quantity, costprice, goods_id, receivednote_id } = req.body

    pool.query('INSERT INTO RECEIVEDNOTEDETAIL (quantity, costprice, goods_id, receivednote_id) VALUES ($1, $2, $3, $4)', 
    [quantity, costprice, goods_id, receivednote_id], (error, results) => {
        if (error) {
            throw error
        }
        const receivednotedetail = {
            quantity: quantity,
            costprice: costprice,
            goods_id: goods_id,
            receivednote_id: receivednote_id
        }
        res.status(201).json(receivednotedetail)
    })
}

const updateReceivedNoteDetail = (req, res) => {
    const receivednotedetail_id = parseInt(req.params.id)
    const { quantity, costprice } = req.body

    pool.query(
        'UPDATE RECEIVEDNOTEDETAIL SET quantity = $1 , costprice =$2  WHERE receivednotedetail_id = $3',
        [ quantity, costprice, receivednotedetail_id],
        (error, results) => {
            if (error) {
                throw error
            }
            const receivednotedetail = {
                quantity: quantity,  
                costprice: costprice      
            }
            res.status(201).json(receivednotedetail)
        }
    )
}


module.exports = {
    getReceivedNoteDetails,
    getReceivedNoteDetailById,
    addReceivedNoteDetail,
    updateReceivedNoteDetail,
}