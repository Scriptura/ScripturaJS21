'use strict'

const moveableFeasts = data => {
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
}

module.exports = { moveableFeasts: moveableFeasts }
