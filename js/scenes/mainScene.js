class MainScene extends SceneBase {
    constructor(switchCallback) {
        super(switchCallback, Params.textures.background.start);

        const chipsCount = GameData.handChipsCount;
        const width = 195;
        const height = 52;
        const elementsPerRow = 4;
        const startX = Params.application.width / 2 - width * (elementsPerRow / 2 - 0.5);
        const startY = Params.application.height - height * (chipsCount / elementsPerRow);

        this.chipsButtons = [];
        for (let i = 0; i < chipsCount; ++i) {
            const chipButton = new ChipButton(null, (damage, chip) => this.onChipClicked(damage, chip));
            chipButton.position.set(startX + width * (i % elementsPerRow), startY + height * Math.floor(i / elementsPerRow));
            this.addChild(chipButton);

            this.chipsButtons.push(chipButton);
        }
    }

    init(data) {
        super.init(data);

        this.updateChipButtons();
        this.startGame();
    }

    update(deltaTime) {
        super.update(deltaTime);
    }

    onChipClicked(damage, chip) {
        this.currentBoss.receiveDamage(damage);
        console.log("Boss damaged on " + damage + ", hp left: " + this.currentBoss.health);
        
        if (chip.gameOver) {
            this.loseGame(chip);
        }
        else if (this.currentBoss.isDead()) {
            console.log("Boss defeated");
            this.moveToNextBoss();
        }
    }

    updateChipButtons() {
        let initialChips = GameData.getInitialChips();
        for(let i = 0; i < initialChips.length; i++) {
            this.chipsButtons[i].setChip(initialChips[i]);
        }
    }

    startGame() {
        this.bossIndex = 0;
        this.initBoss();
    }

    moveToNextBoss() {
        for (let i = 0; i < this.chipsButtons.length; i++) {
            this.chipsButtons[i].evolveChip(this.bossIndex);
        }

        this.bossIndex++;

        if (this.bossIndex < GameData.bosses.length) {
            this.initBoss();
        }
        else {
            this.finishGame();
        }
    }

    initBoss() {
        this.currentBoss = new Boss(GameData.bosses[this.bossIndex]);
        console.log("New boss, hp: " + this.currentBoss.health);
    }

    loseGame(chip) {
        this.switchCallback(Params.sceneType.FAIL, {
            loseChip: chip
        });
    }

    finishGame() {
        let finalState = {
            finalChips: this.chipsButtons.map(chipButton => chipButton.chip)
        };
        this.switchCallback(Params.sceneType.FINISH, finalState);
    }
}