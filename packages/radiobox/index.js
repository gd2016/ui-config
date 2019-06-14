import { insertAfter, domParser } from '../../src/utils/domUntils'
const template = function (config) {
  return `
  <div class="dls-radio-box" data-value="${config.value}">
    <div class="icon icon-radio"></div>
    <label for="${config.id}" class="cp">${config.label}</label>
  </div>
  `
}
export default class RadioBox {
  constructor (props) {
    Object.assign(this, {
      name: 'radio',
      value: null,
      domContainer: document.querySelector('body'),
      domHtmls: [],
      onClick () {}
    }, props)
    console.log('dls-radiobox')
    this._getInputs()
    this._render()
  }

  _getInputs () {
    if (!(this.domContainer instanceof window.HTMLElement)) this.domContainer = this.domContainer[0]
    this.domRadios = this.domContainer.querySelectorAll(`input[name='${this.name}']`)
  }

  _render () {
    var self = this
    this.domRadios.forEach(function (ele) {
      let label = ele.getAttribute('data-label') || ''
      let value = ele.getAttribute('value') || ''
      let id = ele.getAttribute('id') || ''

      let domHtml = domParser(template({ label, value, id }))
      self.domHtmls.push(domHtml)
      self._bind(domHtml, ele)

      insertAfter(domHtml, ele)
      ele.style.display = 'none'
    })

    if (this.value !== null) {
      this.setValue(this.value)
    }
  }
  // 获取当前选中值
  getValue () {
    let value
    for (var i = 0; i < this.domRadios.length; i++) {
      if (this.domRadios[i].getAttribute('checked') === 'true') {
        value = this.domRadios[i].value
        break
      }
    }
    return value
  }

  setValue (value) {
    let domHtml = this.domHtmls.filter(item => {
      return item.getAttribute('data-value') == value + ''
    })[0]
    this._onClick(domHtml, domHtml.previousElementSibling)
  }

  _onClick (domHtml, domthis) {
    this.domContainer.querySelectorAll('.icon-radio').forEach(ele => {
      ele.classList.remove('active')
    })
    this.domRadios.forEach(ele => {
      ele.setAttribute('checked', false)
    })
    domthis.setAttribute('checked', true)
    domHtml.querySelector('.icon-radio').classList.add('active')
    this.onClick(domthis.value)
  }

  _bind (domHtml, ele) {
    domHtml.querySelector('label').addEventListener('click', this._onClick.bind(this, domHtml, ele))
    domHtml.querySelector('.icon-radio').addEventListener('click', this._onClick.bind(this, domHtml, ele))
  }
}
