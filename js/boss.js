class Boss extends PIXI.Container {
    constructor(bossParameters) {
        super();

        this.maxHealth = this.health = bossParameters.health;

        this.text = new PIXI.Text("Boss", Params.textStyle.test);
        this.text.anchor.set(0.5);
        this.text.position.set(this.width / 2, this.height / 2);
        this.addChild(this.text);

        this.updateHealth();
    }

    receiveDamage(damage) {
        const newHealth = Math.max(0, this.health - damage);
        this.health = newHealth;

        this.updateHealth();
    }

    isDead() {
        return this.health <= 0;
    }

    updateHealth(extraText) {
        this.text.text = this.isDead() ? "Dead" : "Boss [" + this.health + "/" + this.maxHealth + "]" +
            (extraText ? extraText : "");
    }

    doWalk(desiredPosition, animationLength) {
        const delta = desiredPosition - this.position.x;
        const walkTime = Math.min(Math.abs(delta) / Params.shiftSpeed, animationLength);
        const waitTime = animationLength - walkTime;
        const actualSpeed = delta / walkTime;
        console.error(actualSpeed + " " + walkTime);

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
        this.updateHealth(" walking");
    }

    stopWalkAnimation() {
        this.updateHealth();
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