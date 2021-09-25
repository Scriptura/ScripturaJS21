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
    input.addEventListener('change', e => input.value = input.value.replace(/  +/g, ' '), false) // @note Réduire les espaces internes dupliqués à un seul.
    input.addEventListener('change', e => input.value = input.value.trim(), false)
    input.addEventListener('change', e => input.value = input.value.replace(/^\p{CWU}/u, char => char.toLocaleUpperCase()), false)
    input.addEventListener('change', e => regexInit(input), false)
  })
  function regexInit(input) {
    const el = input.parentNode.querySelector('.alert-warning')
    if (input.value.length > 41) { // @note Il existe des noms de famille hawaïens de 35 lettres...
      let text = "Entrée invalide\u00a0: chaîne de caractères trop longue."
      createMessageError(input, el, text)
    } else if (input.value.match('\\d')) {
      let text = "Entrée invalide\u00a0: présence de caractères numériques."
      createMessageError(input, el, text)
    } else if (input.value.match('[\\\\/\\[\\]|%&!?\+÷×=±_{}()<>;:,$€£¥¢*§@~`•√π¶∆^°²©®™✓\#\"]')) { // @note Le point l'espace et les guillemets simples sont exclus du test.
      let text = "Entrée invalide\u00a0: présence de caractères spéciaux non autorisés."
      createMessageError(input, el, text)
    } else {
      removeMessageError(input, el)
    }
  }
})()

const regexEmail = (() => {
  document.querySelectorAll('.regex-email').forEach(input => {
    input.addEventListener('keyup', e => regexInit(input), false)
    input.addEventListener('change', e => input.value = input.value.replace(/ +/g, ''), false) // @note Suppression les espaces internes
    input.addEventListener('change', e => input.value = input.value.trim(), false)
    input.addEventListener('change', e => regexExit(input), false)
  })
  function regexInit(input) {
    const el = input.parentNode.querySelector('.alert-warning')
    if (input.value.match(/@.*@/)) {
      let text = "Entrée invalide\u00a0: présence de plusieurs arobases."
      createMessageError(input, el, text)
    } else {
      removeMessageError(input, el)
    }
  }
  function regexExit(input) {
    const el = input.parentNode.querySelector('.alert-warning')
    if (!input.value) { // @note Nettoyage du message d'erreur si au final l'utilisateur laisse le champ vide après avoir tenté de le compléter.
      removeMessageError(input, el)
    } else if (!input.value.match(/\S+@\S+\.\S+/)) {
      let text = "Entrée invalide\u00a0: l'addresse mail n'est pas conforme."
      createMessageError(input, el, text)
    } else if (!input.value.match(/@/)) {
      let text = "Entrée invalide\u00a0: absence du caractère arobase obligatoire."
      createMessageError(input, el, text)
    } else {
      removeMessageError(input, el)
    }
  }
})()

const regexUrl = (() => {
  document.querySelectorAll('.regex-url').forEach(input => {
    input.addEventListener('keyup', e => regexInit(input), false)
    input.addEventListener('change', e => input.value = input.value.replace(/ +/g, ''), false) // @note Suppression les espaces internes.
    input.addEventListener('change', e => input.value = input.value.trim(), false)
    input.addEventListener('change', e => input.value = input.value.replace(/^\p{CWL}/u, char => char.toLocaleLowerCase()), false) // @note Les noms de domaines et protocoles sont toujours insensibles à la case.
    input.addEventListener('change', e => regexExit(input), false)
  })
  function regexInit(input) {
    const el = input.parentNode.querySelector('.alert-warning')
    if (input.value.match(/@.*@/)) {
      let text = "Entrée invalide\u00a0: présence de plusieurs arobases."
      createMessageError(input, el, text)
    } else {
      removeMessageError(input, el)
    }
  }
  function regexExit(input) {
    const el = input.parentNode.querySelector('.alert-warning')
    if (!input.value) { // Nettoyage du message d'erreur si au final l'utilisateur laisse le champ vide après avoir tenté de le compléter.
      removeMessageError(input, el)
    } else if (!input.value.match(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)) { // @see https://stackoverflow.com/questions/3809401#3809435
      let text = "Entrée invalide\u00a0: l'url n'est pas conforme."
      createMessageError(input, el, text)
    } else {
      removeMessageError(input, el)
    }
  }
})()
