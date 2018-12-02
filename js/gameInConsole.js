let chips = generateChips();

let startPack = [
    chips.personalLife,
];

startPack = chips;

let btn = document.createElement("BUTTON");
document.body.appendChild(btn);

let element = document.getElementById("test_output");
element.innerHTML = "";


function printChips(chip) {
    console.log(chip.text);
    element.innerHTML += chip.text + '<br/>';
    if (chip.onStay != null) {
        let c = chip.onStay(0);
        if (c != null) {
            printChips(c);
        }
    }
    if (chip.onSacrifice != null) {
        let c = chip.onSacrifice(0);
        if (c != null) {
            printChips(c);
        }
    }
}

for (let i = 0, n = startPack.length; i < n; ++i) {
    printChips(startPack[i]);
}