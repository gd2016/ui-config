export const insertAfter = (newNode, curNode) => {
  curNode.parentNode.insertBefore(newNode, curNode.nextElementSibling)
}

export const domParser = (template) => {
  return new window.DOMParser().parseFromString(
    template,
    'text/html'
  ).body.firstChild
}

export const toDom = (dom) => {
  if (typeof dom === 'object' && !(dom instanceof window.HTMLElement)) dom = dom[0]
  return dom
}
