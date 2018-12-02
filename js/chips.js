class Chip {
    constructor(text, onStay, onSacrifice, gameOver = false) {
        this.text = text;
        this.onStay = onStay;
        this.onSacrifice = onSacrifice;
        this.gameOver = gameOver;
    }
}

const GameData = {
    chips: {
        personalLife: new Chip(
            "Personal Life",
            bossIndex => {
                if (bossIndex === 0 ||
                    bossIndex === 3) {
                    return GameData.chips.relationship;
                } else {
                    return GameData.chips.personalLife;
                }
            },
            _ => GameData.chips.loneliness,
        ),

        loneliness: new Chip(
            "Loneliness",
            _ => GameData.chips.personalLife,
            _ => GameData.chips.depression,
        ),

        relationship: new Chip(
            "Relationship",
            _ => GameData.chips.family,
            _ => GameData.chips.depression,
        ),

        depression: new Chip(
            "Depression",
            bossIndex => {
                if (bossIndex === 2) {
                    return GameData.chips.deepGame;
                } else {
                    return GameData.chips.loneliness;
                }
            },
            _ => GameData.chips.leftGameDev,
        ),

        family: new Chip(
            "Family",
            _ => GameData.chips.children,
            _ => GameData.chips.depression,
        ),

        children: new Chip(
            "Children",
            _ => GameData.chips.happyRetirement,
            _ => GameData.chips.divorce,
        ),

        deepGame: new Chip(
            "Deep Themes in game",
            _ => GameData.chips.playersTears,
            _ => GameData.chips.gameWithoutSoul,
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
            _ => GameData.chips.healthySleep,
            _ => GameData.chips.sleepDeprivation,
        ),

        sleepDeprivation: new Chip(
            "Sleep Deprivation",
            _ => GameData.chips.healthySleep,
            _ => GameData.chips.migraine,
        ),

        migraine: new Chip(
            "Migraine",
            _ => GameData.chips.sleepDeprivation,
            _ => GameData.chips.leftGameDev,
        ),

        vacation: new Chip(
            "Vacation",
            _ => GameData.chips.vacation,
            _ => GameData.chips.chronicFatigueSyndrome,
        ),

        chronicFatigueSyndrome: new Chip(
            "Chronic fatigue syndrome",
            _ => GameData.chips.vacation,
            _ => GameData.chips.neurosis,
        ),

        neurosis: new Chip(
            "Neurosis",
            _ => GameData.chips.chronicFatigueSyndrome,
            _ => GameData.chips.occupationalBurnout,
        ),

        occupationalBurnout: new Chip(
            "Occupational Burnout",
            null,
            null,
            true,
        ),
    },
    handChipsCount: 16,
    bosses: [
        { health: 1 },
        { health: 2 },
        { health: 4 },
        { health: 3 }
    ],
    handChips: function () {
        return [
            this.chips.personalLife,
            this.chips.healthySleep,
            this.chips.vacation,
            // TODO Add all 16 here
        ];
    },

    getInitialChips: function () {
        let initialChips = GameData.handChips().slice();

        for (let i = initialChips.length; i < GameData.handChipsCount; ++i) {
            const name = "Chip #" + i.toString();
            initialChips.push(new Chip(
                name,
                _ => GetChip(name, false, 0),
                _ => GetChip(name, true, 0)
            ));
        }

        function GetChip(parentName, isSacrifice, bossIndex) {
            if (bossIndex == GameData.bosses.length) {
                return null;
            }
            const name = parentName + (isSacrifice ? '-' : '+');
            return new Chip(
                name,
                _ => GetChip(name, false, bossIndex + 1),
                _ => GetChip(name, true, bossIndex + 1)
            );
        }

        return initialChips;
    }
}