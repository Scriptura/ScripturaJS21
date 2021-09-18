const { liturgicalCalendar } = require('../helpers/liturgicalCalendar'),
      { DateTime } = require('luxon')


/**
 * Source @see https://fr.wikipedia.org/wiki/Calendrier_liturgique_romain
 * Inspiration @see https://github.com/romcal/romcal
 * Vérification @see https://www.aelf.org/calendrier/romain/2020/01
 * La préséance est déterminée par une valeur rank dans les fichiers .json, mais dans la pratique le calendrier romain sert de base et ses valeurs peuvent être écrasées par les propres qui sont chargés après lui, sans besoin de calcul logiciel.
 * Si une fête fixe du calendrier général devient votive dans le propre d'un pays, le .json du pays concerné mentionnera une valeur vide pour le nom en lieu et place de la date ({"name": ""}), ceci afin de permettre les traitements qui annuleront la fête, la fête votive sera au final déterminée par calcul logiciel.
 * 1. Vérification des dates de Pâques @see http://5ko.free.fr/fr/easter.php
 * 2. Immaculée Conception le 08/12, si dimanche alors célébration le lundi 09/12.
 * 3. Sainte Famille le dimanche qui suit Noël, si Noël est un dimanche alors le 30/12.
 * 4. Épiphanie le 06/01 pour le calendrier général, le dimanche après le premier janvier pour la France et les autres pays qui ne chôment pas ce jour-là.
 * 5. Baptême du Seigneur célébré à la place du 1er dimanche ordinaire, ou le lendemain de l'Épiphanie si celle-ci est célébrée le 7 ou 8 janvier.
 * 6. Période de Noël à cheval sur 2 années : en fonction de la date courante on calcule l'Octave pour la fin de l'année en cours puis pour le début de l'année suivante.
 * 7. Octave de Noël à cheval sur 2 années : en fonction de la date courante on calcule l'Octave pour la fin de l'année en cours puis pour le début de l'année suivante.
 * 8. Solennité de Saint Pierre et Saint Paul : 29 juin, reporté au 30 si le 29 tombe le jour de la solennité du Sacré-Coeur.
 * 9. Saint Joseph, époux. Si la fête tombe un dimanche, autre que le Dimanche des Rameaux, celle-ci est célébrée le jour suivant, généralement le lundi 20 mars, mais seulement si une autre solennité (par exemple, un autre Saint patron de l'Église) n'est pas célébrée durant cette journée. Depuis 2008, si le jour de la Fête de Saint Joseph tombe pendant la Semaine Sainte, la célébration de sa fête est déplacée vers le jour le plus proche possible avant le 19 mars, généralement le samedi précédant la Semaine Sainte.
 * 10. Annonciation du Seigneur à Marie. Le 25 mars. Le premier lundi qui suit le deuxième dimanche de Pâques si le 25 mars se situe pendant la Semaine Sainte. Décalée au 26, si le 25 est un dimanche.
 * 11. Fête-Dieu célébrée le jeudi qui suit la Sainte-Trinité, c'est-à-dire soixante jours après Pâques, reportée au dimanche qui suit la Sainte-Trinité dans les pays où elle n'est pas inscrite au nombre des jours fériés (France).
 * 12. Nativité de Saint Jean-Baptiste : le 24 juin, reporté au 25 si le 24 juin tombe le jour de la solennité du Saint-Sacrement ou du Sacré-Coeur.
 * 13. Avent du 17 au 24, n'a pas la même préséance que le début du temps de l'Avent (=> 9)
 * 14. La Mémoire de la bienheureuse Vierge Marie, Mère de l’Église étant liée à la Pentecôte, de même que la Mémoire du Cœur immaculé de la bienheureuse Vierge Marie est conjointe à la célébration du très saint Cœur de Jésus, en cas de coïncidence avec une autre Mémoire d’un saint ou d’un bienheureux, selon la tradition liturgique de la prééminence entre les personnes, c’est la Mémoire de la bienheureuse Vierge Marie qui prévaut. Congrégation pour le Culte divin et la Discipline des Sacrements, le 24 mars 2018.
*/

describe("Liturgical calendar", () => {

  it("Premier dimanche de l'Avent le 29 novembre 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('29112020', 'ddMMyyyy'), 'france')).toMatchObject({key: "firstAdventSunday"})
  })

  it("Deuxième dimanche de l'Avent le 6 décembre 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('06122020', 'ddMMyyyy'), 'france')).toMatchObject({key: "secondAdventSunday"})
  })

  it("Immaculée Conception le 8 décembre 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('08122020', 'ddMMyyyy'), 'france')).toMatchObject({key: "immaculateConception"})
  })

  it("Immaculée Conception le 9 décembre 2019", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('09122019', 'ddMMyyyy'), 'france')).toMatchObject({key: "immaculateConception"})
  })

  it("Troisième dimanche de l'Avent le 13 décembre 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('13122020', 'ddMMyyyy'), 'france')).toMatchObject({key: "thirdAdventSunday"})
  })

  it("Quatrième dimanche de l'Avent le 20 décembre 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('20122020', 'ddMMyyyy'), 'france')).toMatchObject({key: "fourthAdventSunday"})
  })

  it("Noël le 25 décembre 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('25122020', 'ddMMyyyy'), 'france')).toMatchObject({key: "christmas"})
  })

  it("Sainte Famille le dimanche qui suit Noël, le 27 décembre 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('27122020', 'ddMMyyyy'), 'france')).toMatchObject({key: "holyFamily"})
  })

  it("Sainte Famille le 30 décembre 2022 car Noël un dimanche", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('30122022', 'ddMMyyyy'), 'france')).toMatchObject({key: "holyFamily"})
  })

  it("Sainte Marie, Mère de Dieu, le 1er janvier 2021", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('01012021', 'ddMMyyyy'), 'france')).toMatchObject({key: "maryMotherOfGod"})
  })

  it("Saint Nom de Jésus ou Sainte Geneviève, le 3 janvier 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('03012020', 'ddMMyyyy'), 'france')).toMatchObject({key: "mostHolyNameOfJesusOrGenevieveOfParis"})
  })

  it("Épiphanie le dimanche après le premier janvier pour la France", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('03012021', 'ddMMyyyy'), 'france')).toMatchObject({key: "epiphany"})
  })

  it("Informations de l'Épiphanie le 6 janvier 2020 écrasées pour la France au profit de la férie", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('06012021', 'ddMMyyyy'), 'france')).toMatchObject({key: "defaultKey"})
    expect(liturgicalCalendar(DateTime.fromFormat('06012021', 'ddMMyyyy'), 'france')).toMatchObject({priority: 13})
  })

  it("Baptême du Seigneur le 10 janvier 2021", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('10012021', 'ddMMyyyy'), 'france')).toMatchObject({key: "baptismOfTheLord"})
  })

  it("Fête de St Joseph le 19 mars 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('19032020', 'ddMMyyyy'), 'france')).toMatchObject({key: "josephHusbandOfMary"})
  })

  it("19 mars 2035 en Semaine Sainte, alors fête de St Joseph reportée au samedi avant les Rameaux, le 15 mars", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('17032035', 'ddMMyyyy'), 'france')).toMatchObject({key: "josephHusbandOfMary"})
  })

  it("Annonciation le 25 mars 2021", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('25032021', 'ddMMyyyy'), 'france')).toMatchObject({key: "annunciation"})
  })

  it("25 mars 2012 un dimanche, alors Annonciation le 26 mars", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('26032012', 'ddMMyyyy'), 'france')).toMatchObject({key: "annunciation"})
  })

  it("25 mars 2024 pendant la Semaine Sainte, alors Annonciation le 8 avril", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('08042024', 'ddMMyyyy'), 'france')).toMatchObject({key: "annunciation"})
  })

  it("Mercredi des Cendres le 26 février 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('26022020', 'ddMMyyyy'), 'france')).toMatchObject({key: "ashWednesday"})
  })

  it("Premier dimanche de Carême le 1er mars 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('01032020', 'ddMMyyyy'), 'france')).toMatchObject({key: "firstLentSunday"})
  })

  it("Deuxième dimanche de Carême", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('08032020', 'ddMMyyyy'), 'france')).toMatchObject({key: "secondLentSunday"})
  })

  it("Troisième dimanche de Carême", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('15032020', 'ddMMyyyy'), 'france')).toMatchObject({key: "thirdLentSunday"})
  })

  it("Quatrième dimanche de Carême", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('22032020', 'ddMMyyyy'), 'france')).toMatchObject({key: "fourthLentSunday"})
  })

  it("Cinquième dimanche de Carême", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('29032020', 'ddMMyyyy'), 'france')).toMatchObject({key: "fiveLentSunday"})
  })

  it("Dimanche des Rameaux", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('05042020', 'ddMMyyyy'), 'france')).toMatchObject({key: "palmSunday"})
  })

  it("Lundi Saint le 6 avril 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('06042020', 'ddMMyyyy'), 'france')).toMatchObject({key: "holyMonday"})
  })

  it("Mardi Saint le 7 avril 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('07042020', 'ddMMyyyy'), 'france')).toMatchObject({key: "holyTuesday"})
  })

  it("Mercredi Saint le 8 avril 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('08042020', 'ddMMyyyy'), 'france')).toMatchObject({key: "holyWednesday"})
  })

  it("Jeudi Saint le 9 avril 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('09042020', 'ddMMyyyy'), 'france')).toMatchObject({key: "holyThursday"})
  })

  it("Vendredi Saint le 10 avril 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('10042020', 'ddMMyyyy'), 'france')).toMatchObject({key: "goodFriday"})
  })

  it("Samedi Saint le 11 avril 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('11042020', 'ddMMyyyy'), 'france')).toMatchObject({key: "holySaturday"})
  })

  it("Pâques le 12 avril 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('12042020', 'ddMMyyyy'), 'france')).toMatchObject({key: "easter"})
  })

  it("Lundi dans l'Octave de Pâques le 13 avril 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('13042020', 'ddMMyyyy'), 'france')).toMatchObject({key: "easterMonday"})
  })

  it("Mardi dans l'Octave de Pâques le 14 avril 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('14042020', 'ddMMyyyy'), 'france')).toMatchObject({key: "easterTuesday"})
  })

  it("Mercredi dans l'Octave de Pâques le 15 avril 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('15042020', 'ddMMyyyy'), 'france')).toMatchObject({key: "easterWednesday"})
  })

  it("Jeudi dans l'Octave de Pâques le 16 avril 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('16042020', 'ddMMyyyy'), 'france')).toMatchObject({key: "easterThursday"})
  })

  it("Vendredi dans l'Octave de Pâques le 17 avril 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('17042020', 'ddMMyyyy'), 'france')).toMatchObject({key: "easterFriday"})
  })

  it("Samedi dans l'Octave de Pâques le 18 avril 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('18042020', 'ddMMyyyy'), 'france')).toMatchObject({key: "easterSaturday"})
  })

  it("Dimanche de la Divine Miséricorde le 18 avril 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('19042020', 'ddMMyyyy'), 'france')).toMatchObject({key: "divineMercySunday"})
  })

  it("Troisième dimanche du Temps Pascal le 26 avril 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('26042020', 'ddMMyyyy'), 'france')).toMatchObject({key: "thirdSundayEaster"})
  })

  it("Quatrième dimanche du Temps Pascal le 3 mai 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('03052020', 'ddMMyyyy'), 'france')).toMatchObject({key: "fourthSundayEaster"})
  })

  it("Cinquième dimanche du Temps Pascal le 10 mai 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('10052020', 'ddMMyyyy'), 'france')).toMatchObject({key: "fiveSundayEaster"})
  })

  it("Sixième dimanche du Temps Pascal le 17 mai 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('17052020', 'ddMMyyyy'), 'france')).toMatchObject({key: "sixSundayEaster"})
  })

  it("Ascension le 30 mai 2019, à la place de Sainte Jeanne d'Arc", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('30052019', 'ddMMyyyy'), 'france')).toMatchObject({key: "ascension"})
  })

  it("Ascension le 21 mai 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('21052020', 'ddMMyyyy'), 'france')).toMatchObject({key: "ascension"})
  })

  it("Visitation de la Vierge Marie le 31 mai 2019", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('31052019', 'ddMMyyyy'), 'france')).toMatchObject({key: "visitation"})
  })

  it("Pentecôte le 31 mai 2020, remplace la fête de la Visitation qui n'a pas lieu cette année-là", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('31052020', 'ddMMyyyy'), 'france')).toMatchObject({key: "pentecost"})
  })

  it("Marie, Mère de l'Église le 1er juin 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('01062020', 'ddMMyyyy'), 'france')).toMatchObject({key: "maryMotherOfTheChurch"})
  })

  it("Sainte Trinité le 7 juin 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('07062020', 'ddMMyyyy'), 'france')).toMatchObject({key: "holyTrinity"})
  })

  it("Saint Sacrement le 14 juin 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('14062020', 'ddMMyyyy'), 'france')).toMatchObject({key: "corpusChristi"})
  })

  it("Sacré-Cœur de Jésus le 19 juin 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('19062020', 'ddMMyyyy'), 'france')).toMatchObject({key: "sacredHeart"})
  })

  it("Sacré-Cœur de Jésus le 2 juillet 2038", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('02072038', 'ddMMyyyy'), 'france')).toMatchObject({key: "sacredHeart"})
  })

  it("Cœur Immaculé de Marie le 20 juin 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('20062020', 'ddMMyyyy'), 'france')).toMatchObject({key: "immaculateHeartOfMary"})
  })

  it("Nativité de Saint Jean-Baptiste le 24 juin 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('24062020', 'ddMMyyyy'), 'france')).toMatchObject({key: "nativityOfJohnTheBaptist"})
  })

  it("24 juin 2057 jour du Saint-Sacrement, alors Nativité de Saint Jean-Baptiste le 25 juin", () => { // @todo A déterminer...
    expect(liturgicalCalendar(DateTime.fromFormat('25062057', 'ddMMyyyy'), 'france')).toMatchObject({key: "nativityOfJohnTheBaptist"})
  })

  it("24 juin 2022 jour du Sacré-Coeur, alors Nativité de Saint Jean-Baptiste le 25 juin, qui prend le pas sur le Cœur Immaculé de Marie", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('25062022', 'ddMMyyyy'), 'france')).toMatchObject({key: "nativityOfJohnTheBaptist"})
  })

  it("Saints Pierre et Paul le 29 juillet 2021", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('29072021', 'ddMMyyyy'), 'france')).toMatchObject({key: "marthaAndMaryAndLazarusOfBethany"})
  })

  it("Saints Pierre et Paul le 29 juin 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('29062020', 'ddMMyyyy'), 'france')).toMatchObject({key: "peterAndPaul"})
  })

  it("Christ Roi le 22 novembre 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('22112020', 'ddMMyyyy'), 'france')).toMatchObject({key: "christKingOfTheUniverse"})
  })

  it("Christ Roi le 21 novembre 2021, à la place de la Présentation de Marie pour cette année-là", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('21112021', 'ddMMyyyy'), 'france')).toMatchObject({key: "christKingOfTheUniverse"})
  })

  it("Noël le 25 descembre 2020", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('25122020', 'ddMMyyyy'), 'france')).toMatchObject({key: "christmas"})
  })

  it("Sortie du type de célébration en language humain", () => {
    expect(liturgicalCalendar(DateTime.fromFormat('25122020', 'ddMMyyyy'), 'france')).toMatchObject({type: "Solennité"})
    expect(liturgicalCalendar(DateTime.fromFormat('10012021', 'ddMMyyyy'), 'france')).toMatchObject({type: "Fête"})
    expect(liturgicalCalendar(DateTime.fromFormat('14122020', 'ddMMyyyy'), 'france')).toMatchObject({type: "Mémoire obligatoire"})
    expect(liturgicalCalendar(DateTime.fromFormat('13012021', 'ddMMyyyy'), 'france')).toMatchObject({type: "Mémoire facultative"})
  })

  // La vérification d'une occurance, dont on est sûr qu'elle ne se fera pas écraser par une occurence mobile, permet de vérifier l'appel du propre.
  describe("Propre pour la Belgique", () => {

    it("Saint Père Damien le 10 mai 2021", () => {
      expect(liturgicalCalendar(DateTime.fromFormat('10052021', 'ddMMyyyy'), 'belgium')).toMatchObject({key: "damienDeVeuster"})
    })

    it("Sainte Julienne du Mont-Cornillon le 7 août 2020", () => {
      expect(liturgicalCalendar(DateTime.fromFormat('07082020', 'ddMMyyyy'), 'belgium')).toMatchObject({key: "julianaOfLiege"})
    })

    it("Marie, Médiatrice de toute grâce le 31 août 2020", () => {
      expect(liturgicalCalendar(DateTime.fromFormat('31082020', 'ddMMyyyy'), 'belgium')).toMatchObject({key: "ourLadyMediatrixOfAllGrace"})
    })

    it("Saint Hubert, évêque de Liège le 3 novembre 2020", () => {
      expect(liturgicalCalendar(DateTime.fromFormat('03112020', 'ddMMyyyy'), 'belgium')).toMatchObject({key: "hubertOfLiege"})
    })

  })

  describe("Propre pour la France", () => {

    it("Sainte Jeanne d'Arc le 30 mai 2020", () => {
      expect(liturgicalCalendar(DateTime.fromFormat('30052020', 'ddMMyyyy'), 'france')).toMatchObject({key: "joanOfArc"})
    })

    it("Sainte Thérèse de l'enfant Jésus et de la Sainte Face le 1 octobre 2020", () => {
      expect(liturgicalCalendar(DateTime.fromFormat('01102020', 'ddMMyyyy'), 'france')).toMatchObject({key: "thereseOfTheChildJesusAndTheHolyFace"})
    })

  })

})
