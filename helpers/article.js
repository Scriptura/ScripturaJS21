'use strict'

const vv = require('../settings/variables'),
      { dateFormat } = require('./dates'),
      { shortcodes } = require('./shortcodes')


const articleFormat = (data) => { // Travaille sur l'initialisateur d'objet envoyé par la db et retourne des résultats formatés pour les besoins de la page.
  data._title = data._name.concat(' . ', vv.siteName)
  if (data._given_name || data._family_name) {
    data._author = [data._given_name, data._family_name].join(' ')
  }
  if (!data._description) {
    data._description = data._name
    if (data._author) data._description = [data._description, data._author].join(', ')
  }
  data._creation = dateFormat(data._creation)
  data._revision = dateFormat(data._revision)
  data._content = shortcodes(data._content)
  return data
}

module.exports = { articleFormat }
