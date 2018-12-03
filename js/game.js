
const initialScene = Params.sceneType.START;
let currentScene = null;
let scenes = null;

// Load textures
PIXI.loader
    .add("assets/atlases/atlas.json")
    .add(Params.atlases.hero.idle)
    .add(Params.atlases.hero.run)
    .add(Params.atlases.torch);
for (let i = 0; i < Params.atlases.bosses.length; i++) {
    const boss = Params.atlases.bosses[i];
    PIXI.loader
        .add(boss.attack)
        .add(boss.hit)
        .add(boss.idle);
}

// Load sounds
SoundManager.preloadSounds();
PIXI.loader.load(init);


function init() {
    // Basic initialization
    const app = new PIXI.Application(Params.application);
    document.body.appendChild(app.view);

    this.soundManager = new SoundManager();

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
    PIXI.timerManager.update();
}