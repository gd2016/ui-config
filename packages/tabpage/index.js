/**
 * tab 页面切换器
 */

import { domParser, toDom } from '../../src/utils/domUntils'
import './index.less'
const template = function (menus) {
  let menuStr = ''
  menus.forEach(element => {
    menuStr += `<li class="dls-tab-page-item">${element.name}</li>`
  })

  return `<ul class="dls-tab-page">${menuStr}</ul>`
}
export default class DlsTabPages {
  constructor (props) {
    Object.assign(this, {
      container: '',
      pageContainer: false,
      initialIndex: 0,
      activeIndex: -1,
      pages: [], // html or $html array;
      menus: [
        { name: 'menu1', page: 'page1' },
        { name: 'menu2', page: $('<div><a>page2</a></div>') }
      ],
      beforeChange () { },
      onChange () { }
    }, props)
    if (this.pageContainer) {
      this.pageContainer = toDom(this.pageContainer)
    }
    this._render()
    if (this.initialIndex > -1) {
      setTimeout(() => {
        this.setActive(this.initialIndex)
      }, 10)
    }
    this._bind()
  }

  _render () {
    this.domhtml = domParser(template(this.menus))
    toDom(this.container).append(this.domhtml)
    this.domMenus = this.domhtml.querySelectorAll('li')
  }

  setActive (index) {
    this.domMenus.forEach(dom => {
      dom.classList.remove('active')
    })
    this.domMenus[index].classList.add('active')

    this._switchPage(index)

    this.activeIndex = index

    this.onChange(this.menus[index], index)
  }

  _switchPage (index) {
    let page = this.menus[index].page
    if (!page) { return }
    this.pageContainer.innerHTML = ''
    this.pageContainer.append(toDom(page))
  }

  _bind () {
    this.domMenus.forEach((element, index) => {
      element.addEventListener('click', this.setActive.bind(this, index))
    })
  }
}
