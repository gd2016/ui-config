const template = function (config) {
  return `
  <div class="dls-check-box ${config.type}-box" data-value="${config.value}">
    <div class="icon icon-checkbox"></div>
    <label for="${config.id}" class="cp">${config.label}</label>
  </div>
  `
}
export default class Checkbox {
  constructor (props) {
    Object.assign(this, {
      name: 'check', // will find by name
      value: '', // checkbox value
      $htmls: [],
      type: 'normal', // switcher
      onChange () { } // onchange event
    }, props)
    this._getInputs()
    this._render()
  }

  _getInputs () {
    this.domCheckboxs = document.querySelectorAll(`input[name='${this.name}']`)
  }

  _render () {
    var self = this
    this.domCheckboxs.forEach(function (ele) {
      let label = ele.getAttribute('data-label') || ''
      let value = ele.getAttribute('value') || ''
      let checked = ele.getAttribute('checked')
      let id = ele.getAttribute('id')
      let domHtml = new window.DOMParser().parseFromString(
        template({ label, value, id, type: self.type }),
        'text/html'
      ).body.firstChild
      self.$htmls.push(domHtml)
      self._bind(domHtml, ele)
      self.insertAfter(domHtml, ele)
      ele.style.display = 'none'
      if (checked === 'true') {
        ele.setAttribute('checked', false)
        self._onClick(domHtml, ele)
      }
    })
  }

  insertAfter (newNode, curNode) {
    curNode.parentNode.insertBefore(newNode, curNode.nextElementSibling)
  }

  setValue (value, status = true, triggerCb = false) {
    if (this.domCheckboxs.length <= 0) { return }
    let $html = this.$htmls.filter(item => item.getAttribute('data-value') == value)[0]
    $html.previousElementSibling.setAttribute('checked', status)
    if ($html.previousElementSibling.getAttribute('checked') === 'true') {
      $html.classList.add('active')
      $html.querySelector('.icon-checkbox').classList.add('active')
    } else {
      $html.classList.remove('active')
      $html.querySelector('.icon-checkbox').classList.remove('active')
    }
    if (triggerCb) {
      this.onChange(value, status)
    }
  }

  // 获取所有已经check的value，默认不包括disabled的
  getAllCheckedValue () {
    let values = this.$htmls.filter(item => {
      return item.querySelector('.icon-checkbox').classList.contains('active')
    }).map(item => item.getAttribute('data-value') - 0)
    return values
  }

  checkAll () {
    this.$htmls.forEach($html => {
      $html.previousElementSibling.setAttribute('checked', true)
      if ($html.previousElementSibling.getAttribute('checked') === 'true') {
        $html.classList.add('active')
        $html.querySelector('.icon-checkbox').classList.add('active')
      } else {
        $html.classList.remove('active')
        $html.querySelector('.icon-checkbox').classList.remove('active')
      }
    })
  }

  uncheckAll () {
    this.$htmls.forEach($html => {
      $html.previousElementSibling.setAttribute('checked', false)
      if ($html.previousElementSibling.getAttribute('checked') === 'true') {
        $html.classList.add('active')
        $html.querySelector('.icon-checkbox').classList.add('active')
      } else {
        $html.classList.remove('active')
        $html.querySelector('.icon-checkbox').classList.remove('active')
      }
    })
  }
  _onClick ($html, $this) {
    if ($this.getAttribute('checked') === 'true') {
      $this.setAttribute('checked', false)
      $html.classList.remove('active')
      this.onChange($this.value, false)
      $html.querySelector('.icon-checkbox').classList.remove('active')
    } else {
      $this.setAttribute('checked', true)
      this.onChange($this.value, false)
      $html.classList.add('active')
      $html.querySelector('.icon-checkbox').classList.add('active')
    }
  }

  _bind ($html, $this) {
    $html.addEventListener('click', this._onClick.bind(this, $html, $this))
  }
}
