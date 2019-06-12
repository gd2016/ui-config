const template = function (config) {
  return `
  <div class="dls-alert-box type-${config.type} position-${config.position}">
    ${config.text}
  </div>
  `
}
export default class Alert {
  constructor (props) {
    Object.assign(this, {
      $container: document.querySelector('body'),
      type: 'message', // notice / error
      text: 'alert',
      duration: 4000, // set to false to be forever
      position: 'right-top' // center-bottom
    }, props)

    if (this.text) {
      this._render()
    }
  }

  _render () {
    const parser = new window.DOMParser()
    this.domHtml = parser.parseFromString(
      template({
        type: this.type,
        text: this.text,
        position: this.position
      }),
      'text/html'
    ).body.firstChild
    this.$container.appendChild(this.domHtml)
    if (this.duration) {
      setTimeout(() => {
        this.destory()
      }, this.duration)
    }
  }
  destory () {
    let opacity = 1
    let timer = setInterval(() => {
      opacity -= 0.3
      if (Math.ceil(opacity) === 0) {
        clearInterval(timer)
        this.domHtml.parentNode.removeChild(this.domHtml)
      } else {
        this.domHtml.style.opacity = opacity
      }
    }, 100)
  }
}
