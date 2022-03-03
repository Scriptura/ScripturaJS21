'use strict'

/**
 * @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
 * @param {number|string} n
 * @param {string} bcp47 ['fr-FR']
 * @param {string} style ['decimal']
 * @param {string} currency ['EUR']
 */
 const numberFormat = (n, bcp47 = 'fr-FR', style = 'decimal', currency = 'EUR') => {
    n = parseFloat(n)
    n = new Intl.NumberFormat(bcp47, {style: style, currency: currency}).format(n)
    return n
  }

module.exports = { numberFormat }
