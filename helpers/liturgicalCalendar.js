'use strict'

const fs = require('fs'),
      { DateTime, Interval } = require('luxon'),
      easterDate = require('date-easter'),
      currentDate = DateTime.local(),
      { lowercaseToFirstLetter } = require('./strings')
      //{ moveableFeasts } = require('./moveableFeasts')


/**
 * Annotations et règles placées dans le fichier de test.
 * @see helpersLiturgicalCalendar.test.js
 * /

/*
* @todo Option à développer :
* const locale = locale || 'fr'
* const epiphanyOnJan6 = epiphanyOnJan6 || false
* const christmastideIncludesTheSeasonOfEpiphany = christmastideIncludesTheSeasonOfEpiphany || true
* const corpusChristiOnThursday = corpusChristiOnThursday || false
* const ascensionOnSunday = ascensionOnSunday || false
*/

/**
 * @param {object} date, optional
 * @param {string} country, optional
 * @return {object}
 */

const liturgicalCalendar = (date = currentDate, country = 'france') => {

  if (!date.isValid) {
    console.log('Error: date is not valid')
    return false
  }

  const year = date.toFormat('yyyy'),
        month = date.toFormat('MM'),
        day = date.toFormat('dd'),
        dayMonth = day + month,
        // Chargement des .json et fusion des données :
        data = {},
        dataP = JSON.parse(fs.readFileSync('./data/json/periods.json')),
        dataF1 = JSON.parse(fs.readFileSync('./data/json/generalRomanCalendar.json')),
        dataF2 = JSON.parse(fs.readFileSync('./data/json/europeRomanCalendar.json')),
        dataF3 = JSON.parse(fs.readFileSync('./data/json/' + country + 'RomanCalendar.json')),
        dataM = JSON.parse(fs.readFileSync('./data/json/movableFeasts.json')),
        // Variables pour les fêtes mobiles :
        ge = easterDate.gregorianEaster(year),
        christmas = DateTime.fromFormat('2512' + year, 'ddMMyyyy'),
        sundayBeforeChristmas = christmas.startOf('week'),
        christKingOfTheUniverse = sundayBeforeChristmas.plus({days: -29}),
        firstAdventSunday = sundayBeforeChristmas.plus({days: -22}),
        secondAdventSunday = sundayBeforeChristmas.plus({days: -15}),
        thirdAdventSunday = sundayBeforeChristmas.plus({days: -8}),
        fourthAdventSunday = sundayBeforeChristmas.plus({days: -1}),
        december8 = DateTime.fromFormat('0812' + year, 'ddMMyyyy'),
        immaculateConception = (december8.weekday === 7) ? december8.plus({days: 1}) : december8, // 2
        holyFamily = (christmas.weekday === 7) ? DateTime.fromFormat('3012' + year, 'ddMMyyyy') : DateTime.fromFormat('2512' + year, 'ddMMyyyy').endOf('week'), // 3
        epiphany = DateTime.fromFormat('0201' + year, 'ddMMyyyy').endOf('week'), // 4
        baptismOfTheLord = epiphany > DateTime.fromFormat('0701' + year, 'ddMMyyyy') ? epiphany.plus({days: 1}) : DateTime.fromFormat('0801' + year, 'ddMMyyyy').endOf('week'), // 5
        advent17_24 = Interval.fromDateTimes(DateTime.fromFormat('1712' + year, 'ddMMyyyy'), DateTime.fromFormat('2412' + year, 'ddMMyyyy')), // 13
        advent = Interval.fromDateTimes(firstAdventSunday, christmas),
        epiphanyTide = Interval.fromDateTimes(epiphany, baptismOfTheLord.plus({days: -1})),
        christmastide = (date <= baptismOfTheLord) ? Interval.fromDateTimes(christmas.plus({years: -1}), baptismOfTheLord) : Interval.fromDateTimes(christmas, baptismOfTheLord.plus({years: 1})), // 6
        octaveOfChristmas = (date <= DateTime.fromFormat('0101' + year, 'ddMMyyyy')) ? Interval.fromDateTimes(DateTime.fromFormat('2512' + year, 'ddMMyyyy').plus({years: -1}), DateTime.fromFormat('0201' + year, 'ddMMyyyy')) : Interval.fromDateTimes(christmas, christmas.plus({days: 7})), // 7
        easter = DateTime.local(ge.year, ge.month, ge.day), // 1
        ashWednesday = easter.plus({days: -46}),
        lent = Interval.fromDateTimes(ashWednesday, easter),
        firstLentSunday = easter.plus({days: -42}),
        secondLentSunday = easter.plus({days: -35}),
        thirdLentSunday = easter.plus({days: -28}),
        fourthLentSunday = easter.plus({days: -21}),
        fiveLentSunday = easter.plus({days: -14}),
        palmSunday = easter.plus({days: -7}),
        holyMonday = easter.plus({days: -6}),
        holyTuesday = easter.plus({days: -5}),
        holyWednesday = easter.plus({days: -4}),
        holyThursday = easter.plus({days: -3}),
        goodFriday = easter.plus({days: -2}),
        holySaturday = easter.plus({days: -1}),
        easterMonday = easter.plus({days: 1}),
        easterTuesday = easter.plus({days: 2}),
        easterWednesday = easter.plus({days: 3}),
        easterThursday = easter.plus({days: 4}),
        easterFriday = easter.plus({days: 5}),
        easterSaturday = easter.plus({days: 6}),
        divineMercySunday = easter.plus({days: 7}),
        thirdSundayEaster = easter.plus({days: 14}),
        fourthSundayEaster = easter.plus({days: 21}),
        fiveSundayEaster = easter.plus({days: 28}),
        sixSundayEaster = easter.plus({days: 35}),
        ascension = easter.plus({days: 39}),
        pentecost = easter.plus({days: 49}),
        maryMotherOfTheChurch = easter.plus({days: 50}),
        holyTrinity = easter.plus({days: 56}),
        corpusChristi = easter.plus({days: 63}), // easter.plus({days: 60})
        sacredHeart = easter.plus({days: 68}),
        immaculateHeartOfMary = easter.plus({days: 69}),
        eastertide = Interval.fromDateTimes(easter, easter.plus({days: 50})),
        holyWeek = Interval.fromDateTimes(palmSunday, easter),
        easterTriduum = Interval.fromDateTimes(easter.plus({days: -3}), easter),
        octaveOfEaster = Interval.fromDateTimes(easter, easter.plus({days: 8})),
        peterAndPaul = sacredHeart.toFormat('ddMM') === '2906' ? DateTime.fromFormat('3006' + year, 'ddMMyyyy') : DateTime.fromFormat('2906' + year, 'ddMMyyyy'),
        march19 = DateTime.fromFormat('1903' + year, 'ddMMyyyy'),
        march19InHolyWeek = holyWeek.contains(march19) ? true : false,
        march19InLentSunday = (lent.contains(date) && march19.weekday === 7) ? true : false,
        josephHusbandOfMary = march19InHolyWeek ? palmSunday.plus({days: -1}) : (march19InLentSunday ? march19.plus({days: 1}) : march19), // 9
        march25 = DateTime.fromFormat('2503' + year, 'ddMMyyyy'),
        annunciation = holyWeek.contains(march25) ? divineMercySunday.plus({days: 1}) : (march25.weekday === 7 ? march25.plus({days: 1}) : march25), // 10
        nativityOfJohnTheBaptist = (corpusChristi.toFormat('ddMM') === '2406' || sacredHeart.toFormat('ddMM') === '2406') ? DateTime.fromFormat('2506' + year, 'ddMMyyyy') : DateTime.fromFormat('2406' + year, 'ddMMyyyy')


  data.p = {}
  data.f = {...dataF1[dayMonth], ...dataF2[dayMonth], ...dataF3[dayMonth]}
  data.m = {}


  // Valeurs par défaut pour les variables incontournables si pas de célébration fixe proposée ou si valeur name vide dans les .json :
  // 1. La valeur name peut-être intentionnellement vide dans un .json pour effacer une date du calendrier général ou d'un propre continental.
  if (typeof data.f.name === 'undefined' || data.f.name === '') data.f.key = "defaultKey", data.f.name = "De la férie", data.f.extra = "", data.f.color = "",  data.f.type = "",  data.f.priority = 13 // 1
  if (typeof data.f.priority === 'undefined') data.f.priority = 13


  // Si période de carême, mémoires obligatoires rétrogradées en mémoires facultatives pour l'année en cours :
  if (lent.contains(date) && data.type === 3) data.f.type = 4, data.f.priority = 12


  // Si un dimanche et si célébration en concurence inférieure à 7 alors dimanche du temps ordinaire prioritaire :
  // @todo:
  //if (date.weekday === 7 && data.priority > 7) data.name = "Dimanche du temps ordinaire", data.type = "", data.color = "green"


  const moveableFeasts = (() => {
    if (firstAdventSunday.hasSame(date, 'day')) data.m = dataM.firstAdventSunday
    if (secondAdventSunday.hasSame(date, 'day')) data.m = dataM.secondAdventSunday
    if (thirdAdventSunday.hasSame(date, 'day')) data.m = dataM.thirdAdventSunday
    if (fourthAdventSunday.hasSame(date, 'day')) data.m = dataM.fourthAdventSunday
    if (immaculateConception.hasSame(date, 'day')) data.m = dataM.immaculateConception
    if (holyFamily.hasSame(date, 'day')) data.m = dataM.holyFamily
    if (epiphany.hasSame(date, 'day')) data.m = dataM.epiphany
    if (baptismOfTheLord.hasSame(date, 'day')) data.m = dataM.baptismOfTheLord
    if (josephHusbandOfMary.hasSame(date, 'day')) data.m = dataM.josephHusbandOfMary
    if (annunciation.hasSame(date, 'day')) data.m = dataM.annunciation
    if (ashWednesday.hasSame(date, 'day')) data.m = dataM.ashWednesday
    if (firstLentSunday.hasSame(date, 'day')) data.m = dataM.firstLentSunday
    if (secondLentSunday.hasSame(date, 'day')) data.m = dataM.secondLentSunday
    if (thirdLentSunday.hasSame(date, 'day')) data.m = dataM.thirdLentSunday
    if (fourthLentSunday.hasSame(date, 'day')) data.m = dataM.fourthLentSunday
    if (fiveLentSunday.hasSame(date, 'day')) data.m = dataM.fiveLentSunday
    if (palmSunday.hasSame(date, 'day')) data.m = dataM.palmSunday
    if (holyMonday.hasSame(date, 'day')) data.m = dataM.holyMonday
    if (holyTuesday.hasSame(date, 'day')) data.m = dataM.holyTuesday
    if (holyWednesday.hasSame(date, 'day')) data.m = dataM.holyWednesday
    if (holyThursday.hasSame(date, 'day')) data.m = dataM.holyThursday // @todo type=2 en journée, type=1 le soir || @todo Type ou priority ?
    if (goodFriday.hasSame(date, 'day')) data.m = dataM.goodFriday
    if (holySaturday.hasSame(date, 'day')) data.m = dataM.holySaturday
    if (easter.hasSame(date, 'day')) data.m = dataM.easter
    if (easterMonday.hasSame(date, 'day')) data.m = dataM.easterMonday
    if (easterTuesday.hasSame(date, 'day')) data.m = dataM.easterTuesday
    if (easterWednesday.hasSame(date, 'day')) data.m = dataM.easterWednesday
    if (easterThursday.hasSame(date, 'day')) data.m = dataM.easterThursday
    if (easterFriday.hasSame(date, 'day')) data.m = dataM.easterFriday
    if (easterSaturday.hasSame(date, 'day')) data.m = dataM.easterSaturday
    if (divineMercySunday.hasSame(date, 'day')) data.m = dataM.divineMercySunday
    if (thirdSundayEaster.hasSame(date, 'day')) data.m = dataM.thirdSundayEaster
    if (fourthSundayEaster.hasSame(date, 'day')) data.m = dataM.fourthSundayEaster
    if (fiveSundayEaster.hasSame(date, 'day')) data.m = dataM.fiveSundayEaster
    if (sixSundayEaster.hasSame(date, 'day')) data.m = dataM.sixSundayEaster
    if (ascension.hasSame(date, 'day')) data.m = dataM.ascension
    if (pentecost.hasSame(date, 'day')) data.m = dataM.pentecost
    if (maryMotherOfTheChurch.hasSame(date, 'day')) data.m = dataM.maryMotherOfTheChurch
    if (holyTrinity.hasSame(date, 'day')) data.m = dataM.holyTrinity
    if (corpusChristi.hasSame(date, 'day')) data.m = dataM.corpusChristi
    if (sacredHeart.hasSame(date, 'day')) data.m = dataM.sacredHeart
    if (immaculateHeartOfMary.hasSame(date, 'day')) data.m = dataM.immaculateHeartOfMary
    if (nativityOfJohnTheBaptist.hasSame(date, 'day')) data.m = dataM.nativityOfJohnTheBaptist
    if (peterAndPaul.hasSame(date, 'day')) data.m = dataM.peterAndPaul
    if (christKingOfTheUniverse.hasSame(date, 'day')) data.m = dataM.christKingOfTheUniverse
    return data
  })()


  const liturgicalTimes = (() => {

    const seasons = (() => {
      if (advent.contains(date)) data.p = dataP.advent
      else if (christmastide.contains(date)) data.p = dataP.christmastide
      else if (lent.contains(date)) data.p = dataP.lent
      else if (eastertide.contains(date)) data.p = dataP.eastertide
      else data.p = dataP.ordinaryTime
      return data
    })()

    const subSeasons = (() => {
      if (advent17_24.contains(date)) data.p.priority = dataP.sub.advent17_24.priority
      if (octaveOfChristmas.contains(date)) data.p.name = dataP.sub.octaveOfChristmas.name, data.p.subKey = dataP.sub.octaveOfChristmas.key, data.p.priority = dataP.sub.octaveOfChristmas.priority
      if (epiphanyTide.contains(date)) data.p.name = dataP.sub.epiphanyTide.name, data.p.subKey = dataP.sub.epiphanyTide.key
      if (holyWeek.contains(date)) data.p.name = dataP.sub.holyWeek.name, data.p.subKey = dataP.sub.holyWeek.key
      if (easterTriduum.contains(date)) data.p.name = dataP.sub.easterTriduum.name, data.p.subKey = dataP.sub.easterTriduum.key
      if (octaveOfEaster.contains(date)) data.p.name = dataP.sub.octaveOfEaster.name, data.p.subKey = dataP.sub.octaveOfEaster.key
      return data
    })(data)

    return data
  })()


  const processingOfBasicInformation = (() => {
    data.key = (data.f.priority >= data.m.priority) ? data.m.key : data.f.key
    if (typeof data.key === 'undefined') data.key = 'default' + dayMonth // @todo En test...
    data.name = (data.f.priority >= data.m.priority) ? data.m.name : data.f.name
    if (typeof data.name === 'undefined') data.name = ''
    data.extra = (data.f.priority >= data.m.priority) ? data.m.extra : data.f.extra
    if (typeof data.extra === 'undefined') data.extra = ''
    data.fullName = [data.name, lowercaseToFirstLetter(data.extra)].filter(Boolean).join(', ')
    data.link = (data.f.priority >= data.m.priority) ? data.m.link : data.f.link
    if (typeof data.link === 'undefined') data.link = ''
    if (Array.isArray(data.f.color)) data.f.color = data.f.color[0] // si valeurs en tableau seule la première couleur sera prise en compte
    data.color = [...[data.p.color].concat([data.m.color]).concat([data.f.color])].filter(Boolean)
    data.type = (data.f.priority >= data.m.priority) ? data.m.type : data.f.type
    if (typeof data.type === 'undefined') data.type = ''
    const arrayPriority = [data.f.priority, data.m.priority, data.p.priority].filter(Boolean)
    data.priority = Math.min(...arrayPriority)
    data.date = `${day}/${month}/${year}`
    data.weekday = date.weekday
    return data
  })()


  const feastsInHumanLanguage = (() => {
    if (data.type === 1) data.type = "Solennité"
    else if (data.type === 2) data.type = "Fête"
    else if (data.type === 3) data.type = "Mémoire obligatoire"
    else if (data.type === 4) data.type = "Mémoire facultative"
    return data.type
  })()


  return data
}

/*
const test0 = (() => { // @todo For test.
  const dayMonthYear = '01012020'
  const dateTest = DateTime.fromFormat(dayMonthYear, 'ddMMyyyy')
  const daysInMonth = dateTest.daysInMonth
  for (let i = 1; i < daysInMonth; i++) {
    const lc = liturgicalCalendar(dateTest.plus({days: i}))
    console.log(lc)
  }
})()
*/
/*
const test1 = (() => { // @todo For test.
  const begin = 2010
  const end = 2030
  for (let i = begin; i <= end; i++) {
    const lc = liturgicalCalendar(DateTime.fromFormat('0812' + i, 'ddMMyyyy'), 'france')
    console.log(i)
    console.log(lc)
  }
})()
*/
/*
const lc = liturgicalCalendar(DateTime.fromFormat('32032021', 'ddMMyyyy'), 'france')
console.log(lc)
*/

module.exports = { liturgicalCalendar: liturgicalCalendar }
