var uniqid = require('uniqid');

const getTypes = (req, res) => {
    pool.query('SELECT * FROM TYPE ORDER BY type_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getTypesAsAdmin = (req, res) => {
    pool.query('SELECT * FROM TYPE', [], (error, results) => {
        if (error)
            throw error
        res.status(200).json(results.rows)
    })
}

const getTypeByWarehouse_id = (req, res) => {
    const warehouse_id = req.params.id
    const { isAdmin } = req.body
    if (isAdmin)
        pool.query('SELECT * FROM TYPE WHERE warehouse_id = $1', [warehouse_id], (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).json(results.rows)
        })
    else
        pool.query('SELECT * FROM TYPE WHERE warehouse_id = $1 AND available = true', [warehouse_id], (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).json(results.rows)
        })
}

const getTypeById = (req, res) => {
    const type_id = req.params.id

    pool.query('SELECT * FROM TYPE WHERE type_id = $1', [type_id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows[0])
    })
}

const addType = (req, res) => {
    const type_id = uniqid()
    const { typeName, warehouse_id } = req.body

    pool.query('INSERT INTO TYPE (type_id, typeName, warehouse_id) VALUES ($1, $2, $3)', [type_id, typeName, warehouse_id], (error, results) => {
        if (error) {
            throw error
        }
        const type = {
            type_id: type_id,
            typename: typeName,
            warehouse_id: warehouse_id
        }
        res.status(201).json(type)
    })
}

const updateType = (req, res) => {
    const type_id = req.params.id
    const { typeName } = req.body
    console.log(type_id)
    pool.query(
        'UPDATE TYPE SET typeName = $1 WHERE type_id = $2',
        [typeName, type_id],
        (err, results) => {
            if (err) {
                throw err
            }
            pool.query('SELECT * FROM TYPE WHERE available = $1', [true], (error, results) => {
                if (error)
                    throw error
                res.status(200).json(results.rows)
            })
        }
    )
}

const deleteType = (req, res) => {
    const type_id = req.params.id
    console.log(type_id)
    pool.query(
        'UPDATE TYPE SET available = $1 WHERE type_id = $2',
        [false, type_id],
        (err, results) => {
            if (err) {
                throw err
            }
            pool.query('SELECT * FROM TYPE WHERE available = $1', [true], (error, results) => {
                if (error)
                    throw error
                res.status(200).json(results.rows)
            })
        }
    )
}

module.exports = {
    getTypes,
    getTypeById,
    addType,
    updateType,
    deleteType,
    getTypeByWarehouse_id,
    getTypesAsAdmin
}
