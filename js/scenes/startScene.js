class StartScene extends SceneBase {
    constructor(switchCallback) {
        super(switchCallback, Params.textures.background.start);
        
        let startButton = new TextButton(Params.text.button_start);
        startButton.position.set(Params.application.width / 2, Params.application.height - 100);
        startButton.onClick(() => this.switchCallback(Params.sceneType.MAIN, {}));
        this.addChild(startButton);

        const rightFireAnimation = StartScene.getFireAnimation();
        rightFireAnimation.play();
        rightFireAnimation.x = Params.application.width / 2;
        rightFireAnimation.y = Params.application.height / 2;
        this.addChild(rightFireAnimation);
    }

    init(data) {
        super.init(data);
    }

    update(deltaTime) {
        super.update(deltaTime);
    }

    static getFireAnimation() {
        const framesCount = 12;
        const frames = new Array(framesCount);
        for (let i = 1, n = Math.min(9, framesCount); i <= n; ++i) {
            frames[i - 1] = PIXI.Texture.fromFrame('Fire_torch000' + i + '.png');
        }
        for (let i = 10; i <= framesCount; ++i) {
            frames[i - 1] = (PIXI.Texture.fromFrame('Fire_torch00' + i + '.png'));
        }
        const animatedSprite = new PIXI.extras.AnimatedSprite(frames);
        animatedSprite.anchor.set(0.5);
        animatedSprite.animationSpeed = 1 / 4;
        return animatedSprite;
    }
}