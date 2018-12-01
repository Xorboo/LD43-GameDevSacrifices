class StartScene extends SceneBase {
    constructor(switchCallback) {
        super(switchCallback, Params.textures.background.start, "Thats a start!");
        
        let startButton = new TextButton(Params.text.button_start);
        startButton.position.set(Params.application.width / 2, Params.application.height - 100);
        startButton.onClick(() => this.switchCallback(Params.sceneType.MAIN, {}));
        this.addChild(startButton);
    }

    init(data) {
        super.init(data);
    }

    update(deltaTime) {
        super.update(deltaTime);
    }
}