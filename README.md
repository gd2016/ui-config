# dls-ui

---

## PopBox

| Key                | Default            | Description                                                           |
| ------------------ | ------------------ | --------------------------------------------------------------------- |
| \$container        | body<element>      | 容器 (jquery 节点或者 dom 节点)                                       |
| title              | ''                 | 标题                                                                  |
| \$content          | ''                 | 内容，可以是 html，也可以是元素                                       |
| customMenu         | ''                 | 自定义头部                                                            |
| showMenu           | true               | 是否显示头部                                                          |
| showButton         | true               | 是否显示底部按钮                                                      |
| customButton       | ''                 | 自定义底部按钮                                                        |
| customContent      | false              | 是否自定义内容                                                        |
| showClose          | true               | 是否展示 close 图标                                                   |
| cancelButtonText   | i18n.get('cancel') | 取消按钮文案                                                          |
| confirmButtonText  | i18n.get('submit') | 提交按钮文案                                                          |
| cancelButtonClass  | ''                 | 取消按钮类名                                                          |
| confirmButtonClass | ''                 | 提交按钮类名                                                          |
| lockScroll         | false              | 是否在 PopBpx 出现时将 body 滚动锁定                                  |
| width              | '60%'              | 宽度（百分比或像素px）                                                  |
| afterPop           | function () { }    | 显示后回调                                                            |
| beforeClose        | function () { }    | 关闭前回调                                                            |
| afterClose         | function () { }    | 关闭后回调                                                            |
| onSubmit           | function () { }    | 点击确定事件                                                          |
| emptyClickClose    | false              | 是否空白区域点击，关闭弹框                                            |
| afterCloseDestroy  | true               | 页面关掉后是否销毁，默认 true(销毁)，(正文编辑-分类-传入 false)       |
| customClass        | ''                 | PopBox 的自定义类名                                                   |
| btnAlign           | 'right'            | 底部按钮布局方式（left,center,right）                                 |
| zIndex             | 1003               | pop-box-mask 的 z-index 值                                            |
| hide               | false              | 初始化时 是否隐藏                                                     |
| modal              | true               | 是否显示遮罩层(如果不显示，实际上只修改了背景颜色，可以再设置 ZINDEX) |
| padding            | 20                 | pop-content 内填充                                                    |

### Method

| name          | params  | return | description      |
| ------------- | ------- | ------ | ---------------- |
| updateContent | content | -      | 更新 PopBox 内容 |
| pop           | -       | -      | 弹出 PopBox      |
| close         | -       | -      | 关闭 PopBox      |

### Usage

```javascript
import { PopBox } from ‘@portal/dls-ui';


$("#open").click(()=>{
  new PopBox({title:'1',lang:'en',cancelButtonText:'123'});
})
```

## RadioBox

| Key          | Default         | Description                                                |
| ------------ | --------------- | ---------------------------------------------------------- |
| domContainer | body<element>   | 容器(jquery 节点或者 dom 节点)                             |
| name         | 'radio'         | 容器下 radio 元素的 name 值，会根据此 name 找到 radio 元素 |
| value        | ''              | 默认选中值                                                 |
| onClick      | Function(value) | 点击回调，参数是 value 值                                  |

### Method

| name     | params  | return | description       |
| -------- | ------- | ------ | ----------------- |
| getValue | content | -      | 获取选择 value 值 |
| setValue | value   | -      | 设置选中 value 值 |

**请在 js 中设置默认值，不要在 html 中设置 checked**

### Usage

```html
<div class="radiobox">
  <input
    id="ab-type-all"
    type="radio"
    name="abType"
    value="0"
    data-label="label1"
  />
  <input
    id="ab-type-person-only"
    type="radio"
    name="abType"
    value="1"
    data-label="label2"
  />
  <input
    id="ab-type-family-only"
    type="radio"
    name="abType"
    value="2"
    data-label="label3"
  />
</div>
```

```javascript
import { RadioBox } from "@portal/dls-ui";

var raiod = new RadioBox({
  name: "abType",
  value: 2,
  domContainer: document.querySelector(".radiobox"),
  onClick: value => {
    console.log(value);
  }
});
setTimeout(() => {
  raiod.setValue(1);
  console.log(raiod.getValue());
}, 2000);
```

## CheckBox

| Key          | Default                            | Description                                                      |
| ------------ | ---------------------------------- | ---------------------------------------------------------------- |
| domContainer | body<element>                      | 容器(jquery 节点或者 dom 节点)                                   |
| name         | 'checkbox'                         | 容器下 checkbox 元素的 name 值，会根据此 name 找到 checkbox 元素 |
| value        | []/''                              | 默认选中值                                                       |
| onChange     | Function(value, isCheck, allCheck) | 点击回调，参数是当前点击的 value 值,是否选中，所有选中值         |

### Method

| name               | params                        | return | description       |
| ------------------ | ----------------------------- | ------ | ----------------- |
| setValue           | (value,isCheck,triggerChange) | -      | 设置选中 value 值 |
| checkAll           | -                             | -      | 全选              |
| uncheckAll         | -                             | -      | 全不选            |
| getAllCheckedValue | -                             | []     | 选中值            |

**请在 js 中设置默认值，不要在 html 中设置 checked**

### Usage

```html
<div class="checkbox">
  <input
    id="0"
    type="checkbox"
    name="timeline-node"
    value="0"
    data-label="label1"
  />
  <input
    id="1"
    type="checkbox"
    name="timeline-node"
    value="1l"
    data-label="label2"
  />
  <input
    checked
    id="2"
    type="checkbox"
    name="timeline-node"
    value="2"
    data-label="label3"
  />
</div>
```

```javascript
import { CheckBox } from "@portal/dls-ui";

var checkbox = new CheckBox({
  name: "timeline-node",
  value: ["1l", 2],
  onChange: (value, bool, all) => {
    console.log(value, bool, all);
  }
});
$("#checkAll").click(() => {
  checkbox.checkAll();
});
$("#cancelAll").click(() => {
  checkbox.uncheckAll();
});
$("#getValue").click(() => {
  console.log(checkbox.getAllCheckedValue());
});
$("#setValue").click(() => {
  checkbox.setValue(0);
});
$("#cancelValue").click(() => {
  checkbox.setValue(0, false, true);
});
```
