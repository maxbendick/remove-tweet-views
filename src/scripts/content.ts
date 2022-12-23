/**
 * Finds all the places where views are displayed and hides them. 
 * Side-effect: hides analytics whatsoever for your own tweets - can be fixed.
 */
function hideViews() {
  const analyticsLinks = document.querySelectorAll(
    'a[href*="analytics"]',
  )
  analyticsLinks.forEach(element => {
    // The tweet detail page has a container with a deeper nesting
    let viewsContainer = element.parentElement
    if (viewsContainer.parentElement.role !== 'group') {
      viewsContainer = viewsContainer.parentElement
    }

    // useful for debugging
    // viewsContainer.style.border = '1px solid red'

    viewsContainer.style.display = 'none'
  })
}

/**
 * Debounces/throttles a function `f` by `ms` milliseconds.
 * Not a traditional debounce. Basically a combo of throttleTime and debounceTime in rxjs.
 * Used for performance.
 */
function debounce(f: () => void, ms: number) {
  let throttled = false
  let queued = false
  return () => {
    if (throttled) {
      queued = true
      return
    }
    throttled = true
    f()

    setTimeout(() => {
      if (queued) {
        f()
      }
      throttled = false
      queued = false
    }, ms)
  }
}

function observeChanges(f: () => void) {
  const fDebounced = debounce(() => {
    f()
  }, 1)
  let observer = new MutationObserver(() => {
    fDebounced()
  })
  observer.observe(document, { childList: true, subtree: true })
}

observeChanges(() => {
  hideViews()
})
