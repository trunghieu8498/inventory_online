const getTypes = (req, res) => {
    pool.query('SELECT * FROM TYPE ORDER BY type_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getTypeByWarehouse_id = (req, res) => {
    const warehouse_id = parseInt(req.params.id)

    pool.query('SELECT * FROM TYPE WHERE warehouse_id = $1', [warehouse_id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getTypeById = (req, res) => {
    const type_id = parseInt(req.params.id)

    pool.query('SELECT * FROM TYPE WHERE type_id = $1', [type_id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows[0])
    })
}

const addType = (req, res) => {
    const { typeName, warehouse_id } = req.body

    pool.query('INSERT INTO TYPE (typeName, warehouse_id) VALUES ($1, $2)', [typeName, warehouse_id], (error, results) => {
        if (error) {
            throw error
        }
        const type = {
            typeName: typeName,
            warehouse_id: warehouse_id
        }
        res.status(201).json(type)
    })
}

const updateType = (req, res) => {
    const type_id = parseInt(req.params.id)
    const { typeName } = req.body

    pool.query(
        'UPDATE WAREHOUSE SET typeName = $1 WHERE type_id = $2',
        [typeName, type_id],
        (err, results) => {
            if (error) {
                throw err
            }
            const type = {
                typeName: typeName,
                warehouse_id: warehouse_id
            }
            res.status(200).json(type)
        }
    )
}

module.exports = {
    getTypes,
    getTypeById,
    addType,
    updateType,
    getTypeByWarehouse_id
    //deleteUser,
}
