let chips = GetChips();

let startPack = [
    chips.personalLife,
];

for (let i = 0, n = startPack.length; i < n; ++i) {
    let chip = startPack[i];
    while (chip != null) {
        console.log(chip.text);
        if (chip.onStay != null) {
            chip = chip.onStay(0);
        } else {
            break;
        }
    }
}