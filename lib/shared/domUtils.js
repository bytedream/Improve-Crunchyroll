/**
 * @param {string} querySelector
 * @param {Element} target
 * @returns {Promise<Element>}
 */
async function waitForElement(querySelector, target) {
  let element = target.querySelector(querySelector);
  if (element) return element;

  return new Promise(resolve => {
    new MutationObserver((_, observer) => {
      element = target.querySelector(querySelector);
      if (element) {
        observer.disconnect();
        resolve(element);
      }
    }).observe(target, {
      childList: true,
      subtree: true
    })
  });
}

/**
 *
 * @param {Node} target
 * @param {MutationObserverInit} [options]
 * @returns {AsyncGenerator<MutationRecord[]>}
 */
function mutationIterator(target, options = { childList: true }) {
  let observerResolve;

  new MutationObserver((mutations) => {
    if (!observerResolve) return;
    observerResolve(mutations);
  }).observe(target, options);

  return {
    async*[Symbol.asyncIterator]() {
      yield new Promise(resolve => observerResolve = resolve);
    }
  }
}
