class BaseTextButton extends PIXI.Sprite {
    constructor(normalImage, pressedImage, text, normalTextStyle, hoveredTextStyle) {
        let baseTex = PIXI.Texture.fromImage(normalImage);
        super(baseTex);
        this.pressedTexture = PIXI.Texture.fromImage(pressedImage);
        this.normalTexture = baseTex;

        this.interactive = true;
        this.buttonMode = true;
        this.anchor.set(0.5);
        this
            .on('pointerdown', this.onButtonDown)
            .on('pointerup', this.onButtonUp)
            .on('pointerupoutside', this.onButtonUp)
            .on('pointerover', this.onButtonOver)
            .on('pointerout', this.onButtonOut)
            .on('click', this.onButtonClicked);

        this.normalTextStyle = normalTextStyle;
        this.hoveredTextStyle = hoveredTextStyle;
        this.text = new PIXI.Text(text, this.normalTextStyle);
        this.text.anchor.set(0.5);
        this.addChild(this.text);
        this.text.position.set(this.width / 2, this.height / 2);

        this.clickCallback = null;
    }

    onClick(callback) {
        this.clickCallback = callback;
    }

    setButtonTexture(buttonTexture) {
        this.texture = buttonTexture;
        this.dirty = true;
    }

    setTextStyle(textStyle) {
        this.text.style = textStyle;
        this.text.dirty = true;
    }

    onButtonDown() {
        this.isDown = true;
        this.setButtonTexture(this.pressedTexture);
    }

    onButtonUp() {
        this.isDown = false;
        this.setButtonTexture(this.normalTexture);

        if (this.isOver) {
            this.setTextStyle(this.hoveredTextStyle);
        }
        else {
            this.setTextStyle(this.normalTextStyle);
        }
    }

    onButtonOver() {
        this.isOver = true;
        this.setTextStyle(this.hoveredTextStyle);

        if (this.isDown) {
            this.setButtonTexture(this.pressedTexture);
        }
    }

    onButtonOut() {
        this.isOver = false;
        this.setTextStyle(this.normalTextStyle);

        if (this.isDown) {
            this.setButtonTexture(this.normalTexture);
        }
    }

    onButtonClicked() {
        if (this.clickCallback) {
            this.clickCallback();
        }
    }
}