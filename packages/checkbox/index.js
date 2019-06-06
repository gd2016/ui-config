const template = function (config) {
  const disabled = config.disabled ? 'disabled' : ''
  return `
  <div class="dls-check-box ${config.type}-box ${disabled}" data-value="${config.value}">
    <div class="icon icon-checkbox ${disabled}"></div>
    <label for="${config.id}" class="cp">${config.label}</label>
  </div>
  `
}
export default class Checkbox {
  constructor (props) {
    Object.assign(this, {
      // $container:'',
      name: 'check', // will find by name
      label: 'Label 1', // checkbox label
      value: '', // checkbox value
      checked: '',
      disabled: false,
      $htmls: [],
      type: 'normal', // switcher
      onChange () { } // onchange event
    }, props)

    this._getInputs()
    this._render()
  }

  _getInputs () {
    this.$radios = $(`input[name='${this.name}']`)
  }

  _render () {
    var self = this
    this.$radios.each(function () {
      let name = self.name
      let label = $(this).data('label')
      let value = $(this).attr('value')
      let disabled = $(this).data('disabled')
      let checked = $(this).prop('checked')

      let id = $(this).attr('id')

      let $html = $(template({ label, value, id, type: self.type, disabled }))

      self.$htmls.push($html)

      self._bind($html, $(this))
      $(this).after($html)
      $(this).hide()
      if (checked) {
        $(this).prop('checked', false)
        self._onClick($html, $(this))
      }
    })

    // this.setValue(this.value)
  }

  setDisable (value, status = true) {
    let $html = this.$htmls.find(item => item.data('value') == value)
    if (!$html) { return }
    if (status) {
      $html.toggleClass('disabled', false)
      $html.find('.icon-checkbox').toggleClass('disabled', false)
    } else {
      $html.toggleClass('disabled', true)
      $html.find('.icon-checkbox').toggleClass('disabled', true)
    }
  }

  setValue (value, status = true, triggerCb = false) {
    if (this.$radios.length <= 0) { return }

    let $html = this.$htmls.find(item => item.data('value') == value)
    $html.prev().prop('checked', status)
    $html.toggleClass('active', $html.prev().prop('checked'))
    $html.find('.icon-checkbox').toggleClass('active', $html.prev().prop('checked'))
    if (triggerCb) {
      this.onChange(value, status)
    }
  }

  // 获取所有已经check的value，默认不包括disabled的
  getAllCheckedValue (disabled = true) {
    let $htmls

    if (disabled) {
      $htmls = this.$htmls.filter(item => !item.hasClass('disabled'))
    } else {
      $htmls = this.$htmls
    }

    let values = $htmls.filter(item => {
      return item.find('.icon-checkbox').hasClass('active')
    }).map(item => item.data('value'))

    // console.log(values);
    return values
  }

  checkAll () {
    this.$htmls.forEach($html => {
      $html.prev().prop('checked', true)
      $html.toggleClass('active', $html.prev().prop('checked'))
      $html.find('.icon-checkbox').toggleClass('active', $html.prev().prop('checked'))
    })
  }

  uncheckAll () {
    this.$htmls.forEach($html => {
      $html.prev().prop('checked', false)
      $html.toggleClass('active', $html.prev().prop('checked'))
      $html.find('.icon-checkbox').toggleClass('active', $html.prev().prop('checked'))
    })
  }
  _onClick ($html, $this) {
    if ($html.hasClass('disabled')) { return }

    console.log('clicked', $this.prop('checked'))
    $this.prop('checked', !$this.prop('checked'))
    $html.toggleClass('active')
    $html.find('.icon-checkbox').toggleClass('active')

    this.onChange($this.val(), $this.prop('checked'))
  }

  _bind ($html, $this) {
    // $html.find('label').click(this._onClick.bind(this,$html,$this));
    // $html.find('.icon-checkbox').click(this._onClick.bind(this,$html,$this));

    $html.click(this._onClick.bind(this, $html, $this))
  }
}
