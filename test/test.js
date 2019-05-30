import PopBox from "../packages/popbox/index";
import RadioBox from '../packages/radiobox/index';
var pop;
$("#open").click(() => {
  pop = new PopBox({
    title: "标题",
    lang: "en",
    cancelButtonText: "123",
    afterCloseDestroy: false,
    $content:'sfa<br>sfa<br>sfa<br>sfa<br>sfa<br>',
    padding:"20px 30px",
  });
});

$("#open1").click(() => {
  pop.pop();
});


new RadioBox({
  name: 'abType',
  value: 1,
  $container: $('.radiobox'),
  onClick: value => {
    console.log(value)
  }
});