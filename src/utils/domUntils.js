export const insertAfter = (newNode, curNode) => {
  curNode.parentNode.insertBefore(newNode, curNode.nextElementSibling)
}

export const domParser = (template) => {
  return new window.DOMParser().parseFromString(
    template,
    'text/html'
  ).body.firstChild
}
