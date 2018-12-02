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

        this.hero = new Hero();
        this.hero.position.set(100, Params.application.height / 2 - 100);
        this.addChild(this.hero);
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

        this.hero.doSacrifice();

        if (this.currentBoss.isDead()) {
            console.log("Boss defeated");
            this.moveToNextBoss();
        }
    }

    updateChipButtons() {
        let initialChips = GameData.getInitialChips();
        for (let i = 0; i < initialChips.length; i++) {
            this.chipsButtons[i].setChip(initialChips[i]);
        }
    }

    startGame() {
        if (this.currentBoss) {
            this.removeChild(this.currentBoss);
        }
        
        this.bossIndex = 0;
        this.initBoss();

        // Start first movement animation
        // TODO Move player from left side of the screen first
        // Disable player actions for animation
        this.disableChipsFor(Params.introWalkTime);
        this.animateCoreMovement(Params.introWalkTime);
    }

    moveToNextBoss() {
        // Evolve buttons animation
        this.hasGameOverChip = false;
        let killedBossIndex = this.bossIndex;
        var evolveTimer = PIXI.timerManager.createTimer(1000 * Params.chipEvolvePause);
        evolveTimer.repeat = this.chipsButtons.length;
        evolveTimer.on('repeat', (elapsed, repeat) => {
            const chipButton = this.chipsButtons[repeat - 1];
            chipButton.evolveChip(killedBossIndex);
            chipButton.interactive = false;

            if (chipButton.chip.gameOver) {
                this.hasGameOverChip = true;
                this.gameOverChip = chipButton.chip;
            }
        });
        evolveTimer.start();

        // Calculate walk animation time
        const animationLength = Params.chipEvolvePause * this.chipsButtons.length + Params.extraWalkTime;

        // Disable player actions for animation
        this.disableChipsFor(animationLength);

        // Move dead boss
        this.currentBoss.doFakeWalk(animationLength, (boss) => this.removeChild(boss));

        // Spawn new boss if needed
        this.bossIndex++;
        if (this.bossIndex < GameData.bosses.length) {
            // Create new boss and move him
            this.initBoss();
            this.animateCoreMovement(animationLength);
        }
        else {
            // Wait for buttons evolution and show final screen
            var finishGameTimer = PIXI.timerManager.createTimer(1000 * animationLength);
            finishGameTimer.on('end', (elapsed) => { this.finishGame(); });
            finishGameTimer.start();
        }

        // Check if we evolved to a game over chip
        var checkGameOverTimer = PIXI.timerManager.createTimer(1000 * animationLength);
        checkGameOverTimer.on('end', (elapsed) => {
            if (this.hasGameOverChip) {
                this.loseGame(this.gameOverChip);
            }
        });
        checkGameOverTimer.start();
    }

    disableChipsFor(animationLength) {
        for (let i = 0; i < this.chipsButtons.length; i++) {
            this.chipsButtons[i].interactive = false;
        }

        var enableChipsTimer = PIXI.timerManager.createTimer(1000 * animationLength);
        enableChipsTimer.on('end', (elapsed) => {
            for (let i = 0; i < this.chipsButtons.length; i++) {
                this.chipsButtons[i].interactive = true;
            }
        });
        enableChipsTimer.start();
    }

    animateCoreMovement(animationLength) {
        this.hero.startWalk(animationLength);
        this.currentBoss.doWalk(this.getDesiredBossPosition(), animationLength);
        // TODO: move background
    }

    getDesiredBossPosition() {
        return Params.application.width - 100;
    }

    initBoss() {
        this.currentBoss = new Boss(GameData.bosses[this.bossIndex]);
        this.currentBoss.position.set(Params.application.width + 200, Params.application.height / 2 - 100);
        this.addChild(this.currentBoss);
        console.log("New boss, hp: " + this.currentBoss.health);
    }

    loseGame(chip) {
        this.hero.doDeath();

        this.switchCallback(Params.sceneType.FAIL, {
            loseChip: chip
        });
    }

    finishGame() {
        this.hero.doWin();

        let finalState = {
            finalChips: this.chipsButtons.map(chipButton => chipButton.chip)
        };
        this.switchCallback(Params.sceneType.FINISH, finalState);
    }
}