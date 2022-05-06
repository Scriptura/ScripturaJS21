'use strict'

const vv = require('../settings/variables')

const placesFormat = (data, id) => { // Travaille sur l'initialisateur d'objet envoyé par la db et retourne des résultats formatés pour les besoins de la page.
  data._title = ['Places list', vv.siteName].join(' . ')
  data._name = 'Places <span>.&nbsp;Liste</span>'
  return data
}

module.exports = { placesFormat }
