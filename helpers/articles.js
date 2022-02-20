'use strict'

const vv = require('../settings/variables'),
      { constructFullName } = require('./strings'),
      { dateFormat } = require('./dates')

const articlesFormat = (data, id) => { // Travaille sur l'initialisateur d'objet envoyé par la db et retourne des résultats formatés pour les besoins de la page.
  data._title = ['Articles list', vv.siteName].join(' | ')
  data._name = 'Articles <span>.&nbsp;Liste</span>'
  if (!data._description) data._description = 'Articles in ' + vv.siteName
  return data
}

module.exports = { articlesFormat }
