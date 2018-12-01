class SceneBase extends PIXI.Container {
    constructor(switchCallback, backgroundTexture, tempText) {
        super();

        this.switchCallback = switchCallback;

        // TODO: Keep aspect and envelope?
        this.background = new PIXI.Sprite(backgroundTexture);
        this.background.anchor.set(0.5);
        this.background.position.set(Params.application.width / 2, Params.application.height / 2);
        this.background.width = Params.application.width;
        this.background.height = Params.application.height;
        this.addChild(this.background);

        let message = new PIXI.Text(tempText, Params.textStyle.test);
        message.anchor.set(0.5);
        message.position.set(Params.application.width / 2, 50);
        /*message.interactive = true;
        message.buttonMode = true;
        message.on('pointerdown', () => this.switchCallback(Params.sceneType.FINISH, {}));*/

        this.addChild(message);
    }

    init(data) {
        console.log("Init with data:");
        console.log(data);
    }

    update(deltaTime) {

    }
}