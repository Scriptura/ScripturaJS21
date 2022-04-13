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
      const tabList = document.createElement('div')
      tabList.classList.add('tab-list')
      tabList.setAttribute('role', 'tablist')
      tabList.setAttribute('aria-label', 'Entertainment')
      tabs.prepend(tabList)
    }
  })()
  const transformationIntoTabs = (() => {
    const summarys = document.querySelectorAll('.tabs > details > summary')
    let i = 0
    for (const summary of summarys) {
      i++
      const html = summary.innerHTML,
            tabSummary = document.createElement('button'),
            tablist = summary.parentElement.parentElement.firstElementChild // .querySelector('.tab-list')
      tabSummary.id = 'tabsummary-' + i
      tabSummary.type = 'button'
      tabSummary.classList.add('tab-summary')
      tabSummary.setAttribute('role', 'tab')
      tabSummary.setAttribute('aria-controls', 'tab-panel-' + i)
      tablist.appendChild(tabSummary) // insertion du bouton
      tabSummary.insertAdjacentHTML('beforeend', html) // insertion de son contenu
      summary.parentElement.removeChild(summary) // retrait de l'élément d'origine
    }
  })()
  const transformationIntoPannels = (() => {
    const panels = document.querySelectorAll('.tabs > details > div')
    let i = 0
    for (const panel of panels) {
      i++
      panel.id = 'tab-panel-' + i
      panel.classList.add('tab-panel')
      panel.setAttribute('role', 'tabpanel')
      panel.setAttribute('aria-labelledby', 'tabsummary-' + i)
      panel.parentElement.parentElement.appendChild(panel) // déplacement du contenu du panneau
      panel.parentElement.querySelector('details').remove() // retrait de l'élément d'origine
    }
  })()
  const currentTab = (() => {
    const firstSummarys = document.querySelectorAll('.tab-list > .tab-summary:first-child')
    for (const firstSummary of firstSummarys) {
      firstSummary.disabled = true
      firstSummary.classList.add('current')
      firstSummary.setAttribute('aria-selected', 'true') // TODO : à vérifier
    }
    for (const tabSummary of document.querySelectorAll('.tab-list > .tab-summary')) {
      tabSummary.addEventListener('click', () => {
        const tabList = tabSummary.parentElement.parentElement.firstElementChild // .querySelector('.tab-list')
        //const tabpanels = tabSummary.parentElement.querySelectorAll('.tab-panel')
        /*
        for (const tabpanel of tabpanels) {
          tabpanel.classList.remove('current')
          tabpanel.setAttribute('aria-hidden', 'true')
        }
        */
        for (const tabSummarySibling of tabList.children) {
          tabSummarySibling.disabled = false
          tabSummarySibling.classList.remove('current')
          tabSummarySibling.setAttribute('aria-selected', 'false')
        }
        tabSummary.disabled = true
        tabSummary.classList.add('current')
        tabSummary.setAttribute('aria-selected', 'true')
        /*
        const panel = document.getElementById(tabSummary.getAttribute('aria-controls'))
        panel.classList.add('current')
        panel.setAttribute('aria-hidden', 'false')
        */
      })
    }
  })()
  const currentPanel = (() => {
    const tabSummarys = document.querySelectorAll('.tab-summary')
    for (const tabSummary of tabSummarys) tabSummary.addEventListener('click', () => {
      const panels = tabSummary.parentElement.parentElement.querySelectorAll('.tab-panel') // .firstElementChild.nextSibling.children
      const currentPanel = document.getElementById(tabSummary.getAttribute('aria-controls'))
      currentPanel.style.display = 'block'
      for (const panel of panels) {
        if (panel === currentPanel) continue
        panel.style.display = 'none'
        if (tabSummary !== tabSummary.classList.contains('current')) {
        } else {
          tabSummary.classList.remove('current')
        }
      }
    })
  })()
})()
