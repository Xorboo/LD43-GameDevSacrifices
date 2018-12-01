class FailScene extends SceneBase {
    constructor(switchCallback) {
        super(switchCallback, Params.textures.background.start);
        
        let restartButton = new TextButton(Params.text.button_restart);
        restartButton.position.set(Params.application.width - 120, Params.application.height - 50);
        restartButton.onClick(() => this.switchCallback(Params.sceneType.START, {}));
        this.addChild(restartButton);

        this.reasonText = new PIXI.Text("???", Params.textStyle.loseDescription);
        this.reasonText.anchor.set(0.5);
        this.reasonText.position.set(Params.application.width / 2, Params.application.height /  2);
        this.addChild(this.reasonText);
    }

    init(data) {
        super.init(data);

        this.reasonText.text = data.reason;
    }

    update(deltaTime) {
        super.update(deltaTime);
    }
}