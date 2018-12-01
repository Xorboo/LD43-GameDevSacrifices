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

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function init() {
    // Basic initialization
    const app = new PIXI.Application(Params.application);
    document.body.appendChild(app.view);

    //#region Test
    const banniesTexture = new PIXI.Texture.fromImage("assets/bunnies.png");

    const bunnies = [
        (new PIXI.Texture(banniesTexture.baseTexture, new PIXI.Rectangle(2, 47, imageSize.x, imageSize.y))),
        (new PIXI.Texture(banniesTexture.baseTexture, new PIXI.Rectangle(2, 86, imageSize.x, imageSize.y))),
        (new PIXI.Texture(banniesTexture.baseTexture, new PIXI.Rectangle(2, 125, imageSize.x, imageSize.y))),
        (new PIXI.Texture(banniesTexture.baseTexture, new PIXI.Rectangle(2, 164, imageSize.x, imageSize.y))),
        (new PIXI.Texture(banniesTexture.baseTexture, new PIXI.Rectangle(2, 2, imageSize.x, imageSize.y))),
    ];

    const container = new PIXI.particles.ParticleContainer(fieldSize.x * fieldSize.y, [false, true, false, false, false]);
    app.stage.addChild(container);

    const fieldData = new Array(fieldSize.y);
    const fieldView = new Array(fieldSize.y);
    for (let y = 0, yy = fieldData.length; y < yy; ++y) {
        fieldData[y] = new Array(fieldSize.x);
        fieldView[y] = new Array(fieldSize.x);
    }

    generateField(fieldData);

    for (let y = 0, yy = fieldData.length; y < yy; ++y) {
        const row = fieldData[y];
        for (let x = 0, xx = row.length; x < xx; ++x) {
            let value = row[x];
            if (0 < value) {
                value -= 1;
                const bunny = new PIXI.Sprite(bunnies[value]);
                bunny.x = x * imageSize.x;
                bunny.y = y * imageSize.y;
                container.addChild(bunny);
                fieldView[y][x] = bunny;
            }
        }
    }
    //#endregion Test

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

//#region TEST
function generateField(field) {
    for (let y = 0, yy = field.length; y < yy; ++y) {
        const row = field[y];
        for (let x = 0, xx = row.length; x < xx; ++x) {
            row[x] = randomInt(0, typesCount);
        }
    }
}
//#endregion
