const uniqid = require('uniqid');

const getWarehouses = (req, res) => {
    pool.query('SELECT * FROM WAREHOUSE ORDER BY warehouse_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getWarehousesByCustomer_id = (req, res) => {
    const customer_id = req.params.id
    try {
        pool.query('SELECT * FROM WAREHOUSE WHERE customer_id = $1 AND available = true', [customer_id], (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).json(results.rows)
        })
    }
    catch{

    }
}

const getWarehouseById = (req, res) => {
    const id = req.params.id
    pool.query('SELECT * FROM WAREHOUSE WHERE warehouse_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows[0])
    })
}

const addWarehouse = (req, res) => {
    const warehouse_id = uniqid()
    const { warehousename, address, description, customer_id } = req.body
    pool.query('INSERT INTO WAREHOUSE (warehouse_id, warehousename, address, description, customer_id) VALUES ($1, $2, $3, $4, $5)', [warehouse_id, warehousename, address, description, customer_id], (error, results) => {
        if (error) {
            throw error
        }
        const warehouse = {
            warehouse_id: warehouse_id,
            warehousename: warehousename,
            address: address,
            description: description,
            customer_id: customer_id
        }
        res.status(201).json(warehouse)
    })
}

const updateWarehouse = (req, res) => {
    const warehouse_id = req.params.id
    const { warehousename, address, description } = req.body
    pool.query(
        'UPDATE WAREHOUSE SET warehousename = $1, address = $2, description = $3  WHERE warehouse_id = $4',
        [warehousename, address, description, warehouse_id],
        (err, results) => {
            if (err)
                throw err
            pool.query('SELECT * FROM WAREHOUSE', [], (error, results) => {
                if (error)
                    throw error
                res.status(200).json(results.rows)
            })
        }
    )
}

const deleteWarehouse = (req, res) => {
    const warehouse_id = req.params.id
    console.log(req.body)
    pool.query(
        'UPDATE WAREHOUSE SET available = $1  WHERE warehouse_id = $2',
        [false, warehouse_id],
        (err, results) => {
            if (err) {
                throw err
            }
            pool.query('SELECT * FROM WAREHOUSE', [], (error, results) => {
                if (error)
                    throw error
                res.status(200).json(results.rows)
            })
        }
    )
}

module.exports = {
    getWarehouses,
    getWarehouseById,
    addWarehouse,
    updateWarehouse,
    deleteWarehouse,
    getWarehousesByCustomer_id
    //deleteUser,
}
