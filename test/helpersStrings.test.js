const { uppercaseToFirstLetter, lowercaseToFirstLetter, constructFullName, constructPrefixFullNameSuffix } = require('../helpers/strings.js')

describe("Helpers strings", () => {

  it("Capitalize first letter", () => {
    expect(uppercaseToFirstLetter('lorem ipsum dolor sit amet')).toBe('Lorem ipsum dolor sit amet')
  })

  it("Lowercase to first letter", () => {
    expect(lowercaseToFirstLetter('Lorem ipsum dolor sit amet')).toBe('lorem ipsum dolor sit amet')
  })

  describe("Construct full name", () => {

    it("Construction du nom complet à partir des données recueillies : prénom + deuxième prénom + nom de famille", () => {
      const data = {_given_name: 'Henri', _middle_name: 'Sonier', _family_name: 'de Lubac'}
      expect(constructFullName(data)).toBe('Henri Sonier de Lubac')
    })

    it("Construction du nom complet à partir des données recueillies : prénom + nom de famille", () => {
      const data = {_given_name: 'Henri', _family_name: 'de Lubac'}
      expect(constructFullName(data)).toBe('Henri de Lubac')
    })

    it("Construction du nom complet à partir des données recueillies : deuxième prénom + nom de famille", () => {
      const data = {_middle_name: 'Sonier', _family_name: 'de Lubac'}
      expect(constructFullName(data)).toBe('Sonier de Lubac')
    })

    it("Majuscule pour les noms à particules", () => {
      const data = {_family_name: 'de Lubac'}
      expect(constructFullName(data)).toBe('De Lubac')
    })

    it("Si _full_name non renseigné alors création d'un pseudo utlisateur anonyme avec l'id", () => {
      const data = {_full_name: null}
      expect(constructFullName(data, 7)).toBe('Anonyme 7')
    })

  })

  it("Construct prefix full name suffix", () => {
    const data = {_prefix: 'P.', _full_name: 'Henri Sonier de Lubac', _suffix: 's.j.'}
    expect(constructPrefixFullNameSuffix(data)).toBe('P. Henri Sonier de Lubac, s.j.')
  })

})
