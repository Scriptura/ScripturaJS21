'use strict'

// -----------------------------------------------------------------------------
// @section     Support
// @description Détecte les supports et ajoute des classes dans le tag html
// -----------------------------------------------------------------------------

// @documentation Performance pour les selecteurs @see https://jsbench.me/d7kbm759bb/1
const jsDetect = (() => document.documentElement.classList.replace('no-js', 'js'))()

// @see https://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript

const touchDetect = (() => {
  const html = document.documentElement,
        touch = 'ontouchstart' in window || navigator.msMaxTouchPoints // @todo Condition à réévaluer
  touch ? html.classList.add('touch') : html.classList.add('no-touch')
})()


// -----------------------------------------------------------------------------
// @section     Get Scripts
// @description Appel de scripts
// -----------------------------------------------------------------------------

const getScript = url => new Promise((resolve, reject) => { // @see https://stackoverflow.com/questions/16839698#61903296
  const script = document.createElement('script')
  script.src = url
  script.async = 1
  script.onerror = reject
  script.onload = script.onreadystatechange = function() {
    const loadState = this.readyState
    if (loadState && loadState !== 'loaded' && loadState !== 'complete') return
    script.onload = script.onreadystatechange = null
    resolve()
  }
  document.body.appendChild(script)
})


// -----------------------------------------------------------------------------
// @section     Form validation
// @description Validation des formulaires
// -----------------------------------------------------------------------------

const getFormValidation = (() => {
  if (document.querySelector('[class*=validation]')) getScript('/scripts/formValidation.js')
})()


// -----------------------------------------------------------------------------
// @section     Utilities
// @description Utilitaires consommables pour les autres fonctions
// -----------------------------------------------------------------------------

// @documentation Performance pour le script @see https://jsbench.me/trkbm71304/
//const siblings = el => {
//  for (const sibling of el.parentElement.children) if (sibling !== el) sibling.classList.add('color')
//}

const fadeOut = (el, duration) => {
  el.style.opacity = 1
  (function fade() {
    if ((el.style.opacity -= 30 / duration) < 0) {
      el.style.opacity = 0 // reset derrière la décrémentation
      el.style.display = 'none'
    } else {
      requestAnimationFrame(fade)
    }
  })()
}

const fadeIn = (el, duration) => {
  el.style.opacity = 0
  el.style.display = 'block'
  (function fade() {
    let op = parseFloat(el.style.opacity)
    if (!((op += 30 / duration) > 1)) {
      el.style.opacity = op
      requestAnimationFrame(fade)
    }
    if (op > .99) el.style.opacity = 1 // reset derrière l'incrémentation
  })()
}


// -----------------------------------------------------------------------------
// @section     Sprites SVG
// @description Injection de spites SVG
// -----------------------------------------------------------------------------

// @params :
// - `targetElement` : élément cible
// - `spriteId` : nom du sprite
// - `svgFile` : nom du fichier de sprite (`utils.svg` par défaut)
const injectSvgSprite = (targetElement, spriteId, svgFile) => {
  const path = '/medias/sprites/' // Chemin des fichiers de sprites SVG
  if (svgFile === undefined) svgFile = 'utils'
  const icon = `<svg role="img" focusable="false"><use xlink:href="${path + svgFile}.svg#${spriteId}"></use></svg>`
  targetElement.insertAdjacentHTML('beforeEnd', icon)
}


// -----------------------------------------------------------------------------
// @section     External links
// @description Gestion des liens externes au site
// -----------------------------------------------------------------------------

// @note Par défaut tous les liens externes conduisent à l'ouverture d'un nouvel onglet, sauf les liens internes

const externalLinks = (() => {
  document.querySelectorAll('a').forEach(a => {
    if (a.hostname !== window.location.hostname) a.setAttribute('target', '_blank')
  })
})()


// -----------------------------------------------------------------------------
// @section     Cmd Print
// @description Commande pour l'impression
// -----------------------------------------------------------------------------

const cmdPrint = (() => {
  const prints = document.querySelectorAll('.cmd-print'),
        startPrint = () => window.print()
  for (const print of prints) print.onclick = startPrint
})()


// -----------------------------------------------------------------------------
// @section     Select and copy code
// @description Sélection et copie des informations d'un bloc de code
// -----------------------------------------------------------------------------

// @see https://stackoverflow.com/questions/985272/selecting-text-in-an-element-akin-to-highlighting-with-your-mouse

const selectText = node => {
  const documentBody = document.body
  if (documentBody.createTextRange) {
    const range = documentBody.createTextRange()
    range.moveToElementText(node)
    range.select()
  } else if (window.getSelection) {
    const selection = window.getSelection()
    const range = document.createRange()
    range.selectNodeContents(node)
    selection.removeAllRanges()
    selection.addRange(range)
  } else {
    console.warn('Could not select text in node: Unsupported browser.')
  }
}

const selectAndCopy = (() => {
  document.querySelectorAll('[data-select]:not(:empty)').forEach(el => {
    const button = document.createElement('button'),
          text = el.dataset.select
    button.type = 'button'
    if (el.offsetHeight < 30) button.classList.add('copy-offset')
    el.parentElement.appendChild(button)
    button.title = text
    button.ariaLabel = text
    injectSvgSprite(button, 'copy')
    button.addEventListener('click', () => {
      selectText(el)
      document.execCommand('copy')
    })
  })
})()

const addTitleCodeBlock = (() => {
  document.querySelectorAll('.pre').forEach(el => {
    const item = document.createElement('div'),
          span = document.createElement('span'),
          reqText = el.children[0].dataset.code,
          text = document.createTextNode(reqText)
    el.appendChild(item)
    injectSvgSprite(item, 'code')
    if (reqText) {
      span.appendChild(text)
      item.appendChild(span)
    }
  })
})()


// -----------------------------------------------------------------------------
// @section     Readable Password
// @description Permutation du type permettant de voir les mots de passe en clair
// -----------------------------------------------------------------------------

const readablePassword = (() => {
  const inputs = document.querySelectorAll('.input [type=password]')
  for (const input of inputs) {
    input.parentElement.classList.add('input', 'input-password')
    const button = document.createElement('button')
    button.type = 'button'
    button.title = 'See password'
    input.after(button)
    injectSvgSprite(button, 'eye')
    button.addEventListener('click', () => {
      button.removeChild(button.querySelector('svg'))
      if (input.type === 'password') {
        input.type = 'text'
        button.title = 'Hide password'
        injectSvgSprite(button, 'eye-blocked')
      } else {
        input.type = 'password'
        button.title = 'See password'
        injectSvgSprite(button, 'eye')
      }
    })
  }
})()


// -----------------------------------------------------------------------------
// @section     Dates
// @description Champs pour les dates
// -----------------------------------------------------------------------------

const dateInputToday = (() => { // @note Date du jour si présence de la classe 'today-date' @see https://css-tricks.com/prefilling-date-input/
  document.querySelectorAll('input[type="date"].today-date').forEach(e => e.valueAsDate = new Date())
})()


// -----------------------------------------------------------------------------
// @section     Multiple Select
// @description Modification du champ html de selection multiple
// -----------------------------------------------------------------------------

const multipleSelectCustom = (() => {
  document.querySelectorAll('.input select[multiple]').forEach(select => {
    const maxLength = 7,
          length = select.length
    if(length < maxLength) { // @note Permet d'afficher toutes les options du sélecteur multiple à l'écran (pour les desktops)
      select.size = length
      select.style.overflow = 'hidden'
    } else {
      select.size = maxLength
    }
  })
})()


// -----------------------------------------------------------------------------
// @section     Range inputs
// @description Slide de valeurs
// -----------------------------------------------------------------------------

const rangeInput = (() => {
  document.querySelectorAll('.range').forEach(range => {
	  const input = range.querySelector('input')
	  const output = range.querySelector('output')
		output.textContent = input.value
		input.oninput = function() {
			output.textContent = this.value
		}
  })
})()


// -----------------------------------------------------------------------------
// @section     Color inputs
// @description Champs pour les couleurs
// -----------------------------------------------------------------------------

const colorInput = (() => {
  document.querySelectorAll('.color-output input').forEach(input => {
    const output = document.createElement('output')
    input.after(output)
    const outputSelector = input.parentElement.querySelector('output')
		output.textContent = input.value
    //outputSelector.style.color = input.value
		input.oninput = function() {
      this.value = this.value
			output.textContent = this.value
      //outputSelector.style.color = this.value
		}
  })
})()


// -----------------------------------------------------------------------------
// @section     Scroll To Top
// @description Défilement vers le haut
// -----------------------------------------------------------------------------

// 1. @see http://jsfiddle.net/smc8ofgg/
// 2. Scrool sur la demi-hauteur d'une fenêtre avant apparition de la flèche.

const scrollToTop = (() => {
  const footer = document.querySelector('.footer'),
        button = document.createElement('button')
  button.type = 'button'
  button.classList.add('scroll-top')
  button.setAttribute('aria-label', 'Scroll to top')
  injectSvgSprite(button, 'arrow-up')
  footer.appendChild(button)
  const item = document.querySelector('.scroll-top')
  item.classList.add('hide')
  const position = () => { // 1
    const yy = window.innerHeight / 2 // 2
    let y = window.scrollY
    if (y > yy) item.classList.remove('hide')
    else item.classList.add('hide')
  }
  window.addEventListener('scroll', position)
  const scroll = () => { // 3
    window.scrollTo({top: 0})
  }
  item.addEventListener('click', scroll, false)
})()

/*
// Solution avec algorythme :
// @see https://stackoverflow.com/questions/15935318/smooth-scroll-to-top/55926067
// @note Script avec un effet sympa mais en conflit avec la règle CSS scroll-behavior:smooth, celle-ci doit donc être désactivée pour la durée du script.

const c = document.documentElement.scrollTop || document.body.scrollTop,
      html = document.documentElement,
      sb = window.getComputedStyle(html,null).getPropertyValue('scroll-behavior')
if (sb != 'auto') html.style.scrollBehavior = 'auto' // 4
if (c > 0) {
  window.requestAnimationFrame(scroll)
  window.scrollTo(0, c - c / 8)
}
if (sb != 'auto') html.style.scrollBehavior = ''

// L'effet behavior:smooth pourrait simplement être défini ainsi en JS (sans conflit avec CSS mais second choix pour l'animation) :

//window.scrollTo({top: 0, behavior: 'smooth'})

// Solution avec une définition scroll-behavior:smooth dans le CSS :

window.scrollTo({top: 0})
*/


// -----------------------------------------------------------------------------
// @section     Accordions
// @description Menus accordéons
// -----------------------------------------------------------------------------

// @documentation :
// Le html d'origine est composée de details > summary + div :
//.accordion
//  details
//    summary Title item
//    div Content item
// La première partie du script transforme ce code (difficile à animer) en divs en récupérant les attributs de leur état d'origine (ouvert/fermé) :
//.accordion
//  .accordion-details
//    .accordion-summary Title item
//    .accordion-content Content item
// La deuxième partie du code concerne les changements d'états des onglets/panneaux (ouvert/fermé).

// @params, deux options :
// @option 'open' : onglet ouvert par défaut ; à définir sur l'élément <details> via l'attribut 'open' (comportement html natif)
// @option 'singleTab' : un seul onglet s'ouvre à la fois ; à définir sur la div.accordion via l'attribut data-singletab

// 1. Option 'open'
// 2. 'inherit' évite une animation au chargement de la page, il est donc nécessaire, la valeur doit cependant être passée en pixels pour le calcul de l'animation. D'où la double déclaration.
// 3. Option 'singleTab'

// Inspiration pour les rôles et les attributs aria :
// @see https://www.w3.org/TR/wai-aria-practices-1.1/examples/accordion/accordion.html
// @see https://jqueryui.com/accordion/
// @see http://accessibility.athena-ict.com/aria/examples/tabpanel2.shtml

const accordion = (() => {
  document.querySelectorAll('.accordion').forEach(e => e.setAttribute('role', 'tablist'))
  const transformationOfDetails = (() => {
    document.querySelectorAll('.accordion details').forEach(details => {
      const html = details.innerHTML,
            substitute = document.createElement('div')
      substitute.classList.add('accordion-details')
      if (details.open) {
        substitute.classList.add('open') // 1
      }
      details.after(substitute, details)
      substitute.appendChild(details).insertAdjacentHTML('afterend', html)
      details.parentElement.removeChild(details)
    })
 })()
  const transformationOfSummarys = (() => {
    let i = 0
    document.querySelectorAll('.accordion summary').forEach(summary => {
      i++
      const html = summary.innerHTML,
            substitute = document.createElement('button')
      substitute.id = 'accordion-summary-' + i
      substitute.type = 'button'
      substitute.classList.add('accordion-summary')
      substitute.setAttribute('role', 'tab')
      substitute.setAttribute('aria-controls', 'accordion-panel-' + i)
      summary.after(substitute, summary)
      substitute.appendChild(summary).insertAdjacentHTML('afterend', html)
      summary.parentElement.removeChild(summary)
    })
  })()
  const transformationOfPannels = (() => {
    let i = 0
    document.querySelectorAll('.accordion > * > :last-child').forEach(panel => {
      i++
      panel.id = 'accordion-panel-' + i
      panel.classList.add('accordion-panel')
      panel.setAttribute('role', 'tabpanel')
      panel.setAttribute('aria-labelledby', 'accordion-summary-' + i)
    })
  })()
  const stateManagement = (() => {
    document.querySelectorAll('.accordion-details').forEach(details => {
      const accordionSummary = details.children[0],
            accordionPanel = details.children[1]
      if (details.classList.contains('open')) {
        accordionSummary.setAttribute('aria-expanded', 'true')
        accordionPanel.style.maxHeight = 'inherit' // 2
        accordionPanel.style.maxHeight = accordionPanel.scrollHeight + 'px' // 2
        accordionPanel.setAttribute('aria-hidden', 'false')
      }
      else {
        accordionSummary.setAttribute('aria-expanded', 'false')
        accordionPanel.setAttribute('aria-hidden', 'true')
      }
    })
    document.querySelectorAll('.accordion-summary').forEach(accordionSummary => {
      accordionSummary.addEventListener('click', () => {
        const singleTab = accordionSummary.parentElement.parentElement.dataset.singletab // 3
        accordionSummary.parentElement.classList.toggle('open')
        if (accordionSummary.parentElement.classList.contains('open'))
          accordionSummary.setAttribute('aria-expanded', 'true')
        else
          accordionSummary.setAttribute('aria-expanded', 'false')
        if (singleTab) siblingStateManagement(accordionSummary.parentElement)
        const accordionPanel = accordionSummary.nextElementSibling
        if (accordionPanel.style.maxHeight) {
          accordionPanel.style.maxHeight = null
          accordionPanel.setAttribute('aria-hidden', 'true')
        }
        else {
          accordionPanel.style.maxHeight = accordionPanel.scrollHeight + 'px'
          accordionPanel.setAttribute('aria-hidden', 'false')
        }
      })
    })
  })()
  const siblingStateManagement = el => {
    for (const sibling of el.parentElement.children) {
      if (sibling !== el) {
        sibling.classList.remove('open')
        sibling.firstElementChild.setAttribute('aria-expanded', 'false')
        sibling.lastElementChild.style.maxHeight = null
        sibling.lastElementChild.setAttribute('aria-hidden', 'true')
      }
    }
  }
})()


// -----------------------------------------------------------------------------
// @section     Figure focus
// @description Zoom sur les images
// -----------------------------------------------------------------------------

const imageFocus = (() => {

  const images = document.querySelectorAll('[class*=-focus]')

  const addButtonEnlarge = (() => {
    images.forEach(e => {
      const button = document.createElement('button')
      injectSvgSprite(button, 'enlarge')
      e.appendChild(button)
      button.classList.add('icon-enlarge')
    })
  })()

  const clickImage = (() => {
    images.forEach(e => {
      e.addEventListener('click', () => {
      cloneImage(e)
      document.body.style.overflow = 'hidden'
      })
    })
  })()

  const cloneImage = image => {
    const imgTag = image.querySelector('img')
    let clone = imgTag.cloneNode(true)
    document.body.appendChild(clone)
    clone = wrapClone(clone)
    clone = clickFocusRemove(image)
  }

  const wrapClone = el => {
    const wrapper = document.createElement('div')
    wrapper.classList.add('focus-off')
    el.after(wrapper, el)
    wrapper.appendChild(el)
    addButtonShrink()
  }

  const clickFocusRemove = image => {
    const el = document.querySelector('.focus-off')
          //, button = document.querySelector('.focus-off button')
    el.addEventListener('click', () => {
      el.parentElement.removeChild(el)
      document.body.removeAttribute('style') // document.body.style.overflow = ''
      image.querySelector('button').focus() // focus sur l'image cliquée au départ
    })
  }

  const addButtonShrink = () => {
    const el = document.querySelector('.focus-off'),
          button = document.createElement('button')
    el.appendChild(button)
    injectSvgSprite(button, 'shrink')
    button.classList.add('icon-shrink')
    button.focus()
  }

})()


// -----------------------------------------------------------------------------
// @section     Main menu
// @description Menu principal
// -----------------------------------------------------------------------------

const mainMenu = (() => {
  const button = document.querySelector('.cmd-nav'),
        navigation = document.querySelector('.nav')

  //const pannel = navigation.querySelector('a')
  //if (window.innerWidth < '1372') Array.from(pannel).map(a => a.tabIndex = -1)

  button.addEventListener('click', () => {
    button.classList.toggle('active')
    navigation.classList.toggle('active')
  })
})()


// -----------------------------------------------------------------------------
// @section     Separator SVG
// @description Séparateur pour les balises <hr/>
// -----------------------------------------------------------------------------
/*
const separatorSvgForHr = (() => {
  const hrs = document.querySelectorAll('hr.hr')
  let idsprite = '195v'
  for (const hr of hrs) {
    if(hr.dataset.id) idsprite = hr.dataset.id
    const separator = `<svg role="separator" class="separator"><use xlink:href="/medias/sprites/silos.svg#${idsprite}"></use></svg>`
    hr.insertAdjacentHTML('afterEnd', separator)
    hr.remove()
  }
})()
*/


// -----------------------------------------------------------------------------
// @section     Drop cap
// @description Création de lettrines
// -----------------------------------------------------------------------------

// @note Les propriétés applicables au pseudo-élément ::first-letter varient d'un navigateur à l'autre ; la solution retenue est un wrapper en javascript 'span.dropcap' sur la première lettre.
// @note Ajout d'une class .dropcap sur le premier caractère du premier paragraphe enfant d'un élément comportant '.add-dropcap'.

const addDropCap = (() => {
  const paragraphs = document.querySelectorAll('.add-drop-cap > p:first-child')
  paragraphs.forEach(e => e.innerHTML = e.innerHTML.replace(/^(\w)/, '<span class="drop-cap">$1</span>')) // /([\p{Letter}])/u
})()


// -----------------------------------------------------------------------------
// @section     Line marks
// @description Création de marqueurs
// -----------------------------------------------------------------------------

const lineMarks = (el => {
  // @note Pour un meilleur contrôle il est préférable de définir explicitement les items plutôt que d'utiliser le sélecteur universel '*' et de procéder par exclusion.
  const els = document.querySelectorAll('.add-line-marks > p, .add-line-marks > h2, .add-line-marks > h3, .add-line-marks > h4, .add-line-marks > h5, .add-line-marks > h6, .add-line-marks > blockquote, .add-line-marks > ul, .add-line-marks > ol, .add-line-marks > [class*=grid]')
  const lineMarksAdd = el => {
    const a = document.createElement('a')
    a.setAttribute('name', 'mark' + i)
    a.setAttribute('href', '#mark' + i)
    const text = document.createTextNode(i)
    a.appendChild(text)
    a.classList.add('line-mark')
    el.appendChild(a)
  }
  let i = 0
  for (const el of els) {
    i++
    //if (i % 5 === 0) {}
    lineMarksAdd(el)
  }
})()


// -----------------------------------------------------------------------------
// @section     Seconds to time
// @description Conversion d'un nombre de secondes au format hh:mm:ss
// -----------------------------------------------------------------------------

const secondsToTime = e => { // @see https://stackoverflow.com/questions/3733227/javascript-seconds-to-minutes-and-seconds
  let hh = Math.floor(e / 3600).toString().padStart(2, '0'),
      mm = Math.floor(e % 3600 / 60).toString().padStart(2, '0'),
      ss = Math.floor(e % 60).toString().padStart(2, '0')
  if (hh == '00') hh = null // Si pas d'heures, alors info sur les heures escamotée
  return [hh, mm, ss].filter(Boolean).join(':')
}


// -----------------------------------------------------------------------------
// @section     Audio players
// @description Lecteur audio utilisant la spécification HTMLMediaElement
// -----------------------------------------------------------------------------

const audioPlayer = (() => {

  const audios = document.querySelectorAll('.audio')

  const audioDuration = (audio, i) => {
    const output = document.querySelector('.audio-player-duration')
    //console.log(secondsToTime(audio.duration))
    output.value = secondsToTime(audio.duration)
  }

  const addAudioPlayer = (() => {
    let i = 0
    for (const audio of audios) {
      i++
      const player = `<div class="audio-player"><button class="audio-play-pause"><svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><path d="M204.524 102.03L819.48 512 204.523 921.97z"/></svg></button><output class="audio-player-current-time">0:00</output><div class="progress"></div><output class="audio-player-duration">0:00</output><div><button onclick="document.document.getElementById('audio-player${i}')[0].volume += 0.1">+</button><button onclick="document.getElementById('audio-player${i}')[0].volume -= 0.1">-</button></div></div>`
      audio.id = 'audio-player' + i
      audio.insertAdjacentHTML('afterend', player)
      audio.addEventListener('loadedmetadata', audioDuration(audio, i))
    }
  })()

})()


// -----------------------------------------------------------------------------
// @section     Progress Bar
// @description Barre de progression
// -----------------------------------------------------------------------------

const progressBar = (() => {
  const progressBars = document.querySelectorAll('.progress-bar')
  progressBars.forEach(e => {
    e.insertAdjacentHTML('afterbegin', '<div></div>')
    e.querySelector('div').style.width = e.dataset.value + '%'
  })
})()


// -----------------------------------------------------------------------------
// @section     Postponed footnotes
// @description Report des notes de bas de page au côté du texte
// -----------------------------------------------------------------------------
/*
const footnotes = (() => {
  const notes = document.querySelectorAll('.footnotes > *')
  let id = 1
  for (const note of notes) {
    const a = document.querySelector('#r' + id)
    const clone = note.cloneNode(true)
    clone.classList.add('note')
    a.appendChild(clone)
    //a.insertAdjacentHTML('afterEnd', clone)
    id++
  }
})()
*/


// -----------------------------------------------------------------------------
// @section     Window onload
// @description Scripts lancés lorsque le chargement de la page est terminé
// -----------------------------------------------------------------------------

//window.onload = () => {
  //accordion()
  //jsDetect()
  //touchDetect()
//}
