const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'inventoryonlinedb',
    password: '123456789',
    port: 5432,
})

module.exports = pool;