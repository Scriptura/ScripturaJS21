'use strict'

const SunCalc = require('suncalc')

/**
 * @param {object} date DateTime
 */
const moonPhase = date => Math.round(SunCalc.getMoonIllumination(date).phase * 7)

module.exports = { moonPhase: moonPhase }
