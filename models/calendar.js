'use strict'

const vv = require('../settings/variables'),
      db = require('../database/db'),
      { DateTime } = require('luxon'),
      { liturgicalCalendar } = require('../helpers/liturgicalCalendar'),
      { moonPhase } = require('../helpers/astronomy'),
      { monthsInHumanLanguage } = require('../helpers/dates'),
      { uppercaseToFirstLetter } = require('../helpers/strings')


const getCalendarDay = async (year, month, day) => await db.one('SELECT * FROM public.__post WHERE _id = $1', '1')
  .then(data => {
    const date = [day, month, year]
    const lc = liturgicalCalendar(DateTime.fromFormat(day + month + year, 'ddMMyyyy'), 'france')
    if (lc.type) lc.type = lc.type.toLowerCase()
    data._title = `Le ${date.join('.')} | ${vv.siteName}`
    data._description = `Date du ${date.join('/')}. ${[lc.name, lc.type].filter(Boolean).join(', ')}`
    data._description = data._description.replace(/<[^>]*>?/gm, '') // @todo Regex à convertir éventuellement à l'avenir par npm sanitize-html
    //console.log(lc) // retourne les données du calendrier
    data._calendar = lc
    data._moonPhase = moonPhase(new Date(year, month - 1, day, 0, 0, 0, 0))
    //const testDate = new Date()
    //data._day = ('0' + testDate.getDate()).slice(-2)
    //data._month = ('0' + (testDate.getMonth() + 1)).slice(-2)
    //console.log(data._month)
    return data
  })
  .catch(error => console.log(error.message || error))


const getCalendarMonth = async (year, month) => await db.one('SELECT * FROM public.__post WHERE _id = $1', '1')
  .then(data => {
    const dateTest = DateTime.fromFormat(month + year, 'MMyyyy')
    const daysInMonth = dateTest.daysInMonth
    let moonPhaseItem = []
    for (let i = 1; i < daysInMonth + 1; i++) {
      data._calendar = liturgicalCalendar(dateTest.plus({days: i - 1}))
      //moonPhaseItem[i] = moonPhase(new Date(year, month - 1, i - 1, 0, 0, 0, 0))
    }
    //data._moonPhase = moonPhaseItem
    data._title = `${uppercaseToFirstLetter(monthsInHumanLanguage(month))} ${year} | ${vv.siteName}`
    data._description = `Pour le mois de ${monthsInHumanLanguage(month)} de l'année ${year}`
    console.log(data)
    return data
  })
  .catch(error => console.log(error.message || error))


module.exports = {
  getCalendarDay: getCalendarDay,
  getCalendarMonth: getCalendarMonth
}
