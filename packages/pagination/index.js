import './index.less'
import { toDom, domParser } from '../../src/utils/domUntils'
const TemplatePagination = function (config) {
  let prev = config.hasPrev ? '<li class="pager-item prev pageup-track"><</li>' : ''
  let next = config.hasNext ? '<li class="pager-item next pagedown-track">></li>' : ''
  let pages = ''
  config.pages.forEach(element => {
    let isActive = element.isActive ? 'active' : ''
    pages += `<li class="pager-item ${isActive} pagement-track" data-num="${element.num}">${element.num}</li>`
  })
  return `<ul class="pagination">${prev}${pages}${next}</ul>`
}
export default class Pagination {
  constructor (props) {
    Object.assign(this, {
      $container: document.querySelector('.pagination'),
      total: 300,
      pageSize: 10,
      currentNum: 1,
      displayNum: 10, // 总页码
      onChange () {},
      afterChange () {},
      onOverflow () {}
    }, props)
    this.totalPage = Math.ceil(parseInt(this.total) / this.pageSize)
    this.middleNum = Math.ceil(this.displayNum / 2)
    this.$container = toDom(this.$container)
    if (this.total <= 0) { this.$container.innerHTML = ''; return }
    this._checkOverflow()
    this._render()
    this._bind()
  }

  _render () {
    // console.log('数据')
    let start = 1; let end = 1; let hasPrev = true; let hasNext = true
    let pages = []
    this.$container.innerHTML = ''
    // 小于阈值
    if (this.currentNum <= this.middleNum) {
      start = 1; end = Math.min(this.displayNum, this.totalPage)
    }

    // 大于阈值
    if (this.currentNum > this.middleNum) {
      start = this.currentNum - this.middleNum + 1
      end = +this.currentNum + this.middleNum
    }

    if (end > this.totalPage) {
      start = this.totalPage - this.displayNum
      end = this.totalPage
      if (start < 1) { start = 1 }
    }
    for (let i = start; i <= end; i++) {
      // console.log('pager added')
      pages.push({ num: i, isActive: i == this.currentNum })
    }
    if (this.currentNum == 1) { hasPrev = false }
    if (this.currentNum == this.totalPage) { hasNext = false }
    this.$pagers = domParser(TemplatePagination({ pages, hasNext, hasPrev, currentNum: this.currentNum }))

    // console.log(pages)
    if (pages.length > 1) {
      this.$container.style.display = ''
      this.$container.append(this.$pagers)
    } else {
      this.$container.style.display = 'none'
    }
  }

  _update (pageNumber) {
    this.currentNum = parseInt(pageNumber)
    this.onChange(pageNumber)
    this._render()
  }

  _checkOverflow () {
    if (this.currentNum > this.totalPage) {
      this.onOverflow()
    }
  }

  _bind () {
    this.$container.addEventListener('click', (e) => {
      const target = e.target
      let num = target.getAttribute('data-num')
      if (target.tagName == 'UL') return
      if (num) return this._update(num)
      if (target.classList.contains('prev')) return this._update(--this.currentNum)
      if (target.classList.contains('next')) return this._update(++this.currentNum)
    })
  }
}
