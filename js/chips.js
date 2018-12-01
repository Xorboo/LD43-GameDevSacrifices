var GetChips = function() {
    class Chip {
        constructor(text, onStay, onSacrifice) {
            this.text = text;
            this.onStay = onStay;
            this.onSacrifice = onSacrifice;
        }
    }

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
