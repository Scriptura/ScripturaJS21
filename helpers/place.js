'use strict'

const vv = require('../settings/variables')

const placeFormat = data => { // Travaille sur l'initialisateur d'objet envoyé par la db et retourne des résultats formatés pour les besoins de la page.
  data._title = [data._name, vv.siteName].join(' | ')
  if (!data._description) {
    if (data._name) data._description = data._name // donnée obligatoire pour une page web
    if (data._postal_code) data._description = [data._description, data._postal_code].join(', ')
    if (data._locality) data._description = [data._description, data._locality].join(', ')
    if (data._location) data._description = [data._description, '(latitude: ' + data._location.y + ', longitude: ' + data._location.x + ')'].join(', ')
  }
  return data
}

module.exports = { placeFormat: placeFormat }
