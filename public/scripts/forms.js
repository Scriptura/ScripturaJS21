// https://www.regular-expressions.info/quickstart.html

document.querySelectorAll('[class*=regex]').forEach(input => {
  input.addEventListener('keyup', e => regexInit(input), false) // vérification à mesure de la frappe
  input.addEventListener('change', e => input.value = input.value.replace(/  +/g, ' '), false) // Supprimer les espaces internes
  input.addEventListener('change', e => input.value = input.value.trim(), false) // Supprimer les espaces externes
  input.addEventListener('change', e => input.value = input.value.replace(/^\p{CWU}/u, char => char.toLocaleUpperCase()), false)
  input.addEventListener('change', e => regexInit(input), false) // vérification après opérations de formatage
    
})

function regexInit(input) {
  let el = input.parentNode.querySelector('.alert-warning')
  if (input.classList.contains('regex-0')) regex0(input, el)
  if (input.classList.contains('regex-1')) regex1(input, el)
  if (input.classList.contains('regex-2')) regex2(input, el)
}

function createMessageError(input, el, text) {
  el = input.parentNode.querySelector('.alert-warning') // Variable à réafecter.
  input.classList.add('invalid')
  if (el) el.remove()
  el = document.createElement('p')
  el.classList.add('alert-warning')
  input.parentElement.appendChild(el)
  el.textContent = text
}

function removeMessageError(input, el) {
  input.classList.remove('invalid')
  if (el) el.remove()
}

const regex0 = ((input, el) => {
  if (input.value.length > 40) { // @todo En principe 30 est suffisant...
    let text = "Champ invalide\u00a0: chaîne de caractères trop longue."
    createMessageError(input, el, text)
  } else {
    removeMessageError(input, el)
  }
})

const regex1 = ((input, el) => {
  if (input.value.match('\\d')) {
    let text = "Champ invalide\u00a0: présence de caractères numériques."
    createMessageError(input, el, text)
  } else {
    removeMessageError(input, el)
  }
})

const regex2 = ((input, el) => {
  if (input.value.match('[\\\\/\\[\\]|%&!?\+÷×=±_{}()<>;:,$€£¥¢*§@~`•√π¶∆^°²\#\"]')) { // Le point l'espace et les guillemets simples sont exclus du test.
    let text = "Champ invalide\u00a0: présence de caractères spéciaux non autorisés."
    createMessageError(input, el, text)
  } else {
    removeMessageError(input, el)
  }
})
