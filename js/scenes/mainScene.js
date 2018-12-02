class MainScene extends SceneBase {
    constructor(switchCallback) {
        super(switchCallback, Params.textures.background.start);

        let finishButton = new TextButton("Finish game");
        finishButton.position.set(Params.application.width - 120, Params.application.height - 50);
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
        failButton.position.set(Params.application.width - 120, Params.application.height - 100);
        failButton.onClick(() => this.switchCallback(Params.sceneType.FAIL, { 
            reason: "You just suck..." 
        }));
        this.addChild(failButton);
    }

    init(data) {
        super.init(data);
    }

    update(deltaTime) {
        super.update(deltaTime);
    }
}