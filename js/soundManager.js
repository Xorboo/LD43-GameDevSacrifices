SM = null;

class SoundManager {
    constructor() {
        SM = this;

        this.bgMusic = PIXI.loader.resources["bgMusic"].sound;
        this.bgMusic.loop = true;
        this.bgMusic.play();

        this.button = PIXI.loader.resources["button"].sound;
    }

    playStep() {
        this.playRandom(Params.sounds.steps);
    }

    playDoDamage() {
        this.playRandom(Params.sounds.doDamage);
    }

    playTakeDamage() {
        this.playRandom(Params.sounds.takeDamage);
    }

    playButton() {
        this.button.play();
    }
    
    playRandom(soundPack) {
        soundPack.playRandom();
    }
}