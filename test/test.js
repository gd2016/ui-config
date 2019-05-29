import PopBox from "../packages/popbox/index";

var pop;
$("#open").click(() => {
  pop = new PopBox({
    title: "",
    lang: "en",
    cancelButtonText: "123",
    afterCloseDestroy: false,
    $content:'sfa<br>sfa<br>sfa<br>sfa<br>sfa<br>',
    padding:"20px 30px",
    // modal: false
  });
});

$("#open1").click(() => {
  pop.pop();
});
