const { moonPhase } = require('../helpers/astronomy.js'),
      { DateTime } = require('luxon')

describe("Moon phase", () => {

  it("n°0", () => {
    expect(moonPhase(DateTime.fromFormat('16112020', 'ddMMyyyy'))).toBe(0)
  })

  it("n°3", () => {
    expect(moonPhase(DateTime.fromFormat('27122020', 'ddMMyyyy'))).toBe(3)
  })

})
