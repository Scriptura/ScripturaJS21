'use strict'

const vv = require('../settings/variables'),
      db = require('../database/db'),
      { DateTime } = require('luxon'),
      { liturgicalCalendar } = require('../helpers/liturgicalCalendar'),
      { moonPhase } = require('../helpers/astronomy'),
      { monthsInHumanLanguage } = require('../helpers/dates'),
      { uppercaseToFirstLetter } = require('../helpers/strings')

const getCalendarDay = async (year, month, day) => await db.one('SELECT * FROM __post WHERE _id = $1', '1')
  .then(data => {
    const date = [day, month, year]
    const lc = liturgicalCalendar(DateTime.fromFormat(day + month + year, 'ddMMyyyy'), 'france')
    if (lc.type) lc.type = lc.type.toLowerCase()
    data._title = `Journée du ${date.join('/')} . ${vv.siteName}`
    data._name = 'Calendrier liturgique'
    data._description = `Date du ${date.join('/')}. ${[lc.name, lc.type].filter(Boolean).join(', ')}`
    data._description = data._description.replace(/<[^>]*>?/gm, '') // @todo Regex à convertir éventuellement à l'avenir par npm sanitize-html
    data._calendar = lc
    data._moonPhase = moonPhase(new Date(year, month - 1, day, 0, 0, 0, 0))
    return data
  })
  .catch(error => console.log(error.message || error))

const getCalendarMonth = async (year, month) => await db.one('SELECT * FROM __post WHERE _id = $1', '1')
  .then(data => {
    data._title = `${uppercaseToFirstLetter(monthsInHumanLanguage(month))} ${year} . ${vv.siteName}`
    data._name = `${uppercaseToFirstLetter(monthsInHumanLanguage(month))} ${year}`
    data._description = `Pour le mois de ${monthsInHumanLanguage(month)} de l'année ${year}`
    //console.log(data)
    return data
  })
  .catch(error => console.log(error.message || error))

module.exports = { getCalendarDay, getCalendarMonth }
