import { domParser } from '../../src/utils/domUntils';
const template = (config) => {
    return `
  <div class="dls-alert-box type-${config.type} position-${config.position}">
    ${config.text}
  </div>
  `;
};
export default class Alert {
    constructor(props) {
        Object.assign(this, {
            domContainer: document.querySelector('body'),
            type: 'message',
            text: 'alert',
            duration: 4000,
            position: 'right-top',
        }, props);
        if (this.text) {
            this._render();
        }
    }
    destory() {
        let opacity = 1;
        const timer = setInterval(() => {
            opacity -= 0.3;
            if (Math.ceil(opacity) === 0) {
                clearInterval(timer);
                this.domHtml.parentNode.removeChild(this.domHtml);
            }
            else {
                const hde = this.domHtml;
                hde.style.opacity = String(opacity);
            }
        }, 100);
    }
    _render() {
        this.domHtml = domParser(template({
            type: this.type,
            text: this.text,
            position: this.position,
        }));
        this.domContainer.appendChild(this.domHtml);
        if (this.duration) {
            setTimeout(() => {
                this.destory();
            }, this.duration);
        }
    }
}
//# sourceMappingURL=index.js.map