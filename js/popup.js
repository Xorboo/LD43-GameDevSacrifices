class Popup extends PIXI.Container {
    // this.popup = new Popup();
    // this.addChild(this.popup);
    // this.popup.position.set(Params.application.width * 0.5, Params.application.height * 0.5);
    // this.popup.setText("Text");
    //
    // add update callring to Update
    constructor() {
        super();

        this.textStyle = Params.textStyle.popup;
        this.text = new PIXI.Text("", this.textStyle);
        this.text.anchor.set(0.5);
        this.addChild(this.text);

        this.alpha = 0;
    }

    update(deltaTime) {
        this.alpha -= 0.5 * deltaTime;
    }

    setText(text) {
        this.text.text = text;
        this.alpha = 1;
    }
}