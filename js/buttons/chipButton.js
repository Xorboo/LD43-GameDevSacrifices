class ChipButton extends BaseTextButton {
    constructor(chip, onChipClickedCallback) {
        super(
            Params.textures.button.normal,
            Params.textures.button.pressed,
            "???",
            Params.textStyle.buttonNormal,
            Params.textStyle.buttonHover);
        this.button.alpha = 0.0;
        this.onClick(this.chipClicked);
        this.chipClickedCallback = onChipClickedCallback;
        
        if (chip) {
            this.setChip(chip);
        }
    }

    setChip(chip) {
        this.chip = chip;
        this.text.text = chip.text;
        this.setSacrificed(false);
    }

    evolveChip(bossIndex) {
        const evolveFunc = this.isSacrificed ? this.chip.onSacrifice : this.chip.onStay;
        const newChip = evolveFunc(bossIndex);
        if (!newChip) {
            console.error("Failed in evolving chip on [" + bossIndex + "], was sacrificed: " + this.isSacrificed + ", data:");
            console.log(this.chip);
            newChip = chip;
        }
        console.log(this.isSacrificed + " : " + this.chip.text + " -> " + newChip.text);
        this.setChip(newChip);
    }

    chipClicked() {
        if (this.isSacrificed) {
            console.error("Chip is already sacrificed!");
            console.log(this);
            return;
        }

        this.setSacrificed(true);

        const chipDamage = 1;
        this.chipClickedCallback(chipDamage, this.chip);
    }

    setSacrificed(sacrificed) {
        this.isSacrificed = sacrificed;
        this.interactive = !sacrificed;
        // TODO Update text style

        if (this.chip.gameOver) {
            // TODO Special style needed?
        }
    }
}