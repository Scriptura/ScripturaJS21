// @see https://www.regular-expressions.info/quickstart.html
// @see https://stackoverflow.com/questions/22937618

function createMessageError(input, el, text) {
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

const regexName = (() => {
  document.querySelectorAll('.regex-name').forEach(input => {
    input.addEventListener('keyup', e => regexInit(input), false)
    input.addEventListener('change', e => input.value = input.value.replace(/  +/g, ' '), false) // Supprimer les espaces internes
    input.addEventListener('change', e => input.value = input.value.trim(), false)
    input.addEventListener('change', e => input.value = input.value.replace(/^\p{CWU}/u, char => char.toLocaleUpperCase()), false)
    input.addEventListener('change', e => regexInit(input), false)
  })
  function regexInit(input) {
    const el = input.parentNode.querySelector('.alert-warning')
    if (input.value.length > 41) { // Il existe des noms de famille hawaïens de 35 lettres...
      let text = "Entrée invalide\u00a0: chaîne de caractères trop longue."
      createMessageError(input, el, text)
    } else if (input.value.match('\\d')) {
      let text = "Entrée invalide\u00a0: présence de caractères numériques."
      createMessageError(input, el, text)
    } else if (input.value.match('[\\\\/\\[\\]|%&!?\+÷×=±_{}()<>;:,$€£¥¢*§@~`•√π¶∆^°²©®™✓\#\"]')) { // Le point l'espace et les guillemets simples sont exclus du test.
      let text = "Entrée invalide\u00a0: présence de caractères spéciaux non autorisés."
      createMessageError(input, el, text)
    } else {
      removeMessageError(input, el)
    }
  }
})()

const regexEmail = (() => {
  document.querySelectorAll('.regex-email').forEach(input => {
    //input.addEventListener('keyup', e => regexInit(input), false)
    //input.addEventListener('change', e => input.value = input.value.trim(), false)
    input.addEventListener('change', e => regexInit(input), false)
  })
  function regexInit(input) {
    const el = input.parentNode.querySelector('.alert-warning')
    if (input.value.match(/[@]{2,}/)) {
      let text = "Entrée invalide\u00a0: présence de plusieurs arobases."
      createMessageError(input, el, text)
    } else if (!input.value.match(/@/)) {
        let text = "Entrée invalide\u00a0: absence du caractère arobase obligatoire."
        createMessageError(input, el, text)
      } else if (input.value.match(/\S+@\S+\.\S+/)) {
          let text = "Entrée invalide\u00a0: addresse mail non conforme."
          createMessageError(input, el, text)
      } else {
      removeMessageError(input, el)
    }
  }
})()
