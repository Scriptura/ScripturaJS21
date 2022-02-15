'use strict'

const db = require('../database/db'),
      { articleFormat } = require('../helpers/article')

/*
const getArticle = db.task('article-task', async id => {
  getArticle = await id.oneOrNone('SELECT * FROM __post WHERE _id = $1', id)
  if(getArticle) {
    return id.any('SELECT * FROM __keyword WHERE _id = $1', 1) //__post._keywords
  }
  return []
})
      .then(data => articleFormat(data))
      .catch(error => console.log(error.message || error))
*/

const getArticle = async id => await db.one('SELECT * FROM __post WHERE _id = $1', id)
  .then(data => articleFormat(data))
  .catch(error => console.log(error.message || error))

module.exports = { getArticle: getArticle }
