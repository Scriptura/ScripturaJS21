'use strict'

const db = require('../database/db'),
      { placesFormat } = require('../helpers/places')

const getPlaces = async () => await db.any('SELECT * FROM __place LIMIT 200')
  .then(data => placesFormat(data))
  .catch(error => console.log(error.message || error))

module.exports = { getPlaces }
