const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host: process.env.HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.PASSWORD,
    //password: process.env.PASSWORD_HIEU || process.env.PASSWORD_TIN || process.env.PASSWORD_HUNG,
    port: process.env.PORT,
})

module.exports = pool;