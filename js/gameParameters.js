class SoundPack {
    constructor(prefix, amount) {
        this.prefix = prefix;
        this.amount = amount;
    }

    addToLoader() {
        for (let i = 1; i <= this.amount; i++) {
            const name = this.getName(i);
            PIXI.loader.add(name, "assets/sounds/" + name + ".wav");
        }
    }

    playRandom() {
        const sound = this.getRandom();
        sound.play();
    }

    getRandom() {
        const index = this.getRandomInt(1, this.amount);
        const name = this.getName(index);
        return PIXI.loader.resources[name].sound
    }

    getName(index) {
        return this.prefix + index;
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

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

    shiftSpeed: 200,
    chipEvolvePause: 0.4,
    extraWalkTime: 1,
    introWalkTime: 3,
    levelHeaderUpdateDelay: -1,
    bossAttackSoundDelay: 0.7,

    stepPeriod: 4 / 12,      // every 4 frames
    animationSpeed: 1/5,     // 12 fps
    downscaleFactor: 0.687,

    textStyle: {
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
            fill: "#black",
            stroke: "#555555",
            strokeThickness: 4,
        }),
        chipSacrificed: new PIXI.TextStyle({
            fontFamily: "Deutsch",
            fontSize: 20,
            fill: "#444444"
        }),
        chipLose: new PIXI.TextStyle({
            fontFamily: "Deutsch",
            fontSize: 24,
            fill: "#661111",
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
        }
    },

    sounds: {
        bgMusic: "assets/music/LD43_Music.mp3",
        button: "assets/sounds/button.wav",
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
        }
    }
}
