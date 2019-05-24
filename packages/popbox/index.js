/** current used popbox on all history */
const template = function(config) {
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
import langData from '../../src/i18n/output/all.js';
import I18n from '@ah/i18n';
import './index.less';
export default class PopBox {
  constructor(props) {
    this.i18n = new I18n({
      data: langData,
      globalFnName: false
    });
    if(!props.lang){
      console.error('please set i18n ');
      return 
    }
    this.i18n.setLang(props.lang);
    Object.assign(this, {
      $container:$('body'),
      title: '',
      $content: '',
      customMenu: '',
      customButton: '',
      showClose: true,
      cancelButtonText: this.i18n.get('cancel'),
      confirmButtonText: this.i18n.get('submit'),
      cancelButtonClass: '',
      confirmButtonClass: '',
      lockScroll: false,
      width: '60%',
      afterPop: function () { },
      beforeClose: function () { },
      afterClose: function () { },
      onSubmit: function () { },
      windowResize: true,
      emptyClickClose: false,//空白区域点击，关闭弹框
      afterCloseDestroy: true,//页面关掉后是否销毁，默认true(销毁)，(正文编辑-分类-传入false,)
      customClass: '',
      btnAlign: 'right',
      ZINDEX: 1003,
      modal: false,
      hide: false
    }, props)
    
    this.updateContent(this.$content);
  }

  updateContent(box){
    const zIndex = this.setIndex();
    this.popBox = $(template({
      zIndex: zIndex,
      title: this.title,
      customClass: this.customClass,
      btnAlign: this.btnAlign,
      cancelButtonText: this.cancelButtonText,
      confirmButtonText: this.confirmButtonText,
      cancelButtonClass: this.cancelButtonClass,
      confirmButtonClass: this.confirmButtonClass,
    }));
    this.popBox.find('.content').append(box);
    this.popBox.find('.menu').append(this.customMenu);
    this.popBox.find('.pop-content').append(this.customButton);
    if(this.popBox) this.popBox.remove();
    this.content = this.popBox.find('.pop-content');   
    if(!this.modal){
      this.popBox.css({'background': 'none'})
    } 
    if(this.hide) this.popBox.hide();
    this.$container.append(this.popBox);
    this._initialDom();
    this._bind();
    this.afterPop();
  }

  submit() {
    this.onSubmit();
  }

  pop(){
    if(this.lockScroll){
      $('body').addClass('scroll-lock');
    }
    this.popBox.show();
  }
  close() {
    this.beforeClose();
    this._unbind();
    $('body').removeClass('scroll-lock');
    if (this.afterCloseDestroy) {
      this.destroy();
    } else {
      this.popBox.hide();
    }
    this.afterClose();
  }

  destroy() {
    this.popBox.remove();
  }

  resize() {
    var contentWidth = this.content.outerWidth(),
      contentHeight = this.content.outerHeight();
    this.content.css({
      'margin-left': - (contentWidth / 2) + 'px',
      'margin-top': - (contentHeight / 2) + 'px'
    });
    let maxHeight = (window.innerHeight - (this.padding * 2)); //防止内容高度大于窗口高度导致看不见内容
    if (contentHeight > maxHeight) {
      //outer scroll
      this.content.css({
        'margin-top': - (window.innerHeight / 2 - this.padding) + 'px'
      });
    }
  }

  _emptyClick(e){
    if(e.target.className.indexOf('pop-box-mask') > -1){
      this.close();
    }
  }
  _initialDom(){
    if(!this.showClose || this.customMenu) this.popBox.find('.pop-close').remove();
    if(!this.title || this.customMenu) this.popBox.find('.box-label').remove();
    if(this.customButton) this.popBox.find('.pop-box-btn-space').remove();
    this.popBox.find('.pop-content').css({'width': this.width});
    if(this.lockScroll){
      $('body').addClass('scroll-lock');
    }
  }
  _bind() {

    this.popBox.find('.pop-close').click(() => {
      this.close();
    });

    this.popBox.find('.pop-submit').click(() => {
      this.submit();
    });
    

    if(this.emptyClickClose){
      this.popBox.mousedown(this._emptyClick.bind(this));
    }

    if (this.windowResize) {
      $(window).on('resize.popbox',()=>{this.resize()})
    }

    setTimeout(e => {
      this.resize();
    })
  }

  _unbind(){
    $(window).off('resize.popbox')
  }

  setIndex(){
    const indexArr = [];
    let zIndex = this.ZINDEX;
    this.$container.find('.pop-box-mask').each((i,ele)=>{
      indexArr.push($(ele).css('zIndex'));
    })
    if(indexArr.length){
      zIndex = Math.max.apply(null,indexArr) + 1;
    }
    return zIndex;
  }
}
