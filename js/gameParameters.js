const Params = {
    application: {
        width: 800,
        height: 600,
        backgroundColor: 0x6a717e
    },

    sceneType: {
        START: 1,
        MAIN: 2,
        FAIL: 3,
        FINISH: 4
    },

    shiftSpeed: 300,
    chipEvolvePause: 0.4,
    extraWalkTime: 1,
    introWalkTime: 3,
    levelHeaderUpdateDelay: -1,
    bossAttackSoundDelay: 0.7,
    bossDeathSoundDelay: 0.5,
    hitSoundDelay: 0.2,
    afterKillDelay: 1.0,

    stepPeriod: 4 / 12,      // every 4 frames
    animationSpeed: 1 / 5,   // 12 fps
    downscaleFactor: 0.687,

    chipButtonWidth: 280,
    chipButtonHeight: 28,

    textStyle: {
        failHeader: new PIXI.TextStyle({
            fontFamily: "Plain_Germanica",
            fontSize: 64,
            fill: "#660000",
            stroke: "#999999",
            strokeThickness: 6,
            align: "center"
        }),
        loseDescription: new PIXI.TextStyle({
            fontFamily: "DeathtoMetal",
            fontSize: 80,
            fill: "black",
        }),

        finishHeader: new PIXI.TextStyle({
            fontFamily: "Plain_Germanica",
            fontSize: 64,
            fill: "black",
            stroke: "#999999",
            strokeThickness: 6,
            align: "center"
        }),
        finishHint: new PIXI.TextStyle({
            fontFamily: "Deutsch",
            fontSize: 20,
            fill: "black",
            align: "center"
        }),
        finishChip: new PIXI.TextStyle({
            fontFamily: "Deutsch",
            fontSize: 26,
            fill: "black",
            align: "center"
        }),
        finishChipBad: new PIXI.TextStyle({
            fontFamily: "Deutsch",
            fontSize: 30,
            fill: "#661111",
            align: "center"
        }),

        introText: new PIXI.TextStyle({
            fontFamily: "Deutsch",
            fontSize: 32,
            fill: "black",
            align: "center"
        }),
        levelHeader: new PIXI.TextStyle({
            fontFamily: "DeathtoMetal",
            fontSize: 36,
            fill: "black"
        }),
        sacrifice: new PIXI.TextStyle({
            fontFamily: "Plain_Germanica",
            fontSize: 28,
            fill: "black"
        }),
        chip: new PIXI.TextStyle({
            fontFamily: "Deutsch",
            fontSize: 20,
            fill: "black"
        }),
        chipHover: new PIXI.TextStyle({
            fontFamily: "Deutsch",
            fontSize: 20,
            fill: "black",
            stroke: "red",
            strokeThickness: 4,
        }),
        chipSacrificed: new PIXI.TextStyle({
            fontFamily: "Deutsch",
            fontSize: 20,
            fill: "#990000"
        }),
        chipLose: new PIXI.TextStyle({
            fontFamily: "Deutsch",
            fontSize: 24,
            fill: "#661111",
        }),

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
            start: PIXI.Texture.fromImage("assets/backgrounds/start.png"),
            tilingWall: PIXI.Texture.fromImage('assets/backgrounds/Game_Wall.png'),
            tilingFloor: PIXI.Texture.fromImage('assets/backgrounds/Game_floor.png'),
            gameUI: PIXI.Texture.fromImage('assets/backgrounds/ui_bg.png'),
            levelNumber: PIXI.Texture.fromImage('assets/backgrounds/Plashka_LevelNumber.png')
        },
        button: {
            normal: "assets/buttons/grey_button_normal.png",
            pressed: "assets/buttons/grey_button_pressed.png"
        },
        intro: {
            textPanel: PIXI.Texture.fromImage("assets/backgrounds/Background_screen1_Panel.png"),
            hero: PIXI.Texture.fromImage("assets/backgrounds/Backgrouns_screen1_start_Rudolf.png"),
            torchBase: PIXI.Texture.fromImage("assets/backgrounds/Backgrouns_screen1_Torch.png"),
        }
    },

    sounds: {
        bgMusic: "assets/music/LD43_Music.mp3",
        button1: "assets/sounds/Button_1.wav",
        button2: "assets/sounds/Button_2.wav",
        bossDeath: "assets/sounds/Monster_die.wav",
        gameOver: "assets/sounds/Dark_lose.wav",
        win: "assets/sounds/Win.wav",
        fire: "assets/sounds/Fire.wav",
        steps: new SoundPack("step_", 6),
        doDamage: new SoundPack("dmg_", 4),
        takeDamage: new SoundPack("take_dmg_", 2)
    },

    text: {
        button_start: "GO",
        button_restart: "RESTART"
    },

    atlases: {
        bosses: [
            {
                attack: "assets/atlases/boss/1/Boss_Attack.json",
                hit: "assets/atlases/boss/1/Boss_Hit.json",
                idle: "assets/atlases/boss/1/Boss_Idle.json",
                die: "assets/atlases/boss/1/Boss_Hit.json"
            },
            {
                attack: "assets/atlases/boss/2/Boss_Attack.json",
                hit: "assets/atlases/boss/2/Boss_Hit.json",
                idle: "assets/atlases/boss/2/Boss_Idle.json",
                die: "assets/atlases/boss/2/Boss_Hit.json"
            },
            {
                attack: "assets/atlases/boss/3/Boss_Attack.json",
                hit: "assets/atlases/boss/3/Boss_Hit.json",
                idle: "assets/atlases/boss/3/Boss_Idle.json",
                die: "assets/atlases/boss/3/Boss_Hit.json"
            },
            {
                attack: "assets/atlases/boss/4/Boss_Attack.json",
                hit: "assets/atlases/boss/4/Boss_Hit.json",
                idle: "assets/atlases/boss/4/Boss_Idle.json",
                die: "assets/atlases/boss/4/Boss_Hit.json"
            }
        ],
        hero: {
            idle: "assets/atlases/hero/Rudolf_Idle.json",
            run: "assets/atlases/hero/Rudolf_Run.json"
        },
        torch: "assets/atlases/FireTorch.json"
    }
}
