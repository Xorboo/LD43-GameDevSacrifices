class StartScene extends SceneBase {
    constructor(switchCallback) {
        super(switchCallback);

        this.baseContainer = new PIXI.Container();
        this.addChild(this.baseContainer);

        this.currentIndex = 0;
        this.containers = [];
        this.createContainer({
            bg: "Backgrouns_screen1_start.png",
            text: "I always wanted\nto make a game...",
            addExtra: function(container) {
                let heroSprite = new PIXI.Sprite(Params.textures.intro.hero);
                heroSprite.anchor.set(0.5);
                heroSprite.position.set(Params.application.width - 230, Params.application.height - 160);
                container.addChild(heroSprite);
            }
        });
        this.createContainer({
            bg: "Backgrouns_screen1_closed door.png",
            text: "But it wasn't\nas easy as I thought...",
            addExtra: function(container) {
                StartScene.addHero(container);
                StartScene.addTorches(container);
            }
        });
        this.createContainer({
            bg: "Backgrouns_screen1.png",
            text: "Sacrifices\nhad to be made...",
            addExtra: function(container) {
                StartScene.addHero(container);
                StartScene.addTorches(container);
            }
        });

        let textPanelSprite = new PIXI.Sprite(Params.textures.intro.textPanel);
        textPanelSprite.anchor.set(0.5);
        textPanelSprite.position.set(217, 280);
        this.addChild(textPanelSprite);

        this.introText = new PIXI.Text("???", Params.textStyle.introText);
        this.introText.anchor.set(0.5);
        this.introText.position.y = -40;
        textPanelSprite.addChild(this.introText);
        /*const leftFireAnimation = StartScene.getFireAnimation();
        leftFireAnimation.play();
        leftFireAnimation.x = 100;
        leftFireAnimation.y = Params.application.height - 125;
        this.addChild(leftFireAnimation);

        const rightFireAnimation = StartScene.getFireAnimation();
        rightFireAnimation.play();
        rightFireAnimation.x = Params.application.width - 100;
        rightFireAnimation.y = Params.application.height - 125;
        this.addChild(rightFireAnimation);*/

        let nextButton = new BaseTextButton(Params.textures.button.normal);
        nextButton.onClick(() => this.showNextContainer());
        nextButton.alpha = 0.0;
        nextButton.width = Params.application.width;
        nextButton.height = Params.application.height;
        this.addChild(nextButton);
    }

    init(data) {
        super.init(data);

        this.currentIndex = -1;
        this.showNextContainer();
    }

    update(deltaTime) {
        super.update(deltaTime);
    }

    showNextContainer() {
        this.currentIndex++;
        if (this.currentIndex >= this.containers.length) {
            this.switchCallback(Params.sceneType.MAIN, {});
        }
        else {
            this.updateContainer();
        }
    }

    updateContainer() {
        if (this.currentContainer) {
            this.currentContainer.visible = false;
        }

        this.currentContainer = this.containers[this.currentIndex];
        this.currentContainer.container.visible = true;

        this.introText.text = this.currentContainer.text;
    }

    createContainer(data) {
        let container = new PIXI.Container();
        container.visible = false;
        this.baseContainer.addChild(container);

        let spriteTexture = PIXI.Texture.fromImage("assets/backgrounds/" + data.bg);
        let sprite = new PIXI.Sprite(spriteTexture);
        sprite.width = Params.application.width;
        sprite.height = Params.application.height;
        container.addChild(sprite);

        data.addExtra(container);

        this.containers.push({
            container: container,
            text: data.text
        });
        return container;
    }

    static addHero(container) {
        const sheetName = Params.atlases.hero.idle;
        const sheet = PIXI.loader.resources[sheetName].spritesheet;
        const animation = sheet.animations["Rudolf_Idle"];
        let heroSprite = new PIXI.extras.AnimatedSprite(animation);
        heroSprite.scale.set(Params.downscaleFactor);
        heroSprite.anchor.set(0.5);
        heroSprite.position.set(Params.application.width - 275, Params.application.height - 175);
        heroSprite.animationSpeed = Params.animationSpeed;
        heroSprite.loop = true;
        heroSprite.play();
        container.addChild(heroSprite);
    }

    static addTorches(container) {
        let torchesContainer = new PIXI.Container();
        torchesContainer.position.set(Params.application.width - 30, Params.application.height + 55);
        container.addChild(torchesContainer);

        StartScene.createTorch(torchesContainer, -455, -175, 0);
        StartScene.createTorch(torchesContainer, -80, -168, 6);
        let baseSprite = new PIXI.Sprite(Params.textures.intro.torchBase);
        baseSprite.anchor.set(1.0);
        torchesContainer.addChild(baseSprite);
        
    }

    static createTorch(container, x, y, frame) {
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

    static getFireAnimation() {
        const framesCount = 12;
        const frames = new Array(framesCount);
        for (let i = 1, n = Math.min(9, framesCount); i <= n; ++i) {
            frames[i - 1] = PIXI.Texture.fromFrame('Fire_torch000' + i + '.png');
        }
        for (let i = 10; i <= framesCount; ++i) {
            frames[i - 1] = PIXI.Texture.fromFrame('Fire_torch00' + i + '.png');
        }
        const animatedSprite = new PIXI.extras.AnimatedSprite(frames);
        animatedSprite.anchor.set(0.5);
        animatedSprite.animationSpeed = 1 / 4;
        return animatedSprite;
    }
}