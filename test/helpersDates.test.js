const { monthsInHumanLanguage } = require('../helpers/dates.js')

describe("Helpers dates", () => {

  it("Date humaine pour le mois, valeur int", () => {
    expect(monthsInHumanLanguage(12)).toBe('décembre')
  })

  it("Date humaine pour le mois, valeur string", () => {
    expect(monthsInHumanLanguage('12')).toBe('décembre')
  })

})
