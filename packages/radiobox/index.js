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
      $container: $('body'),
      $htmls: [],
      onClick () {}
    }, props)

    this._getInputs()
    this._render()
  }

  _getInputs () {
    this.$radios = this.$container.find(`input[name='${this.name}']`)
  }

  _render () {
    var self = this
    // console.log( this.$radios)
    this.$radios.each(function () {
      let label = $(this).data('label') || ''
      let value = $(this).attr('value') || ''
      let id = $(this).attr('id') || ''

      let $html = $(template({ label, value, id }))
      self.$htmls.push($html)
      // console.log($html)

      self._bind($html, $(this))

      $(this).after($html)
      $(this).hide()
    })

    if (this.value !== null) {
      this.setValue(this.value)
    }
  }

  // 获取当前选中值
  getValue () {
    return this.$radios.val()
  }

  setValue (value) {
    // console.log({value})
    let $html = this.$htmls.find(item => {
      console.log(item.data('value'), value)
      return item.data('value') == value
    })
    // console.log($html);
    // this.$radios.val(value)
    this._onClick($html, $html.prev())
  }

  _onClick ($html, $this) {
    let inputs = this.$radios
    let $htmls = inputs.next()
    // console.log()
    $htmls.find('.icon-radio').removeClass('active')
    inputs.prop('checked', false)

    $this.prop('checked', true)
    $html.find('.icon-radio').addClass('active')

    this.onClick($this.val())
  }

  _bind ($html, $this) {
    $html.find('label').click(this._onClick.bind(this, $html, $this))
    $html.find('.icon-radio').click(this._onClick.bind(this, $html, $this))
  }
}
