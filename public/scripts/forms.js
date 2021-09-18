// https://www.regular-expressions.info/quickstart.html

document.querySelectorAll('[class*=regex]').forEach(input => {
  input.addEventListener('keyup', e => regexInit(input), false) // vérification à mesure de la frappe
  input.addEventListener('change', e => input.value = input.value.replace(/  +/g, ' '), false) // Supprimer les espaces internes
  input.addEventListener('change', e => input.value = input.value.trim(), false) // Supprimer les espaces externes
  input.addEventListener('change', e => input.value = input.value.replace(/^\p{CWU}/u, char => char.toLocaleUpperCase()), false)
  input.addEventListener('change', e => regexInit(input), false) // vérification après opérations de formatage
    
})

function regexInit(input) {
  let el = input.parentNode.querySelector('.error')
  if (el) el.remove()
  input.classList.add('invalid')
  el = document.createElement('p')
  el.classList.add('error')
  el.classList.add('alert-warning')
  el.style.display = 'none'
  input.parentElement.appendChild(el)
  if (input.classList.contains('regex-0')) regex0(input, el)
  if (input.classList.contains('regex-1')) regex1(input, el)
  if (input.classList.contains('regex-2')) regex2(input, el)
}

const regex0 = ((input, el) => {
  if (input.value.length > 40) { // En principe 30 est suffisant...
    el.textContent = "Champ invalide\u00a0: chaîne de caractères trop longue."
    el.style.display = 'block'
  }
})

const regex1 = ((input, el) => {
  if (input.value.match('\\d')) {
    el.textContent = "Champ invalide\u00a0: présence de caractères numériques."
    el.style.display = 'block'
  }
})

const regex2 = ((input, el) => {
  if (input.value.match('[\\\\/\\[\\]|%&!?\+÷×=_{}()<>;:,$€£¥¢*§@~`•√π¶∆^°²\#\"]')) { // Le point l'espace et les guillemets simples sont exclus du test.
    el.textContent = "Champ invalide\u00a0: présence de caractères spéciaux non autorisés."
    el.style.display = 'block'
  }
})

/*
const regexM = ((input, el) => {
  const regex = '^[^A-ZÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð]'
  if (input.value.match(regex)) {
    el.textContent = "Champ invalide :une majuscule est requise."
    el.style.display = 'block'
  }
})
*/
