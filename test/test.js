import PopBox from '../packages/popbox/index'
import '../static/style/popbox/index.less'
import '../static/style/radiobox/index.less'
import '../static/style/checkbox/index.less'
import RadioBox from '../packages/radiobox/index'
import CheckBox from '../packages/checkbox/te'
var pop
document.querySelector('#open').addEventListener('click', () => {
  pop = new PopBox({
    title: '标题',
    lang: 'en',
    cancelButtonText: '123',
    $content: "<div id='test'>123123</div>",
    padding: '20px 30px',
    emptyClickClose: true,

    submit: () => {
      console.log('submit')
    }
  })
})

document.querySelector('#open1').addEventListener('click', () => {
  pop.pop()
})

var raiod = new RadioBox({
  name: 'abType',
  value: 2,
  domContainer: document.querySelector('.radiobox'),
  onClick: value => {
    console.log(value)
  }
})
setTimeout(() => {
  raiod.setValue(1)
  console.log(raiod.getValue())
}, 2000)

var checkbox = new CheckBox({
  name: 'timeline-node',
  value: 2
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
  checkbox.setValue(0, false)
})
