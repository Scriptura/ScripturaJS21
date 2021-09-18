'use strict'

const db = require('../database/db'),
      { personFormat } = require('../helpers/person')

const getPerson = async id => await db.one('SELECT * FROM public.__person WHERE _id = $1', id)
  .then(data => personFormat(data, id))
  .catch(error => console.log(error.message || error))

module.exports = { getPerson: getPerson }
