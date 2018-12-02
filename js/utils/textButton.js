class TextButton extends BaseTextButton {
    constructor(text) {
        super(
            Params.textures.button.normal,
            Params.textures.button.pressed,
            text,
            Params.textStyle.buttonNormal,
            Params.textStyle.buttonHover);
    }
}