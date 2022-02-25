'use strict'

const vv = require('../settings/variables'),
      { dateTimeFormat } = require('./dates')

const accountFormat = (data) => { // Travaille sur l'initialisateur d'objet envoyé par la db et retourne des résultats formatés pour les besoins de la page.
  // data._display_name = '' // pour les tests...
  if (!data._display_name) data._display_name = data._username // @todo Cette variable écrase les autres, à revoir
  data._description = 'Compte utilisateur de ' + data._display_name
  data._title = data._display_name + ' . Compte utilisateur' + ' | ' + vv.siteName // respecter l'ordre de déclarations de cette variable pour garder l'héritage des configurations précédentes des variables qu'elle utilise
  data._name = data._display_name + ' <span>.&nbsp;Compte utilisateur</span>'
  data._creation = dateTimeFormat(data._creation)
  data._revision = dateTimeFormat(data._revision)
  data._last_login = dateTimeFormat(data._last_login)
  //data._current = true
  return data
}

module.exports = { accountFormat }
