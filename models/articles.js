'use strict'

const db = require('../database/db'),
      { articlesFormat } = require('../helpers/articles')

const getArticles = async () => await db.any('SELECT _id, _name, _description FROM __post ORDER BY _id DESC LIMIT 100')
  .then(data => articlesFormat(data))
  .catch(error => console.log(error.message || error))

module.exports = { getArticles }
