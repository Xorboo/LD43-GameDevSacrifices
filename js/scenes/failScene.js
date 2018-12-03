class FailScene extends SceneBase {
    constructor(switchCallback) {
        super(switchCallback);
        
        this.headerText = new PIXI.Text("You couldn't make it...", Params.textStyle.failHeader);
        this.headerText.anchor.set(0.5);
        this.headerText.position.set(Params.application.width / 2, 150);
        this.addChild(this.headerText);

        this.reasonText = new PIXI.Text("???", Params.textStyle.loseDescription);
        this.reasonText.anchor.set(0.5);
        this.reasonText.position.set(Params.application.width / 2, 380);
        this.addChild(this.reasonText);

        this.addFullscreenButton(() => {
            SM.playButton2();
            this.switchCallback(Params.sceneType.START, {});
        })
    }

    init(data) {
        super.init(data);

        SM.playGameOver();
        SM.setFirePlay(false);

        this.reasonText.text = data.loseChip.text;
    }

    update(deltaTime) {
        super.update(deltaTime);
    }
}