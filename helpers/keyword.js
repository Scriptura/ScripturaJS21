'use strict'

const vv = require('../settings/variables')

const keywordFormat = (data, slug) => { // Travaille sur l'initialisateur d'objet envoyé par la db et retourne des résultats formatés pour les besoins de la page.
  console.log(data)
  data._name = slug // @todo En attendant un get SQL du mot clé.
  data._title = ['Articles keyword list for ' + data._name, vv.siteName].join(' . ')
  if (!data._description) data._description = 'Articles in ' + vv.siteName
  return data
}

module.exports = { keywordFormat }
