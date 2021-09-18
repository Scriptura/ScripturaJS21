'use strict'

// @note Essai de plugin, fonctionnel, mais remplacé par le module date-easter
// Inspired by @see https://github.com/rhnorskov/computus
// Verification des dates de Pâques @see http://5ko.free.fr/fr/easter.php

// @param {number} year
// @returns {Date} computus
// @example const computus = gregorian(1970)

const integerDivision = (dividend, divider) => Math.floor(dividend / divider)

const gregorian = year => {
  const a = year % 19
  const b = integerDivision(year, 100)
  const c = year % 100
  const d = integerDivision(b, 4)
  const e = b % 4
  const f = integerDivision(b + 8, 25)
  const g = integerDivision(b - f + 1, 3)
  const h = (19 * a + b - d - g + 15) % 30
  const i = integerDivision(c, 4)
  const k = c % 4
  const l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = integerDivision(a + 11 * h + 22 * l, 451)
  const month = integerDivision(h + l - 7 * m + 114, 31)
  const day = ((h + l - 7 * m + 114) % 31) + 1

  //return new Date(year, month - 1, day)
  //return new Date(year, month - 1, day + 1)
  return parseInt(('0' + day).slice(-2) + ('0' + month).slice(-2), 10)
}

const julian = year => {
  const a = year % 4
  const b = year % 7
  const c = year % 19
  const d = (19 * c + 15) % 30
  const e = (2 * a + 4 * b - d + 34) % 7
  const month = integerDivision(d + e + 114, 31)
  const day = ((d + e + 114) % 31) + 1

  //return new Date(year, month - 1, day + 13)
  return parseInt(('0' + day).slice(-2) + ('0' + month).slice(-2), 10) // ajouter 13 jours pour la date Orthodoxe basée sur le nouveau calendrier
}

module.exports = {
  gregorian: gregorian,
  julian: julian
}
