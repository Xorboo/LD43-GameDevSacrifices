class SceneBase extends PIXI.Container {
    constructor(switchCallback, backgroundTexture) {
        super();

        this.switchCallback = switchCallback;

        // TODO? Keep aspect and envelope?
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

    addCredits() {
        const credits = Params.credits;
        const shift = 25;
        const x = 10
        let y = Params.application.height - credits.length * shift + 5;

        for (let i = 0; i < credits.length; i++) {
            const credit = credits[i];
            this.addCreditsLine(credit[0], credit[1], x, y);
            y += shift;
        }
    }

    addCreditsLine(text, url, x, y) {
        let line = new BaseTextButton(null, null, text, Params.textStyle.credits, Params.textStyle.creditsHover);
        line.text.anchor.set(0.0, 0.5);
        line.position.set(x, y);
        line.onClick(() => {
            SM.playButton2();
            window.open(url, "_blank");
        });
        this.addChild(line);
    }

    addFullscreenButton(callback) {
        let fullscreenButton = new BaseTextButton(Params.textures.button.normal);
        fullscreenButton.button.alpha = 0;
        fullscreenButton.button.width = Params.application.width;
        fullscreenButton.button.height = Params.application.height;
        fullscreenButton.position.set(Params.application.width / 2, Params.application.height / 2)
        fullscreenButton.onClick(callback);
        this.addChild(fullscreenButton);
        return fullscreenButton;
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