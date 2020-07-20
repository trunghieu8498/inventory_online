const goodsRouter = require('./goods-router')
const receivednoteRouter = require('./receivednote-router')
const pool = require('../db')
var uniqid = require('uniqid');

const getReceivedNoteDetails = (req, res) => {
    pool.query('SELECT * FROM RECEIVEDNOTEDETAIL ORDER BY receivednotedetail_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getReceivedNoteDetailsByReceivedNoteId = (req, res) => {
    const id = req.params.id
    pool.query('SELECT * FROM RECEIVEDNOTEDETAIL WHERE receivednote_id = $1', [id], async (error, results) => {
        if (error)
            throw error
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
            .then(result => res.status(200).json(result))
    })
}

// const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const getReceivedNoteDetailById = (req, res) => {
    const id = req.params.id
    pool.query('SELECT * FROM RECEIVEDNOTEDETAIL WHERE receivednotedetail_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows[0])
    })
}

const addReceivedNoteDetail = (req, res) => {
    const receivednotedetail_id = uniqid()
    const { quantity, costprice, goods_id, receivednote_id } = req.body

    pool.query('INSERT INTO RECEIVEDNOTEDETAIL (receivednotedetail_id, quantity, costprice, goods_id, receivednote_id) VALUES ($1, $2, $3, $4)',
        [receivednotedetail_id, quantity, costprice, goods_id, receivednote_id], (error, results) => {
            if (error) {
                throw error
            }
            const receivednotedetail = {
                receivednotedetail_id: receivednotedetail_id,
                quantity: quantity,
                costprice: costprice,
                goods_id: goods_id,
                receivednote_id: receivednote_id
            }
            res.status(201).json(receivednotedetail)
        })
}

const addListReceivedNoteDetail = (receivedNoteDetails, receivedNote_id) => {
    // let array = []
    receivedNoteDetails.forEach(_receivedNoteDetail => {
        const receivednotedetail_id = uniqid()
        const { quantity, costprice, goods_id } = _receivedNoteDetail.goods
        pool.query('INSERT INTO RECEIVEDNOTEDETAIL (receivednotedetail_id, quantity, costprice, goods_id, receivednote_id) VALUES ($1, $2, $3, $4, $5)',
            [receivednotedetail_id, quantity, costprice, goods_id, receivedNote_id], (error, results) => {
                if (error) {
                    throw error
                }
                // var newReceivedNoteDetail = {
                //     quantity: quantity,
                //     costprice: costprice,
                //     goods_id: goods_id,
                //     receivednote_id: receivedNote_id
                // }
                // array = [...array, newReceivedNoteDetail]
            })
        // console.log(2,goods_id)
    })
    // console.log(3, array)
    // res.status(200).json('Them received note detail thanh cong')
}

const updateReceivedNoteDetail = (req, res) => {
    const receivednotedetail_id = req.params.id
    const { quantity, costprice } = req.body

    pool.query(
        'UPDATE RECEIVEDNOTEDETAIL SET quantity = $1 , costprice =$2  WHERE receivednotedetail_id = $3',
        [quantity, costprice, receivednotedetail_id],
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
    addListReceivedNoteDetail,
    getReceivedNoteDetailsByReceivedNoteId
}