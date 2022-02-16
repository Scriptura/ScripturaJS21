'use strict'

const db = require('../database/db'),
      { personsFormat } = require('../helpers/persons')

const getPersons = async () => await db.any('SELECT * FROM __person LIMIT 200')
  .then(data => personsFormat(data))
  .catch(error => console.log(error.message || error))

module.exports = { getPersons }
