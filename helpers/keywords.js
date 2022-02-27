'use strict'

const vv = require('../settings/variables'),
      { constructFullName } = require('./strings'),
      { dateFormat } = require('./dates')

const keywordsFormat = (data, id) => { // Travaille sur l'initialisateur d'objet envoyé par la db et retourne des résultats formatés pour les besoins de la page.
  data._title = ['Keywords list', vv.siteName].join(' . ')
  data._name = 'Mots-clés <span>.&nbsp;Liste</span>'
  if (!data._description) data._description = 'Keywords list for ' + vv.siteName
  return data
}

module.exports = { keywordsFormat }
