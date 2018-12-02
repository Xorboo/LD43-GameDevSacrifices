class SoundManager {
    constructor() {
        /*this.bgMusic = PIXI.sound.Sound.from({
            url: Params.sounds.bgMusic,
            autoplay: true,
            loop: true
        });
        this.bgMusic.Play();*/
        PIXI.sound.add('bg', Params.sounds.bgMusic);
        //PIXI.sound.play('bg');
    }
}