const Pool = require('pg').Pool

const pool = new Pool({
    user: 'jkjpmfitiswrdn',
    password: '4b0813682b48febb4d42dc80e6d9d45c85bd3bdc293e63a93da373b5b20f4d36',
    host: 'ec2-52-48-159-67.eu-west-1.compute.amazonaws.com',
    port: 5432,
    database: 'dfs8or8b5ceau5',
    ssl: {
        rejectUnauthorized: false,
    }
})



module.exports = pool;