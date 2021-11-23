
const Pool = require('pg').Pool
const logUsers = new Pool({
  user: 'derekmason',
  host: 'localhost',
  database: 'logusers',
  password: 'password',
  port: 5432,
})

module.exports = logUsers;

