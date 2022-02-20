'use strict'

const vv = require('../settings/variables'),
      { constructFullName } = require('./strings'),
      { dateFormat } = require('./dates')

const keywordFormat = (data, id) => { // Travaille sur l'initialisateur d'objet envoyé par la db et retourne des résultats formatés pour les besoins de la page.
  data._title = ['Articles keyword list', vv.siteName].join(' | ')
  data._name = '<span>Articles list</span> for keyword'
  if (!data._description) data._description = 'Articles in ' + vv.siteName
  return data
}

module.exports = { keywordFormat }
