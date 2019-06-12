import PopBox from '../packages/popbox/index'
import '../static/style/popbox/index.less'
import '../static/style/radiobox/index.less'
import '../static/style/checkbox/index.less'
import RadioBox from '../packages/radiobox/index'
import CheckBox from '../packages/checkbox'
import Alert from '../packages/alert/index'
import '../static/style/alert/index.less'
var pop
document.querySelector('#open').addEventListener('click', () => {
  pop = new PopBox({
    title: '标题',
    lang: 'en',
    cancelButtonText: '123',
    $content: "<h2 id='test'>是否删除？</h2>",
    padding: '20px 30px',
    // emptyClickClose: true,
    hide: true,
    submit: () => {
      console.log('submit')
    }
  })
})

document.querySelector('#open1').addEventListener('click', () => {
  pop.pop()
})

const abType = new RadioBox({
  name: 'abType',
  // value: 2,
  domContainer: $('.radiobox'),
  onClick: value => {
    console.log(value)
  }
})
new RadioBox({
  name: 'cdType',
  domContainer: $('.radiobox2'),
  // value: 1,
  onClick: value => {
    console.log(value)
  }
})
var checkbox = new CheckBox({
  name: 'timeline-node',
  value: ['1l', 2],
  onChange: (value, bool, all) => {
    console.log(value, bool, all)
  }
})
$('#checkAll').click(() => {
  checkbox.checkAll()
})
$('#cancelAll').click(() => {
  checkbox.uncheckAll()
})
$('#getValue').click(() => {
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
