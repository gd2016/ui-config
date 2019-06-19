interface TemplateConfig {
  type: string;
  position: string;
  text: string;
}
import {domParser} from '../../src/utils/domUntils';
const template = (config: TemplateConfig): string => {
  return `
  <div class="dls-alert-box type-${config.type} position-${config.position}">
    ${config.text}
  </div>
  `;
};
interface AlertProps {
  text: string;
  domContainer: Node;
  duration: number;
  type: string;
  position: string;
}
export default class Alert {
  public text: string;
  public domHtml: Node;
  public domContainer: Node;
  public duration: number;
  public type: string;
  public position: string;
  constructor(props: AlertProps) {

    Object.assign(this, {
      domContainer: document.querySelector('body'),
      type: 'message', // notice / error
      text: 'alert',
      duration: 4000, // set to false to be forever
      position: 'right-top', // center-bottom
    }, props);

    if (this.text) {
      this._render();
    }
  }
  public destory() {
    let opacity = 1;
    const timer = setInterval(() => {
      opacity -= 0.3;
      if (Math.ceil(opacity) === 0) {
        clearInterval(timer);
        this.domHtml.parentNode.removeChild(this.domHtml);
      } else {
        const hde = this.domHtml as HTMLDivElement;
        hde.style.opacity = String(opacity);
      }
    }, 100);
  }

  private _render() {

    this.domHtml = domParser(
      template({
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
