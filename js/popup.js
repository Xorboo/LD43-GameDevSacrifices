class Popup extends PIXI.Container {
    constructor() {
        super();

        this.textStyle = Params.textStyle.popup;
        this.text = new PIXI.Text("", this.textStyle);
        this.text.anchor.set(0.5);
        this.addChild(this.text);

        this.alpha = 0;
    }

    update(deltaTime) {
        if (0 < this.alpha) {
            this.alpha -= 0.5 * deltaTime;
        }
    }

    setText(text) {
        this.text.text = text;
        this.alpha = 1;
    }
}