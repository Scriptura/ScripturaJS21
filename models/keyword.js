'use strict'

const db = require('../database/db'),
      { keywordFormat } = require('../helpers/keyword')

const getKeyword = async slug => await db.any(`
SELECT
    __post._id,
    __post._name,
    __post._description,
    __keyword._id,
    __keyword._name AS _keyword_name
FROM
    __post
    INNER JOIN __keyword ON __post._author_id = __keyword._id AND __keyword._slug = $1
ORDER BY
    __post._id DESC
LIMIT
    100
`, slug)
  .then(data => keywordFormat(data, slug))
  .catch(error => console.log(error.message || error))

module.exports = { getKeyword }
