'use strict'

const db = require('../database/db'),
      { accountFormat } = require('../helpers/account')

const getAccount = async username => await db.one('SELECT * FROM __account WHERE _username = $1', username)
  .then(data => accountFormat(data))
  .catch(error => console.log(error.message || error))

  const postAccount = async (username, password) => await db.one('INSERT INTO __account (_username, _password) VALUES ($1, $2) RETURNING _username', [username, password])
  .then(data => data)
  .catch(error => console.log(error.message || error))

module.exports = { getAccount, postAccount }
