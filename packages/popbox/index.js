/** current used popbox on all history */
import langData from '../../src/i18n/output/all.js'
import I18n from '@ah/i18n'
import './index.less'
import PerfectScrollBar from 'perfect-scrollbar'
const template = function (config) {
  return `
    <div class="pop-box-mask" style="z-index:${config.zIndex}">
      <div class="pop-content ${config.customClass}">
        <div class="menu">
          <span class="box-label">${config.title}</span>
          <span class="box-cancel cp pop-close icon icon-close"></span>
        </div>
        <div class="content"></div>
        <div class="pop-box-btn-space submit-button-row ${config.btnAlign}">
          <span class="btn ${config.cancelButtonClass} btn-white pop-close">${config.cancelButtonText}</span>
          <span class="btn ${config.confirmButtonClass} pop-submit">${config.confirmButtonText}</span>
        </div> 
      </div>
    </div>
  `
  //
}
export default class PopBox {
  constructor (props) {
    this.i18n = new I18n({
      data: langData
    })
    this.i18n.setLang((window.i18n && window.i18n.lang) || 'zh')
    Object.assign(this, {
      $container: document.querySelector('body'),
      title: '',
      $content: '',
      customMenu: '',
      showMenu: true,
      showButton: true,
      customButton: '',
      customContent: false,
      cancelButtonText: this.i18n.get('cancel'),
      confirmButtonText: this.i18n.get('submit'),
      cancelButtonClass: '',
      confirmButtonClass: '',
      lockScroll: false,
      width: '',
      afterPop: function () { },
      beforeClose: function () { },
      afterClose: function () { },
      onSubmit: function () { },
      windowResize: true,
      emptyClickClose: false, // 空白区域点击，关闭弹框
      afterCloseDestroy: true, // 页面关掉后是否销毁，默认true(销毁)，(正文编辑-分类-传入false,)
      customClass: '',
      btnAlign: 'right',
      zIndex: 1003,
      modal: true,
      hide: false,
      padding: 20
    }, props)
    if (typeof this.$content === 'object' && !(this.$content instanceof window.HTMLElement)) this.$content = this.$content[0]
    if (!(this.$container instanceof window.HTMLElement)) this.$container = this.$container[0]
    this.updateContent(this.$content)
  }

  updateContent ($content) {
    if (this.popBox) this.popBox.parentNode.removeChild(this.popBox)
    const zIndex = this.setIndex()
    const parser = new window.DOMParser()
    this.popBox = parser.parseFromString(template({
      zIndex: zIndex,
      title: this.title,
      customClass: this.customClass,
      btnAlign: this.btnAlign,
      cancelButtonText: this.cancelButtonText,
      confirmButtonText: this.confirmButtonText,
      cancelButtonClass: this.cancelButtonClass,
      confirmButtonClass: this.confirmButtonClass
    }), 'text/html').body.firstChild
    if (this.customContent) {
      this.popBox = $content
    } else {
      if (typeof $content === 'object') this.popBox.querySelector('.content').appendChild($content)
      else this.popBox.querySelector('.content').innerHTML = $content
      if (this.customMenu) this.popBox.querySelector('.menu').innerHTML = this.customMenu
      if (this.customButton) this.popBox.querySelector('.pop-content').appendChild(this.customButton)
    }
    if (!this.modal) this.popBox.style.backgroundColor = 'white'
    this.content = this.popBox.querySelector('.pop-content')
    if (this.hide) this.popBox.style.display = 'none'
    this.$container.appendChild(this.popBox)
    this._initPerfectScrollBar()
    this._initialDom()
    this._bind()
    if (!this.hide) this.afterPop()
  }

  submit () {
    this.onSubmit()
  }

  pop () {
    if (this.lockScroll) {
      this.$container.classList.add('scroll-lock')
    }

    this.popBox.style.display = 'block'
    if (this.hide) {
      this.resize()
    }
    this.afterPop()
  }
  close () {
    this.beforeClose()
    this.$container.classList.remove('scroll-lock')
    if (this.afterCloseDestroy) {
      this.destroy()
    } else {
      this.popBox.style.display = 'none'
    }
    this.afterClose()
  }

  destroy () {
    this._unbind()
    this.popBox.parentNode.removeChild(this.popBox)
  }

  resize () {
    var contentWidth = this.content.offsetWidth
    var contentHeight = this.content.offsetHeight
    this.content.style.marginLeft = -(contentWidth / 2) + 'px'
    this.content.style.marginTop = -(contentHeight / 2) + 'px'
    let maxHeight = (window.innerHeight - (this.padding * 2)) // 防止内容高度大于窗口高度导致看不见内容
    if (contentHeight > maxHeight) {
      // outer scroll
      this.content.style.marginTop = -(window.innerHeight / 2 - this.padding) + 'px'
    }
  }
  _initPerfectScrollBar () {
    this.popBox.classList.add('scroll-box--wrapped', 'scroll-box--show-axis-y', 'ps', 'ps--active-y', 'ps--focus')
    this.ps = new PerfectScrollBar(this.popBox, {
      wheelPropagation: true,
      maxScrollbarLength: 100,
      scrollingThreshold: 0
    })
    this.popBox.querySelector('.ps__thumb-y').style.backgroundColor = '#333'
  }

  _emptyClick (e) {
    if (e.target.className.indexOf('pop-box-mask') > -1) {
      this.close()
    }
  }
  _initialDom () {
    if (!this.showMenu) this.popBox.querySelector('.menu').remove()
    if (this.customButton || !this.showButton) this.popBox.querySelector('.pop-box-btn-space').remove()
    if (this.width) this.popBox.querySelector('.pop-content').style.width = this.width
    if (this.lockScroll) $('body').addClass('scroll-lock')
    if (this.padding !== 20) this.$container.querySelector('.pop-content').style.padding = this.padding
  }
  _bind () {
    const Nodes = this.popBox.querySelectorAll('.pop-close')
    Nodes.forEach(ele => {
      ele.addEventListener('click', this.close.bind(this))
    })

    this.popBox.querySelector('.pop-submit').addEventListener('click', this.submit.bind(this))

    if (this.emptyClickClose) {
      this.popBox.addEventListener('mousedown', this._emptyClick.bind(this))
    }

    this._resize = this.resize.bind(this) // bind每次会返回一个新的函数，因此需要临时变量存储resize函数
    if (this.windowResize) {
      window.addEventListener('resize', this._resize, false)
    }

    setTimeout(e => {
      this.resize()
    })
  }

  _unbind () {
    window.removeEventListener('resize', this._resize, false)
  }

  setIndex () {
    const indexArr = []
    let zIndex = this.zIndex
    const Nodes = this.$container.querySelectorAll('.pop-box-mask')
    Nodes.length && Nodes.forEach((ele, i) => {
      indexArr.push(ele.style.zIndex)
    })
    if (indexArr.length) {
      zIndex = Math.max.apply(null, indexArr) + 1
    }
    return zIndex
  }
}
