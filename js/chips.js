class Chip {
    constructor(text, onStay, onSacrifice, gameOver = false) {
        this.text = text;
        this.onStay = onStay;
        this.onSacrifice = onSacrifice;
        this.gameOver = gameOver;
    }
}

var getChips = function() {
    let chips = {
        personalLife: new Chip(
            "Personal Life",
            bossIndex => {
                if (bossIndex === 0 ||
                    bossIndex === 3) {
                    return chips.relationship;
                } else {
                    return chips.personalLife;
                }
            },
            _ => chips.loneliness,
            ),

        loneliness: new Chip(
            "Loneliness",
            _ => chips.personalLife,
            _ => chips.depression,
            ),

        relationship: new Chip(
            "Relationship",
            _ => chips.family,
            _ => chips.depression,
            ),

        depression: new Chip(
            "Depression",
            bossIndex => {
                if (bossIndex === 2) {
                    return chips.deepGame;
                } else {
                    return chips.loneliness;
                }
            },
            _ => chips.leftGameDev,
            ),

        family: new Chip(
            "Family",
            _ => chips.children,
            _ => chips.depression,
            ),

        children: new Chip(
            "Children",
            _ => chips.happyRetirement,
            _ => chips.divorce,
            ),

        deepGame: new Chip(
            "Deep Themes in game",
            _ => chips.playersTears,
            _ => chips.gameWithoutSoul,
            ),

        leftGameDev: new Chip(
            "Left GameDev",
            null,
            null,
            true,
            ),

        divorce: new Chip(
            "Divorce",
            ),

        happyRetirement: new Chip(
            "Happy Retirement",
            ),

        playersTears: new Chip(
            "Players tears",
            ),

        gameWithoutSoul: new Chip(
            "No Soul in game",
            ),

        healthySleep: new Chip(
            "Healthy sleep",
            _ => chips.healthySleep,
            _ => chips.sleepDeprivation,
            ),

        sleepDeprivation: new Chip(
            "Sleep Deprivation",
            _ => chips.healthySleep,
            _ => chips.migraine,
            ),

        migraine: new Chip(
            "Migraine",
            _ => chips.sleepDeprivation,
            _ => chips.leftGameDev,
            ),

        vacation: new Chip(
            "Vacation",
            _ => chips.vacation,
            _ => chips.chronicFatigueSyndrome,
            ),

        chronicFatigueSyndrome: new Chip(
            "Chronic fatigue syndrome",
            _ => chips.vacation,
            _ => chips.neurosis,
            ),

        neurosis: new Chip(
            "Neurosis",
            _ => chips.chronicFatigueSyndrome,
            _ => chips.occupationalBurnout,
            ),

        occupationalBurnout: new Chip(
            "Occupational Burnout",
            null,
            null,
            true,
            ),
    };

    return chips;
};

var generateChips = function() {
    const chips = new Array();
    const startCount = 16;
    const bossCount = 4;
    for (let i = 0; i < startCount; ++i) {
        const name = i.toString();
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
        const name = parentName + (isSacrefice ? '-' : '+');
        return new Chip(
            name,
            _ => GetChip(name, false, bossIndex + 1),
            _ => GetChip(name, true, bossIndex + 1)
            );
    }

    const handmakeChips = getChips();
    chips[0] = handmakeChips.personalLife;
    chips[1] = handmakeChips.healthySleep;
    chips[2] = handmakeChips.vacation;

    return chips;
};
