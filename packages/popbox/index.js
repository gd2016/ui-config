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
import PerfectScrollBar from 'perfect-scrollbar';
export default class PopBox {
  constructor(props) {
    this.i18n = new I18n({
      data: langData
    });
    this.i18n.setLang(props.lang||'zh');
    Object.assign(this, {
      $container: $('body'),
      title: '',
      $content: '',
      customMenu: '',
      showMenu: true,
      showButton: true,
      customButton: '',
      customContent: false,
      cancelButtonText: this.i18n.get('cancel'),
      confirmButtonText: this.i18n.get('submit'),
      cancelButtonClass: '',
      confirmButtonClass: '',
      lockScroll: false,
      width: '',
      afterPop: function () { },
      beforeClose: function () { },
      afterClose: function () { },
      onSubmit: function () { },
      windowResize: true,
      emptyClickClose: false,//空白区域点击，关闭弹框
      afterCloseDestroy: true,//页面关掉后是否销毁，默认true(销毁)，(正文编辑-分类-传入false,)
      customClass: '',
      btnAlign: 'right',
      zIndex: 1003,
      modal: true,
      hide: false,
      padding: 20
    }, props)
    this.updateContent(this.$content);
  }

  updateContent(box){
    if(this.popBox) this.popBox.remove();
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
    if(this.customContent){
      this.popBox = box;  
    } else {
      this.popBox.find('.content').append(box);
    }
    if(this.customMenu) this.popBox.find('.menu').html(this.customMenu);
    if(this.customButton) this.popBox.find('.pop-content').append(this.customButton);
    if(!this.modal) this.popBox.css({background: 'white'});
    this.content = this.popBox.find('.pop-content');  
    if(this.hide) this.popBox.hide();
    this.$container.append(this.popBox);
    this._initPerfectScrollBar();
    this._initialDom();
    this._bind();
    if(!this.hide) this.afterPop();
  }

  submit() {
    this.onSubmit();
  }

  pop(){
    if(this.lockScroll){
      $('body').addClass('scroll-lock');
    }
    
    this.popBox.show();
    if(this.hide){
      this.resize();
    } 
    this.afterPop();
  }
  close() {
    this.beforeClose();
    $('body').removeClass('scroll-lock');
    if (this.afterCloseDestroy) {
      this.destroy();
    } else {
      this.popBox.hide();
    }
    this.afterClose();
  }

  destroy() {
    this._unbind();
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
  _initPerfectScrollBar(){
    this.popBox.addClass('scroll-box--wrapped scroll-box--show-axis-y ps ps--active-y ps--focus')
    this.ps = new PerfectScrollBar(this.popBox[0], {
      wheelPropagation: true,
      maxScrollbarLength: 100,
      scrollingThreshold: 0,
    })
    this.popBox.find('.ps__thumb-y').css('background-color', '#333');
  }

  _emptyClick(e){
    if(e.target.className.indexOf('pop-box-mask') > -1){
      this.close();
    }
  }
  _initialDom(){
    if(!this.showMenu) this.popBox.find('.menu').remove();
    if(this.customButton || !this.showButton) this.popBox.find('.pop-box-btn-space').remove();
    if(this.width) this.popBox.find('.pop-content').css({'width': this.width});  
    if(this.lockScroll) $('body').addClass('scroll-lock');
    if(this.padding!==20) this.$container.find('.pop-content').css({padding: this.padding});
    
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
    let zIndex = this.zIndex;
    this.$container.find('.pop-box-mask').each((i,ele)=>{
      indexArr.push($(ele).css('zIndex'));
    })
    if(indexArr.length){
      zIndex = Math.max.apply(null,indexArr) + 1;
    }
    return zIndex;
  }
}
