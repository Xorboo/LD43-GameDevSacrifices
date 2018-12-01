class Chip {
    constructor(text, onStay, onSacrifice) {
        this.text = text;
        this.onStay = onStay;
        this.onSacrifice = onSacrifice;
    }
}

var getChips = function() {
    let chips = {
        example: new Chip(
            "Some Text",
            boss => chips.example,
            boss => chips.example,
            ),

        personalLife: new Chip(
            "Personal Life",
            boss => chips.significantOtter,
            ),

        significantOtter: new Chip(
            "Significant Otter",
            boss => chips.family,
            ),

        family: new Chip(
            "Family",
            boss => chips.children,
            ),

        children: new Chip(
            "Children",
            boss => chips.happyRetirement,
            ),

        happyRetirement: new Chip(
            "Happy Retirement",
            ),
    };

    return chips;
};

var generateChips = function() {
    let chips = new Array();
    const startCount = 16;
    const bossCount = 4;
    for (let i = 0; i < startCount; ++i) {
        let name = i.toString();
        chips.push(new Chip(
            name,
            _ => GetChip(name, false, 0),
            _ => GetChip(name, true, 0)
        ));
    }

    function GetChip(parentName, isSacrefice, bossIndex) {
        if (bossIndex == bossCount) {
            return null;
        }
        let name = parentName + (isSacrefice ? '-' : '+');
        return new Chip(
            name,
            _ => GetChip(name, false, bossIndex + 1),
            _ => GetChip(name, true, bossIndex + 1)
            );
    }

    return chips;
};
