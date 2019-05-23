## dls-ui

---



### PopBox

| Key             | Default | Description                                   |
|-----------------|---------|-----------------------------------------------|
|  $container     |$('body') | 容器 |
|  title     | '' | 标题 |
|  content     | '' |  内容，可以是html  |
|  customMenu     | '' |   自定义头部 |
|  customButton     | '' | 自定义底部按钮 | 
|  showClose     | true | 是否展示close图标 |
|  cancelButtonText  | i18n.get('cancel') | 取消按钮文案 |
|  confirmButtonText | i18n.get('submit') | 提交按钮文案 |
|  cancelButtonClass | '' |  取消按钮类名  |
|  confirmButtonClass  | ''  | 提交按钮类名  |
|  lockScroll     | false  | 是否在 PopBpx 出现时将 body 滚动锁定 |
|  width     | '60%' | 宽度（百分比或像素）  |
|  afterPop     | function () { } | 显示后回调 |
|  beforeClose     | function () { } | 关闭前回调 | 
|  afterClose     | function () { } | 关闭后回调 |
|  onSubmit     | function () { } | 点击确定事件 |
|  emptyClickClose     | false  | 是否空白区域点击，关闭弹框  |
|  afterCloseDestroy     | true | 页面关掉后是否销毁，默认true(销毁)，(正文编辑-分类-传入false) |
|  customClass     | '' | PopBox的自定义类名  |
|  btnAlign     | 'right' |  底部按钮布局方式（left,center,right） |

### Method

| name             | params | return   | description |
|-----------------|---------|---------------|--------------------------------|
|  updateContent  | content |   -   | 更新PopBox内容  |
|  pop            |    -    |   -   | 弹出PopBox     |
|  close          |    -    |   -   | 关闭PopBox     |

### Usage

```javascript
import { PopBox } from ‘@portal/dls-ui';


$("#open").click(()=>{
  new PopBox({title:'1',lang:'en',cancelButtonText:'123'});
})
```




