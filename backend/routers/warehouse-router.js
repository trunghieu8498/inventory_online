const getWarehouses = (request, response) => {
    pool.query('SELECT * FROM WAREHOUSE ORDER BY warehouse_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getWarehouseById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM WAREHOUSE WHERE warehouse_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows[0])
    })
}

const addWarehouse = (request, response) => {
    const { warehousename, address, description, customer_id } = request.body

    pool.query('INSERT INTO WAREHOUSE (warehousename, address, description, customer_id) VALUES ($1, $2, $3, $4)', [warehousename, address, description, customer_id], (error, results) => {
        if (error) {
            throw error
        }
        const warehouse = {
            warehousename: warehousename, 
            address: address, 
            description: description, 
            customer_id: customer_id
        }
        response.status(201).json(warehouse)
    })
}

const updateWarehouse = (request, response) => {
    const warehouse_id = parseInt(request.params.id)
    const { warehousename, address, description } = request.body

    pool.query(
        'UPDATE WAREHOUSE SET warehousename = $1, address = $2, description = $3  WHERE warehouse_id = $4',
        [warehousename, address, description, warehouse_id],
        (error, results) => {
            if (error) {
                throw error
            }
            const warehouse = {
                warehousename: warehousename, 
                address: address, 
                description: description,
            }
            response.status(200).json(warehouse)
        }
    )
}

module.exports = {
    getWarehouses,
    getWarehouseById,
    addWarehouse,
    updateWarehouse,
    //deleteUser,
}
