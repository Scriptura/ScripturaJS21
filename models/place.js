'use strict'

const db = require('../database/db'),
      { placeFormat } = require('../helpers/place')

const getPlace = async id => await db.one('SELECT * FROM public.__place WHERE _id = $1', id)
  .then(data => placeFormat(data))
  .catch(error => console.log(error.message || error))

module.exports = { getPlace: getPlace }
