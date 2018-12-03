class Boss extends PIXI.Container {
    constructor(bossId) {
        super();

        const bossParameters = GameData.bosses[bossId];
        this.maxHealth = this.health = bossParameters.health;

        this.text = new PIXI.Text("Boss", Params.textStyle.test);
        this.text.anchor.set(0.5);
        this.text.position.set(this.width / 2, this.height / 2 - 100);
        this.addChild(this.text);

        const bossSheets = Params.atlases.bosses[bossId];
        this.bossIdle = this.createSprite(bossSheets.idle, "Boss_Idle", true);
        this.bossAttack = this.createSprite(bossSheets.attack, "Boss_Attack", false);
        this.bossHit = this.createSprite(bossSheets.hit, "Boss_Hit", false);
        this.bossDie = this.createSprite(bossSheets.hit, "Boss_Hit", false);

        this.currentBoss = null;
        this.startAnimation(this.bossIdle);

        this.updateHealth();
    }

    createSprite(sheetName, animationName, loop) {
        const sheet = PIXI.loader.resources[sheetName].spritesheet;
        const animation = sheet.animations[animationName];
        let sprite = new PIXI.extras.AnimatedSprite(animation);
        sprite.scale.set(Params.downscaleFactor);
        sprite.scale.x = -sprite.scale.x;
        sprite.anchor.set(0.5);
        sprite.visible = false;
        sprite.animationSpeed = Params.animationSpeed;
        sprite.loop = loop;
        sprite.onComplete = () => this.animationCompleted(sprite);
        this.addChild(sprite);
        return sprite;
    }

    startAnimation(sprite) {
        if (this.currentBoss) {
            this.currentBoss.visible = false;
            this.currentBoss.stop();
        }

        this.currentBoss = sprite;
        this.currentBoss.visible = true;
        this.currentBoss.gotoAndPlay(0);
    }

    animationCompleted(sprite) {
        if (this.isDead()) {
        }
        else {
            if (this.currentBoss == this.bossHit) {
                this.startAnimation(this.bossAttack);
                if (this.onDealDamage) {
                    this.onDealDamage(this);
                }
            }
            else {
                this.startAnimation(this.bossIdle);
            }
        }
    }

    receiveDamage(damage) {
        const newHealth = Math.max(0, this.health - damage);
        this.health = newHealth;

        if (this.isDead()) {
            this.startAnimation(this.bossDie);
        } 
        else {
            this.startAnimation(this.bossHit);
        }
        this.updateHealth();
    }

    isDead() {
        return this.health <= 0;
    }

    updateHealth() {
        this.text.text = this.isDead() ? "Dead" : "Boss [" + this.health + "/" + this.maxHealth + "]";
    }

    doWalk(desiredPosition, animationLength) {
        const delta = desiredPosition - this.position.x;
        const walkTime = Math.min(Math.abs(delta) / Params.shiftSpeed, animationLength);
        const waitTime = animationLength - walkTime;
        const actualSpeed = delta / walkTime;

        var waitTimer = PIXI.timerManager.createTimer(1000 * waitTime);
        waitTimer.on('end', (elapsed) => {
            this.startWalkAnimation();
            this.startWalkTimer(actualSpeed, walkTime, () => {
                this.stopWalkAnimation();
            });
        });
        waitTimer.start();
    }

    startWalkAnimation() {
    }

    stopWalkAnimation() {
    }

    doFakeWalk(duration, endCallback) {
        this.startWalkTimer(-Params.shiftSpeed, duration, () => endCallback(this));
    }

    startWalkTimer(speed, duration, endCallback) {
        var walkTimer = PIXI.timerManager.createTimer(1000 * duration);
        walkTimer.on('update', (elapsed, deltaTime) => {
            this.position.x += speed * deltaTime;
        });
        walkTimer.on('end', (elapsed) => {
            if (endCallback) {
                endCallback();
            }
        });

        walkTimer.start();
    }
}