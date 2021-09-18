'use strict'

const { DateTime } = require('luxon')

// @see https://moment.github.io/luxon/docs/manual/formatting
// @see https://moment.github.io/luxon/demo/global.html

const dateFormat = date => DateTime.fromJSDate(date).toFormat('dd/MM/yyyy')

const dateTimeFormat = date => DateTime.fromJSDate(date).toFormat('dd/MM/yyyy HH:mm')
//return DateTime.fromJSDate(date).setLocale('fr').toLocaleString(DateTime.DATE_FULL)

const monthsInHumanLanguage = month => { // @todo En attendant le remplacement par une méthode native...
  month = parseInt(month, 10) - 1
  const months = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"]
  month = months[month]
  return month
}

module.exports = {
  dateFormat: dateFormat,
  dateTimeFormat: dateTimeFormat,
  monthsInHumanLanguage: monthsInHumanLanguage
}
