'use strict'

const vv = require('../settings/variables'),
      { constructFullName } = require('./strings'),
      { dateFormat } = require('./dates'),
      { displayCountrie } = require('./isoCountries')

const personFormat = (data, id) => { // Travaille sur l'initialisateur d'objet envoyé par la db et retourne des résultats formatés pour les besoins de la page.
  data._full_name = constructFullName(data, id)
  data._title = [data._full_name, vv.siteName].join(' | ')
  data._birth_date = dateFormat(data._birth_date)
  data._death_date = dateFormat(data._death_date)
  if (!data._description) data._description = data._full_name // @ inclure préfixes, suffixes, date et lieu de naissance
  if (data._nationality) data._nationality = displayCountrie(data._nationality)
  return data
}

module.exports = { personFormat: personFormat }
