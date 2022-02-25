'use strict'

const vv = require('../settings/variables'),
      { constructFullName } = require('./strings'),
      { dateFormat } = require('./dates')

const keywordFormat = (data, slug) => { // Travaille sur l'initialisateur d'objet envoyé par la db et retourne des résultats formatés pour les besoins de la page.
  console.log(data)
  data._title = ['Articles keyword list', vv.siteName].join(' | ')
  data._name = slug + ' <span>. Articles liés</span>' // @todo En attendant un get SQL du mot clé.
  if (!data._description) data._description = 'Articles in ' + vv.siteName
  //data._current = true
  return data
}

module.exports = { keywordFormat }
