'use strict'

const db = require('../database/db'),
      { userFormat } = require('../helpers/user')

const getUser = async username => await db.one('SELECT * FROM public.__user WHERE _username = $1', username)
  .then(data => userFormat(data))
  .catch(error => console.log(error.message || error))

  const postUser = async (username, password) => await db.one('INSERT INTO public.__user (_username, _password) VALUES ($1, $2) RETURNING _username', [username, password])
  .then(data => data)
  .catch(error => console.log(error.message || error))

module.exports = {
  getUser: getUser,
  postUser: postUser
}
