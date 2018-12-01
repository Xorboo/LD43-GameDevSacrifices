const fieldSize = {
    x: 5,
    y: 7,
};
const imageSize = {
    x: 26,
    y: 37,
}
const typesCount = 6;


const initialScene = Params.sceneType.START;
let currentScene = null;
let scenes = null;


init();

function init() {
    // Basic initialization
    const app = new PIXI.Application(Params.application);
    document.body.appendChild(app.view);

    // Initialize scenes
    scenes = {
        [Params.sceneType.START]: new StartScene(switchScene),
        [Params.sceneType.MAIN]: new MainScene(switchScene),
        [Params.sceneType.FAIL]: new FailScene(switchScene),
        [Params.sceneType.FINISH]: new FinishScene(switchScene),
    };
    for (let key in Params.sceneType) {
        const sceneId = Params.sceneType[key];
        const scene = scenes[sceneId];
        app.stage.addChild(scene);
        scene.visible = false;
    }
    switchScene(Params.sceneType.START, {});

    // Add frame ticker
    app.ticker.add(delta => update(delta * 16 / 1000));
}

function switchScene(sceneType, data) {
    if (currentScene) {
        currentScene.visible = false;
    }
    currentScene = scenes[sceneType]
    currentScene.visible = true;
    currentScene.init(data);
}

function update(deltaTime) {
    if (currentScene) {
        currentScene.update(deltaTime);
    }
}