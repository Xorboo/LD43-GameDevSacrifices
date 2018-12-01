class FinishScene extends SceneBase {
    constructor(switchCallback) {
        super(switchCallback, Params.textures.background.start, "Thats a finish!");
        
        let restartButton = new TextButton(Params.text.button_restart);
        restartButton.position.set(Params.application.width - 120, Params.application.height - 50);
        restartButton.onClick(() => this.switchCallback(Params.sceneType.START, {}));
        this.addChild(restartButton);
    }

    init(data) {
        super.init(data);
    }

    update(deltaTime) {
        super.update(deltaTime);
    }
}