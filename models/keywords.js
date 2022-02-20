'use strict'

const db = require('../database/db'),
      { keywordsFormat } = require('../helpers/keywords')

const getKeywords = async () => await db.any('SELECT * FROM __keyword ORDER BY _name ASC LIMIT 200')
  .then(data => keywordsFormat(data))
  .catch(error => console.log(error.message || error))

module.exports = { getKeywords }
