'use strict'

const vv = require('../settings/variables')

const placeFormat = data => {
  data._title = [data._name, vv.siteName].join(' . ')
  data._name = data._name + ' <span>.&nbsp;Localisation</span>'
  if (!data._description) {
    if (data._name) data._description = data._name // donnée obligatoire pour une page web
    if (data._postal_code) data._description = [data._description, data._postal_code].join(', ')
    if (data._locality) data._description = [data._description, data._locality].join(', ')
    if (data._location) data._description = [data._description, '(latitude: ' + data._location.y + ', longitude: ' + data._location.x + ')'].join(', ')
  }
  //data._current = true
  return data
}

module.exports = { placeFormat }
