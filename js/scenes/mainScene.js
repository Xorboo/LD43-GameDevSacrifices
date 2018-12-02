class MainScene extends SceneBase {
    constructor(switchCallback) {
        super(switchCallback, Params.textures.background.start);

        let finishButton = new TextButton("Finish game");
        finishButton.position.set(Params.application.width - 120, 50);
        finishButton.onClick(() => this.switchCallback(Params.sceneType.FINISH, {
            finalPerks: [
                "Loneliness",
                "Team left",
                "50% discount on 10th day",
                "Obesity",
                "Bugs",
                "You have a cat!"
            ]
        }));
        this.addChild(finishButton);

        let failButton = new TextButton("Fail game");
        failButton.position.set(Params.application.width - 120, 100);
        failButton.onClick(() => this.switchCallback(Params.sceneType.FAIL, { 
            reason: "You just suck..." 
        }));
        this.addChild(failButton);

        const chipsOnHand = generateChips();
        const chipsCount = chipsOnHand.length;
        this.chipsButtons = new Array(chipsCount);
        const width = 195;
        const height = 52;
        const elementsPerRow = 4;
        const startX = Params.application.width / 2 - width * (elementsPerRow / 2 - 0.5);
        const startY = Params.application.height - height * (chipsCount / elementsPerRow);
        for (let i = 0, n = chipsCount; i < n; ++i) {
            const chip = chipsOnHand[i];
            const chipButton = new TextButton(chip.text);
            chipButton.position.set(startX + width * (i % elementsPerRow), startY + height * Math.floor(i / elementsPerRow));
            chipButton.onClick(() => this.onChipClick(i));
            chipButton.interactive = false;
            this.addChild(chipButton);

            this.chipsButtons[i] = {
                chip: chip,
                button: chipButton,
                sacrificed: false,
            };
        }
    }

    init(data) {
        super.init(data);
    }

    update(deltaTime) {
        super.update(deltaTime);
    }

    onChipClick(chipIndex) {
        const chipButton = this.chipsButtons[chipIndex];
        chipButton.button.interactive = false;
        chipButton.sacrificed = true;
        // bosses[currentBossIndex].health -= 1;
        // currentState();
    }
}