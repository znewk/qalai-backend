const Pool = require('pg').Pool

const pool = new Pool({
    user: 'jujxarabjllxlq',
    password: '19800aba5c6e5756ed558df78205da881f64629b1122d4cb1a2f1a237bf35232',
    host: 'ec2-54-220-243-77.eu-west-1.compute.amazonaws.com',
    port: 5432,
    database: 'd74at7lsdi95rl',
    ssl: {
        rejectUnauthorized: false,
    }
})



module.exports = pool;