class Hero extends PIXI.Container {
    constructor() {
        super();

        this.text = new PIXI.Text("", Params.textStyle.test);
        this.text.anchor.set(0.5);
        this.text.position.set(this.width / 2, this.height / 2 - 120);
        this.addChild(this.text);

        const heroSheets = Params.atlases.hero;
        this.heroIdle = this.createSprite(heroSheets.idle, "Rudolf_Idle", true);
        this.heroRun = this.createSprite(heroSheets.run, "Rudolf_Run", true);
        //this.heroSacrifice = this.createSprite(heroSheets.attack, "Rudolf_Attack", false);
        //this.heroHit = this.createSprite(heroSheets.hit, "Rudolf_Hit", false);
        //this.heroDeath = this.createSprite(heroSheets.death, "Rudolf_Death", false);
        //this.heroWin = this.createSprite(heroSheets.win, "Rudolf_Win", true);

        this.currentHero = null;
        this.startAnimation(this.heroIdle);
    }

    init() {
        this.isWalking = false;
        this.isDead = false;
        this.isWin = false;
    }

    createSprite(sheetName, animationName, loop) {
        const sheet = PIXI.loader.resources[sheetName].spritesheet;
        const animation = sheet.animations[animationName];
        let sprite = new PIXI.extras.AnimatedSprite(animation);
        sprite.scale.set(Params.downscaleFactor);
        sprite.anchor.set(0.5);
        sprite.visible = false;
        sprite.animationSpeed = Params.animationSpeed;
        sprite.loop = loop;
        sprite.onComplete = () => this.animationCompleted(sprite);
        this.addChild(sprite);
        return sprite;
    }

    startAnimation(sprite) {
        if (!sprite) {
            return;
        }

        if (this.currentHero) {
            this.currentHero.visible = false;
            this.currentHero.stop();
        }

        this.currentHero = sprite;
        this.currentHero.visible = true;
        this.currentHero.gotoAndPlay(0);
    }

    animationCompleted(sprite) {
        if (this.isDead || this.isWin) {
            return;
        }

        this.startAnimation(this.isWalking ? this.heroRun : this.heroIdle);
    }

    doSacrifice() {
        this.startAnimation(this.heroSacrifice);
    }

    doReceiveHit() {
        this.startAnimation(this.heroHit);
    }

    startWalk(walkTime) {
        this.startAnimation(this.heroRun);

        this.isWalking = true;
        var walkTimer = PIXI.timerManager.createTimer(1000 * walkTime);
        walkTimer.on('end', (elapsed) => { this.stopWalk(); });
        walkTimer.start();
    }

    stopWalk() {
        this.isWalking = false;
        this.startAnimation(this.heroIdle);
    }

    // On game fail
    doDeath() {
        this.isDead = true;
        this.startAnimation(this.heroDeath);
        this.text.text = "Dead";
    }

    // On game complete
    doWin() {
        this.isWin = true;
        this.startAnimation(this.heroWin);
        this.text.text = "Won";
    }
}