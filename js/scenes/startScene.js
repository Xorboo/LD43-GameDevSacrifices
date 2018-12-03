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
            addExtra: function (container) {
                let heroSprite = new PIXI.Sprite(Params.textures.intro.hero);
                heroSprite.anchor.set(0.5);
                heroSprite.position.set(Params.application.width - 230, Params.application.height - 160);
                container.addChild(heroSprite);
            }
        });
        this.createContainer({
            bg: "Backgrouns_screen1_closed door.png",
            text: "But it wasn't\nas easy as I thought...",
            addExtra: function (container) {
                StartScene.addHero(container);
                StartScene.addTorches(container);
            }
        });
        this.createContainer({
            bg: "Backgrouns_screen1.png",
            text: "Sacrifices\nhad to be made...",
            addExtra: function (container) {
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
        SM.setFirePlay(false);
        this.showNextContainer(false);
    }

    update(deltaTime) {
        super.update(deltaTime);
    }

    showNextContainer(playSound = true) {
        if (playSound) {
            SM.playButton2();
        }

        this.currentIndex++;
        if (this.currentIndex >= this.containers.length) {
            this.switchCallback(Params.sceneType.MAIN, {});
        }
        else {
            this.updateContainer();
        }
        
        if (this.currentIndex == 1) {
            SM.setFirePlay(true);
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

        SceneBase.createTorch(torchesContainer, -455, -180, 0);
        SceneBase.createTorch(torchesContainer, -80, -175, 6);
        let baseSprite = new PIXI.Sprite(Params.textures.intro.torchBase);
        baseSprite.anchor.set(1.0);
        torchesContainer.addChild(baseSprite);

    }
}