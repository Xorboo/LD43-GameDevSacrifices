class SceneBase extends PIXI.Container {
    constructor(switchCallback, backgroundTexture) {
        super();

        this.switchCallback = switchCallback;

        // TODO: Keep aspect and envelope?
        if (backgroundTexture) {
            this.background = new PIXI.Sprite(backgroundTexture);
            this.background.anchor.set(0.5);
            this.background.position.set(Params.application.width / 2, Params.application.height / 2);
            this.background.width = Params.application.width;
            this.background.height = Params.application.height;
            this.addChild(this.background);
        }
    }

    init(data) {
    }

    update(deltaTime) {

    }
}