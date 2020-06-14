const getWarehouses = (req, res) => {
    pool.query('SELECT * FROM WAREHOUSE ORDER BY warehouse_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getWarehousesByCustomer_id = (req, res) => {
    const customer_id = parseInt(req.params.id)

    pool.query('SELECT * FROM WAREHOUSE WHERE customer_id = $1', [customer_id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getWarehouseById = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT * FROM WAREHOUSE WHERE warehouse_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows[0])
    })
}

const addWarehouse = (req, res) => {
    const { warehouseName, address, description, customer_id } = req.body

    pool.query('INSERT INTO WAREHOUSE (warehouseName, address, description, customer_id) VALUES ($1, $2, $3, $4)', [warehouseName, address, description, customer_id], (error, results) => {
        if (error) {
            throw error
        }
        const warehouse = {
            warehouseName: warehouseName,
            address: address,
            description: description,
            customer_id: customer_id
        }
        res.status(201).json(warehouse)
    })
}

const updateWarehouse = (req, res) => {
    const warehouse_id = parseInt(req.params.id)
    const { warehouseName, address, description } = req.body

    pool.query(
        'UPDATE WAREHOUSE SET warehouseName = $1, address = $2, description = $3  WHERE warehouse_id = $4',
        [warehouseName, address, description, warehouse_id],
        (err, results) => {
            if (error) {
                throw err
            }
            const warehouse = {
                warehouseName: warehouseName,
                address: address,
                description: description,
            }
            res.status(200).json(warehouse)
        }
    )
}

module.exports = {
    getWarehouses,
    getWarehouseById,
    addWarehouse,
    updateWarehouse,
    getWarehousesByCustomer_id
    //deleteUser,
}
