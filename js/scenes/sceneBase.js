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

    static createTorch(container, x, y, frame = 0) {
        const sheetName = Params.atlases.torch;
        const sheet = PIXI.loader.resources[sheetName].spritesheet;
        const animation = sheet.animations["Fire_torch"];
        let torchSprite = new PIXI.extras.AnimatedSprite(animation);
        torchSprite.scale.set(Params.downscaleFactor);
        torchSprite.anchor.set(0.5);
        torchSprite.position.set(x, y);
        torchSprite.animationSpeed = Params.animationSpeed;
        torchSprite.loop = true;
        torchSprite.gotoAndPlay(frame);

        container.addChild(torchSprite);
    }
}