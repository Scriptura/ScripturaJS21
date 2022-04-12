'use strict'

// @documentation pour les rôles et les attributs aria :
// @see https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel
// @see https://www.w3.org/TR/wai-aria-practices-1.1/examples/tabs/tabs-1/tabs.html
// @see https://www.w3.org/TR/wai-aria-practices-1.1/examples/tabs/tabs-2/tabs.html
// Discution de développeurs sur le W3C :
// @see https://github.com/whatwg/html/issues/1809

const tabs = (() => {
  const addTablist = (() => {
    const tabss = document.querySelectorAll('.tabs')
    for (const tabs of tabss) {
      const tablist = document.createElement('div')
      tablist.classList.add('tablist')
      tablist.setAttribute('role', 'tablist')
      tablist.setAttribute('aria-label', 'Entertainment')
      tabs.prepend(tablist)
    }
  })()
  const transformationIntoTabs = (() => {
    const summarys = document.querySelectorAll('.tabs summary')
    let i = 0
    for (const summary of summarys) {
      i++
      const html = summary.innerHTML,
            tabsummary = document.createElement('button'),
            tablist = summary.parentElement.parentElement.firstElementChild // .querySelector('.tablist')
      tabsummary.id = 'tabsummary-' + i
      tabsummary.type = 'button'
      tabsummary.classList.add('tabsummary')
      tabsummary.setAttribute('role', 'tab')
      tabsummary.setAttribute('aria-controls', 'tabpanel-' + i)
      tablist.appendChild(tabsummary) // insertion du bouton
      tabsummary.insertAdjacentHTML('beforeend', html) // insertion de son contenu
      summary.parentElement.removeChild(summary) // retrait de l'élément d'origine
    }
  })()
  const currentTab = (() => {
    const firstSummarys = document.querySelectorAll('.tabs .tabsummary:first-child')
    for (const firstSummary of firstSummarys) {
      firstSummary.classList.add('current')
      firstSummary.setAttribute('aria-selected', 'true') // TODO : à vérifier
    }
    for (const tabsummary of document.querySelectorAll('.tabs .tabsummary')) { // TODO : à vérifier
      tabsummary.addEventListener('click', () => {
        const tablist = tabsummary.parentElement.parentElement.firstElementChild // .querySelector('.tablist')
        //const tabpanels = tabsummary.parentElement.querySelectorAll('.tabpanel')
        /*
        for (const tabpanel of tabpanels) {
          tabpanel.classList.remove('current')
          tabpanel.setAttribute('aria-hidden', 'true')
        }
        */
        for (const tabsummarySibling of tablist.children) {
          tabsummarySibling.disabled = false
          tabsummarySibling.classList.remove('current')
          tabsummarySibling.setAttribute('aria-selected', 'false')
        }
        tabsummary.disabled = true
        tabsummary.classList.add('current')
        tabsummary.setAttribute('aria-selected', 'true')
        /*
        const tabpanel = document.getElementById(tabsummary.getAttribute('aria-controls'))
        tabpanel.classList.add('current')
        tabpanel.setAttribute('aria-hidden', 'false')
        */
      })
    }
  })()
  const transformationIntoPannels = (() => {
    const panels = document.querySelectorAll('.tabs details > div')
    let i = 0
    for (const panel of panels) {
      i++
      panel.id = 'tabpanel-' + i
      panel.classList.add('tabpanel')
      panel.setAttribute('role', 'tabpanel')
      panel.setAttribute('aria-labelledby', 'tabsummary-' + i)
      panel.parentElement.parentElement.appendChild(panel) // déplacement du contenu du panneau
      panel.parentElement.querySelector('details').remove() // retrait de l'élément d'origine
    }
  })()
  const tabSummarys = document.querySelectorAll('.tabsummary')
  for (const tabSummary of tabSummarys) tabSummary.addEventListener('click', () => {
    const tabs = tabSummary.parentElement.parentElement
    const currentPanel = document.getElementById(tabSummary.getAttribute('aria-controls'))
    currentPanel.style.display = 'block'
    for (const panel of tabs.querySelectorAll('.tabpanel')) {
      if (panel === currentPanel) continue
      panel.style.display = 'none'
      if (tabSummary !== tabSummary.classList.contains('current')) {
      } else {
        tabSummary.classList.remove('current')
      }
    }
  })
})()
