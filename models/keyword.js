'use strict'

const db = require('../database/db'),
      { keywordFormat } = require('../helpers/keyword')

const getKeyword = async () => await db.any('SELECT * FROM __post ORDER BY _id DESC LIMIT 100')
  .then(data => keywordFormat(data))
  .catch(error => console.log(error.message || error))

module.exports = { getKeyword }
