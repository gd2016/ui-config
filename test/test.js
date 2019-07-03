import PopBox from '../packages/popbox/index'
import '../static/style/popbox/index.less'
import '../static/style/radiobox/index.less'
import '../static/style/checkbox/index.less'
import RadioBox from '../packages/radiobox/index'
import CheckBox from '../packages/checkbox'
import Alert from '../packages/alert/index'
import TabPage from '../packages/tabpage/index'
import Pagination from '../packages/pagination/index'
import '../static/style/alert/index.less'
var pop
document.querySelector('#open').addEventListener('click', () => {
  pop = new PopBox({
    title: '标题',
    lang: 'en',
    cancelButtonText: '123',
    $content: "<h2 id='test'>是否删除？</h2>",
    padding: '20px 30px',
    width: '430px',
    // emptyClickClose: true,
    submit: () => {
      console.log('submit')
    }
  })
})

document.querySelector('#open1').addEventListener('click', () => {
  pop.pop()
})

var abRadio = new RadioBox({
  name: 'abType',
  value: 0,
  domContainer: $('.radiobox'),
  onClick: value => {
  }
})
$('#getAb').click(() => {
  $('.radiobox').find('input').each(function () {
    console.log(abRadio.getValue())
    console.log($(this), $(this).prop('checked'))
  })
})
$('#setAb').click(() => {
  abRadio.setValue('1')
})
var checkbox = new CheckBox({
  name: 'timeline-node',
  value: ['1l', 2],
  onChange: (value, bool, all) => {
  }
})
$('#checkAll').click(() => {
  checkbox.checkAll()
})
$('#cancelAll').click(() => {
  checkbox.uncheckAll()
})
$('#getValue').click(() => {
  $('.checkbox').find('input').each(function () {
    console.log($(this), $(this).prop('checked'))
  })

  console.log(checkbox.getAllCheckedValue())
})
$('#setValue').click(() => {
  checkbox.setValue(0)
})
$('#cancelValue').click(() => {
  checkbox.setValue(0, false, true)
})

$('#alert').click(() => {
  new Alert({
    text: '错误',
    type: 'error'
  })
})

new TabPage({
  container: document.querySelector('.tabs-container'),
  pageContainer: document.querySelector('#pageContainer'),
  onChange: (a, i) => {
    console.log(a, i)
  }
})

new Pagination({
  pageSize: 1,
  currentNum: 12,
  displayNum: 10,
  onChange: (d) => {
    console.log(d)
  }
})
