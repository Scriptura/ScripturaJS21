'use strict'

const countries = require('i18n-iso-countries')

/**
 * Dénomination pour les pays avec la norme ISO 3166-1 : 'alpha-2', 'alpha-3' et 'numeric'
 * @param {*} countrie 
 * @param {*} locale 
 */

const displayCountrie = (countrie, locale = 'fr') => countries.getName(countrie, locale)

module.exports = { displayCountrie: displayCountrie }
