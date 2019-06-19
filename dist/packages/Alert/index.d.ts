interface AlertProps {
    text: string;
    domContainer: Node;
    duration: number;
    type: string;
    position: string;
}
export default class Alert {
    text: string;
    domHtml: Node;
    domContainer: Node;
    duration: number;
    type: string;
    position: string;
    constructor(props: AlertProps);
    destory(): void;
    private _render;
}
export {};
