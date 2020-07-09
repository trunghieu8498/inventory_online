const pool = require('../db')
const warehouseRouter = require('./warehouse-router')
const receivedNoteDetail = require('./receivednotedetail-router')

const getReceivedNotes = (req, res) => {
    pool.query('SELECT * FROM RECEIVEDNOTE ORDER BY receivednote_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getReceivedNoteById = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query('SELECT * FROM RECEIVEDNOTE WHERE receivednote_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows[0])
    })
}

const addReceivedNote = (req, res) => {
    const {  date, warehouse_id } = req.body

    pool.query('INSERT INTO RECEIVEDNOTE (date, warehouse_id) VALUES ($1, $2)', [date, warehouse_id], (error, results) => {
        if (error) {
            throw error
        }
        const receivednote = {
            date: date,
            warehouse_id: warehouse_id,          
        }
        res.status(201).json(receivednote)
    })
}

// const addReceivedNote = (req, res) => {
//     const { date, warehouse_id, receivedNoteDetails } = req.body

//     pool.query('INSERT INTO RECEIVEDNOTE (date, warehouse_id) VALUES ($1, $2)', [date, warehouse_id], (error, results) => {
//         if (error) {
//             throw error
//         }
//         const receivednote = {
//             date: date,
//             warehouse_id: warehouse_id,
//         }
//         receivedNoteDetails.foreach(_receivedNoteDetail => {
//             const newRecievedNoteDt = {
//                 receivednote_id: 
//             }
//             receivedNoteDetail.addReceivedNoteDetail()
//         })
//         res.status(201).json(receivednote)
//     })
// }

const updateReceivedNote = (req, res) => {
    const receivednote_id = parseInt(req.params.id)
    const { date } = req.body

    pool.query(
        'UPDATE RECEIVEDNOTE SET date = $1 WHERE receivednote_id = $2',
        [date, receivednote_id],
        (error, results) => {
            if (error) {
                throw error
            }
            const receivednote = {
                date: date,
            }
            res.status(201).json(receivednote)
        }
    )
}


module.exports = {
    getReceivedNotes,
    getReceivedNoteById,
    addReceivedNote,
    updateReceivedNote,
}