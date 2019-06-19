export const insertAfter = (newNode: Node, curNode: Element): void => {
  curNode.parentNode.insertBefore(newNode, curNode.nextElementSibling);
};

export const domParser = (template: string): Node => {
  return new DOMParser().parseFromString(
    template,
    'text/html',
  ).body.firstChild;
};
