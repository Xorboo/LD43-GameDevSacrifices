class FinishScene extends SceneBase {
    constructor(switchCallback) {
        super(switchCallback, Params.textures.background.start);

        let restartButton = new TextButton(Params.text.button_restart);
        restartButton.position.set(Params.application.width - 120, Params.application.height - 50);
        restartButton.onClick(() => this.switchCallback(Params.sceneType.START, {}));
        this.addChild(restartButton);

        this.headerText = new PIXI.Text("You've made a game!", Params.textStyle.finalHeader);
        this.headerText.anchor.set(0.5);
        this.headerText.position.set(Params.application.width / 2, 100);
        this.addChild(this.headerText);

        this.perks = [];
    }

    init(data) {
        super.init(data);

        this.clearPerks();
        for (let perkKey in data.finalPerks) {
            this.addPerk(data.finalPerks[perkKey]);
        }
    }

    clearPerks() {
        for (let perkKey in this.perks) {
            this.removeChild(this.perks[perkKey]);
        }
        this.perks = [];
    }

    addPerk(text) {
        const perkInitialHeight = this.headerText.position.y + 70;
        const perkDeltaHeight = 50;

        let perk = new PIXI.Text(text, Params.textStyle.finalPerk);
        perk.anchor.set(0.5);
        const perkHeight = perkInitialHeight + perkDeltaHeight * this.perks.length;
        perk.position.set(Params.application.width / 2, perkHeight);
        this.addChild(perk);
        this.perks.push(perk);
    }

    update(deltaTime) {
        super.update(deltaTime);
    }
}