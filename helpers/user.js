'use strict'

const vv = require('../settings/variables'),
      { dateTimeFormat } = require('./dates')

const userFormat = (data) => { // Travaille sur l'initialisateur d'objet envoyé par la db et retourne des résultats formatés pour les besoins de la page.
  // data._display_name = '' // pour les tests...
  data._entitled = 'Ulitisateur'
  if (!data._display_name) data._display_name = data._username // @todo Cette variable écrase les autres, à revoir
  data._description = [data._entitled, data._display_name].join(' : ')
  data._display_name = [data._entitled, data._display_name].join(' ')
  data._title = [data._display_name, vv.siteName].join(' | ') // respecter l'ordre de déclarations de cette variable pour garder l'héritage des configurations précédentes des variables qu'elle utilise
  data._creation = dateTimeFormat(data._creation)
  data._revision = dateTimeFormat(data._revision)
  data._last_login = dateTimeFormat(data._last_login)
  return data
}

module.exports = { userFormat: userFormat }
