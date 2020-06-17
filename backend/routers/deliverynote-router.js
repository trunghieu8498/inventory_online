warehouseRouter = require('./warehouse-router')
pool = require('../db')

const getDeliveryNotes = (req, res) => {
    pool.query('SELECT * FROM DELIVERYNOTE ORDER BY deliverynote_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getDeliveryNoteById = (req, res) => {const id = parseInt(req.params.id)
    pool.query('SELECT * FROM DELIVERYNOTE WHERE deliverynote_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows[0])
    })
}

const addDeliveryNote = (req, res) => {
    const {  date, warehouse_id } = req.body

    pool.query('INSERT INTO DELIVERYNOTE (date, warehouse_id) VALUES ($1, $2)', [date, warehouse_id], (error, results) => {
        if (error) {
            throw error
        }
        const deliverynote = {
            date: date,
            warehouse_id: warehouse_id,          
        }
        res.status(201).json(deliverynote)
    })
}

const updateDeliveryNote = (req, res) => {
    const deliverynote_id = parseInt(req.params.id)
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
}