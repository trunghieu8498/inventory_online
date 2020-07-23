const pool = require('../db')
const warehouseRouter = require('./warehouse-router')
const deliveryNoteDetail = require('./deliverynotedetail-router')
var uniqid = require('uniqid');

const getDeliveryNotes = (req, res) => {
    pool.query('SELECT * FROM DELIVERYNOTE ORDER BY deliverynote_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getDeliveryNoteById = (req, res) => {
    const id = req.params.id
    pool.query('SELECT * FROM DELIVERYNOTE WHERE deliverynote_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows[0])
    })
}

const getDeliveryNoteByWarehouse_id = (req, res) => {
    const id = req.params.id
    pool.query('SELECT * FROM DELIVERYNOTE WHERE warehouse_id = $1', [id], (error, results) => {
        if (error)
            throw error
        res.status(200).json(results.rows)
    })

}

const addDeliveryNote = (req, res) => {
    const deliverynote_id = uniqid()
    const {  date, warehouse_id, deliveryNoteDetails } = req.body

    pool.query('INSERT INTO DELIVERYNOTE (deliverynote_id ,date, warehouse_id) VALUES ($1, $2, $3)', [deliverynote_id,date, warehouse_id], (error, results) => {
        if (error) {
            throw error
        }
        const deliverynote = {
            deliverynote_id: deliverynote_id,
            date: date,
            warehouse_id: warehouse_id,
            deliverynotedetails: deliveryNoteDetails          
        }
        deliveryNoteDetail.addListDeliveryNoteDetail(deliveryNoteDetails, deliverynote_id)
        res.status(201).json(deliverynote)
    })
}

const updateDeliveryNote = (req, res) => {
    const deliverynote_id = req.params.id
    const { date } = req.body

    pool.query(
        'UPDATE DELIVERYNOTE SET date = $1 WHERE deliverynote_id = $2',
        [ date, deliverynote_id],
        (error, results) => {
            if (error) {
                throw error
            }
            const deliverynote = {
                date: date,        
            }
            res.status(201).json(deliverynote)
        }
    )
}


module.exports = {
    getDeliveryNotes,
    getDeliveryNoteById,
    addDeliveryNote,
    updateDeliveryNote,
    getDeliveryNoteByWarehouse_id
}