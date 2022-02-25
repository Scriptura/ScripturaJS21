'use strict'

const vv = require('../settings/variables'),
      { constructFullName } = require('./strings'),
      { dateFormat } = require('./dates'),
      { displayCountrie } = require('./isoCountries')

const personsFormat = (data, id) => { // Travaille sur l'initialisateur d'objet envoyé par la db et retourne des résultats formatés pour les besoins de la page.
  data._title = ['Persons list', vv.siteName].join(' | ')
  data._name = 'Personnes <span>.&nbsp;Liste</span>'
  //data._full_name = constructFullName(data, id)
  if (data._birth_date) data._birth_date = dateFormat(data._birth_date)
  if (data._death_date) data._death_date = dateFormat(data._death_date)
  if (!data._description) data._description = 'Persons list for ' + vv.siteName
  if (data._nationality) data._nationality = displayCountrie(data._nationality)
  //data._current = true
  return data
}

module.exports = { personsFormat }
