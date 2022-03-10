'use strict'

const db = require('../database/db'),
      { articleFormat } = require('../helpers/article')

const getArticle = async id => await db.one(`
  SELECT
      __post.*,
      __person._given_name,
      __person._family_name
  FROM
      __post
      INNER JOIN __person ON __post._author_id = __person._id
  WHERE
      __post._id = $1
`, id)
  .then(data => articleFormat(data))
  .catch(error => console.log(error.message || error))

/*
const getArticle = id => db.task('get-user-events', async t => {
  const post = await t.one(`
  SELECT
      __post.*,
      __person._given_name,
      __person._family_name
  FROM
      __post
      INNER JOIN __person ON __post._author_id = __person._id
  WHERE
      __post._id = $1
  `, id)
  return t.any(`
  SELECT
      __keyword._name AS _keyword_name,
      __keyword._slug AS _keyword_slug
  FROM
      __post
      INNER JOIN __keyword_to_post ON __post._id = __keyword_to_post._post_id
      INNER JOIN __keyword ON __keyword_to_post._keyword_id = __keyword._id
  WHERE
      __post._id = $1
  ORDER BY
      __keyword._name;
  `, post._id)
})
  .then(data => articleFormat(data))
  .catch(error => console.log(error.message || error))
*/

module.exports = { getArticle }
