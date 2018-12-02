class Hero extends PIXI.Container {
    constructor() {
        super();

        this.text = new PIXI.Text("Hero", Params.textStyle.test);
        this.text.anchor.set(0.5);
        this.text.position.set(this.width / 2, this.height / 2);
        this.addChild(this.text);
    }

    doSacrifice() {
        this.text.text = "Sacrificed";
    }

    startWalk(walkTime) {
        this.text.text = "Walking";

        var walkTimer = PIXI.timerManager.createTimer(1000 * walkTime);
        walkTimer.on('end', (elapsed) => { this.stopWalk(); });
        walkTimer.start();
    }

    stopWalk() {
        this.text.text = "Hero";
    }

    // On game fail
    doDeath() {
        this.text.text = "Dead";
    }

    // On game complete
    doWin() {
        this.text.text = "Won";
    }
}