const Params = {
    application: {
        width: 800,
        height: 600,
        backgroundColor: 0x1099bb
    },

    sceneType: {
        START: 1,
        MAIN: 2,
        FAIL: 3,
        FINISH: 4
    },

    textStyle: {
        test: new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 36,
            fill: "white",
            stroke: "#ff3300",
            strokeThickness: 4,
            dropShadow: true,
            dropShadowColor: "black",
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
        }),
        loseDescription: new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 64,
            fontWeight: "bold",
            fill: "white",
            stroke: "black",
            strokeThickness: 8,
            dropShadow: true,
            dropShadowColor: "#444444",
            dropShadowBlur: 8,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
        }),
        finalHeader: new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 64,
            fontWeight: "bold",
            fill: "white",
            stroke: "black",
            strokeThickness: 8,
            dropShadow: true,
            dropShadowColor: "#444444",
            dropShadowBlur: 8,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
        }),
        finalPerk: new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 42,
            fill: "white",
            stroke: "black",
            strokeThickness: 4
        }),
        buttonNormal: new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 30,
            fill: "white"
        }),
        buttonHover: new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 30,
            fill: "white",
            stroke: "black",
            strokeThickness: 4,
        }),
    },

    textures: {
        background: {
            start: PIXI.Texture.fromImage("assets/backgrounds/start.png")
        },
        button: {
            normal: "assets/buttons/grey_button_normal.png",
            pressed: "assets/buttons/grey_button_pressed.png"
        }
    },

    text: {
        button_start: "GO",
        button_restart: "RESTART"
    }
}
