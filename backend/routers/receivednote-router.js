const pool = require('../db')
const warehouseRouter = require('./warehouse-router')
const receivedNoteDetail = require('./receivednotedetail-router')
var uniqid = require('uniqid');

const getReceivedNotesAsAdmin = (req, res) => {
    pool.query('SELECT * FROM RECEIVEDNOTE', [], (error, results) => {
        if (error)
            throw error
        res.status(200).json(results.rows)
    })
}

const getReceivedNotes = (req, res) => {
    pool.query('SELECT * FROM RECEIVEDNOTE ORDER BY receivednote_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getReceivedNoteById = (req, res) => {
    const id = req.params.id
    pool.query('SELECT * FROM RECEIVEDNOTE WHERE receivednote_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows[0])
    })
}

const getReceivedNoteByWarehouse_id = (req, res) => {
    const id = req.params.id
    pool.query('SELECT * FROM RECEIVEDNOTE WHERE warehouse_id = $1', [id], (error, results) => {
        if (error)
            throw error
        res.status(200).json(results.rows)
    })

}

const addReceivedNote = (req, res) => {
    const receivednote_id = uniqid()
    const { date, warehouse_id, receivedNoteDetails } = req.body

    pool.query('INSERT INTO RECEIVEDNOTE (receivednote_id, date, warehouse_id) VALUES ($1, $2, $3)', [receivednote_id, date, warehouse_id], (error, results) => {
        if (error) {
            throw error
        }
        const receivednote = {
            receivednote_id: receivednote_id,
            date: date,
            warehouse_id: warehouse_id,
            receivednotedetails: receivedNoteDetails
        }
        receivedNoteDetail.addListReceivedNoteDetail(receivedNoteDetails, receivednote_id)
        res.status(201).json(receivednote)
    })
}

/*
viet 1 ham insert 1 luc nhieu receivednotedetail ben receivecNoteDetail-router
khi insert 1 receivedNote se tro toi ham do' de insert cac receivedNoteDetail theo id cua no
*/


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
    const receivednote_id = req.params.id
    const { date } = req.body

    pool.query(
        'UPDATE RECEIVEDNOTE SET date = $1 WHERE receivednote_id = $2',
        [date, receivednote_id],
        (error, results) => {
            if (error)
                throw error
            pool.query('SELECT * FROM RECEIVEDNOTE', [], (error, results) => {
                if (error)
                    throw error
                res.status(201).json(results.rows)
            })
        }
    )
}


module.exports = {
    getReceivedNotes,
    getReceivedNoteById,
    addReceivedNote,
    updateReceivedNote,
    getReceivedNoteByWarehouse_id,
    getReceivedNotesAsAdmin
}