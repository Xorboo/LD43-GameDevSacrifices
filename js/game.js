const fieldSize = {
    x: 5,
    y: 7,
};

const imageSize = {
    x: 26,
    y: 37,
}

const typesCount = 6;

var currentState;
var currentFieldData;
var currentFieldView;

Init();

function RandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function Init()
{
    const app = new PIXI.Application(800, 600, { backgroundColor: 0x1099bb });
    document.body.appendChild(app.view);

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
    for (var y = 0, yy = fieldData.length; y < yy; ++y) {
        fieldData[y] = new Array(fieldSize.x);
        fieldView[y] = new Array(fieldSize.x);
    }

    GenerateField(fieldData);

    currentFieldData = fieldData;
    currentFieldView = fieldView;

    for (var y = 0, yy = fieldData.length; y < yy; ++y) {
        const row = fieldData[y];
        for (var x = 0, xx = row.length; x < xx; ++x) {
            var value = row[x];
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

    currentState = MoveDownState;

    app.ticker.add(Update);
}

function GenerateField(field) {
    for (var y = 0, yy = field.length; y < yy; ++y) {
        const row = field[y];
        for (var x = 0, xx = row.length; x < xx; ++x) {
            row[x] = RandomInt(0, typesCount);
        }
    }
}

function MoveDownState(delta) {
    // MoveDown(currentFieldData);

    currentState = null;
}

// function MoveDown(field) {
//     for (var y = field.length - 1; 0 < y; --y) {
//         const rowBtm = field[y];
//         const rowTop = field[y + 1];
//         for (var x = 0, xx = row.length; x < xx; ++x) {
//             if (0 === rowBtm[x]) {
//                 rowBtm[x] = rowTop[x];
//                 rowTop[x] = 0;
//             }
//         }
//     }
// }

function Update(delta) {
    if (currentState != null) {
        currentState(delta);
    }

    // const fieldData = currentFieldData;
    // for (var y = 0, yy = fieldData.length; y < yy; ++y) {
    //     const row = fieldData[y];
    //     for (var x = 0, xx = row.length; x < xx; ++x) {
    //         var value = row[x];
    //         if (0 < value) {
    //             value -= 1;
    //             const bunny = fieldView[y][x];
    //             bunny.x = x * imageSize.x;
    //             bunny.y = y * imageSize.y;
    //         }
    //     }
    // }
}

