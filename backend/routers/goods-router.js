var uniqid = require('uniqid');

const getGoods = (req, res) => {
    pool.query('SELECT * FROM GOODS ORDER BY warehouse_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getGoodsByWarehouse_id = (req, res) => {
    const warehouse_id = req.params.id

    pool.query('SELECT * FROM GOODS WHERE warehouse_id = $1 AND available = true', [warehouse_id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getGoodsById = (req, res) => {
    const goods_id = req.params.id

    pool.query('SELECT * FROM GOODS WHERE goods_id = $1', [goods_id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows[0])
    })
}

const addGoods = (req, res) => {
    const goods_id = uniqid()
    const { goodsName, weight, description, costPrice, sellingPrice, inventoryNumber, warehouse_id, type_id } = req.body
    pool.query('INSERT INTO GOODS (goods_id, goodsName, weight, description, costPrice, sellingPrice, inventoryNumber, warehouse_id, type_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [goods_id, goodsName, weight, description, costPrice, sellingPrice, inventoryNumber, warehouse_id, type_id], (error, results) => {
        if (error) {
            throw error
        }
        const goods = {
            goods_id: goods_id,
            goodsname: goodsName,
            weight: weight,
            description: description,
            costprice: costPrice,
            sellingprice: sellingPrice,
            inventorynumber: inventoryNumber,
            warehouse_id: warehouse_id,
            type_id: type_id
        }
        res.status(201).json(goods)
    })
}

const updateGoods = (req, res) => {
    const goods_id = req.params.id
    const { goodsName, weight, description, costPrice, sellingPrice, inventoryNumber, type_id } = req.body
    pool.query(
        'UPDATE GOODS SET goodsName = $1, weight = $2, description = $3, costPrice = $4, sellingPrice = $5, inventoryNumber = $6, type_id = $7 WHERE goods_id = $8',
        [goodsName, weight, description, costPrice, sellingPrice, inventoryNumber, type_id, goods_id],
        (err, results) => {
            if (err) {
                throw err
            }
            pool.query('SELECT * FROM GOODS WHERE available = $1', [true], (error, results) => {
                if (error)
                    throw error
                res.status(200).json(results.rows)
            })
        }
    )
}

const deleteGoods = (req, res) => {
    const goods_id = req.params.id
    pool.query(
        'UPDATE GOODS SET available = $1 WHERE goods_id = $2',
        [false, goods_id],
        (err, results) => {
            if (err) {
                throw err
            }
            pool.query('SELECT * FROM GOODS WHERE available = $1', [true], (error, results) => {
                if (error)
                    throw error
                res.status(200).json(results.rows)
            })
        }
    )
}

module.exports = {
    getGoods,
    getGoodsById,
    addGoods,
    updateGoods,
    deleteGoods,
    getGoodsByWarehouse_id
    //deleteUser,
}
