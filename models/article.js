'use strict'

const db = require('../database/db'),
      { articleFormat } = require('../helpers/article')

const getArticle = async id => await db.one('SELECT __post.*, __person._given_name, __person._family_name FROM __post INNER JOIN __person ON __post._author_id = __person._id WHERE __post._id =  $1', id)
  .then(data => articleFormat(data))
  .catch(error => console.log(error.message || error))

/*
const getArticle = async id => await db.one('SELECT * FROM __post WHERE _id = $1', id)
  .then(data => articleFormat(data))
  .catch(error => console.log(error.message || error))
*/

module.exports = { getArticle }
