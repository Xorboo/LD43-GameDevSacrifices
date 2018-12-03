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
        // Personal Life
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

        // Social life
        socialLife: new Chip(
            "Social life",
            _ => GameData.chips.moreConnections,
            _ => GameData.chips.stopHikikomori,
        ),

        stopHikikomori: new Chip(
            "Stop being a hikikomori",
            _ => GameData.chips.socialLife,
            _ => GameData.chips.howTalkPeople,
        ),

        moreConnections: new Chip(
            "More connections",
            _ => GameData.chips.bizdevParty,
            _ => GameData.chips.findTimeForConnections,
        ),

        howTalkPeople: new Chip(
            "Learn how to talk to people",
            _ => GameData.chips.stopMisanthrope,
            _ => GameData.chips.feedCats,
        ),

        findTimeForConnections: new Chip(
            "Find time for connections",
            _ => GameData.chips.workCommunity,
            _ => GameData.chips.optimizeConnections,
        ),

        bizdevParty: new Chip(
            "Bizdev party",
            _ => GameData.chips.liverProblem,
            _ => GameData.chips.bizdevInfo,
        ),

        feedCats: new Chip(
            "Feed cats",
            _ => GameData.chips.strongIndependent,
            _ => GameData.chips.escapeFromCats,
        ),

        stopMisanthrope: new Chip(
            "Stop being a misanthrope",
            _ => GameData.chips.harassmentCharges,
            _ => GameData.chips.noWorkWithAnyone,
        ),

        optimizeConnections: new Chip(
            "Optimize connections",
            _ => GameData.chips.foundFriends,
            _ => GameData.chips.foundEnemies,
        ),

        workCommunity: new Chip(
            "Work with community",
            _ => GameData.chips.reviewBombing,
            _ => GameData.chips.fansLove,
        ),

        bizdevInfo: new Chip(
            "Lack of bizdev info",
            _ => GameData.chips.oldBuzzwords,
            _ => GameData.chips.portToNewDevice,
        ),

        liverProblem: new Chip(
            "Liver problems",
            _ => GameData.chips.alcoholAddiction,
            _ => GameData.chips.vegan,
        ),

        escapeFromCats: new Chip(
            "Escape from hungry cats",
        ),

        strongIndependent: new Chip(
            "Become strong and independent developer",
        ),

        noWorkWithAnyone: new Chip(
            "You can't work with anyone",
        ),

        harassmentCharges: new Chip(
            "Deal with harassment charges",
        ),

        foundEnemies: new Chip(
            "You found enemies",
        ),

        foundFriends: new Chip(
            "You found best friends",
        ),

        reviewBombing: new Chip(
            "People are review bombing your game",
        ),

        fansLove: new Chip(
            "Fans loves you",
        ),

        oldBuzzwords: new Chip(
            "Use old buzz-words at press-release",
        ),

        portToNewDevice: new Chip(
            "Make a port of game to new device",
        ),

        alcoholAddiction: new Chip(
            "Alcohol Addiction",
        ),

        vegan: new Chip(
            "Become a vegan",
        ),

        // Healthy sleep
        healthySleep: new Chip(
            "Healthy sleep",
            boss => {
                return boss === 0
                    ? GameData.chips.dreamDiary
                    : GameData.chips.healthySleep;
            },
            _ => GameData.chips.sleepDeprivation,
        ),

        sleepDeprivation: new Chip(
            "Sleep Deprivation",
            _ => GameData.chips.healthySleep,
            _ => GameData.chips.migraine,
        ),

        dreamDiary: new Chip(
            "Keep a dream diary",
            _ => GameData.chips.alwaysDreaming,
            _ => GameData.chips.healthySleep,
        ),

        migraine: new Chip(
            "Migraine",
            _ => GameData.chips.sleepDeprivation,
            _ => GameData.chips.leftGameDev,
        ),

        alwaysDreaming: new Chip(
            "Never stop dreaming",
            _ => GameData.chips.stopFeatureCreeping,
            _ => GameData.chips.healthySleep,
        ),

        stopFeatureCreeping: new Chip(
            "Stop feature creeping",
            _ => GameData.chips.mediocreGame,
            _ => GameData.chips.projectWasCanceled,
        ),

        mediocreGame: new Chip(
            "Mediocre game",
        ),

        projectWasCanceled: new Chip(
            "Project was cancelled",
        ),

        // vacation
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

        // portfolio
        buildPortfolio: new Chip(
            "Build a portfolio",
            _ => GameData.chips.buildGoodPortfolio,
            _ => GameData.chips.shareWorks,
        ),

        shareWorks: new Chip(
            "Share your works",
            _ => GameData.chips.stopAddictedLikes,
            _ => GameData.chips.stopPerfectionist,
        ),

        buildGoodPortfolio: new Chip(
            "Build a good portfolio",
            _ => GameData.chips.buildBetterPortfolio,
            _ => GameData.chips.buildGoodPortfolio,
        ),

        stopPerfectionist: new Chip(
            "Stop perfectionism",
            _ => GameData.chips.howTradeOff,
            _ => GameData.chips.increaseQuality,
        ),

        stopAddictedLikes: new Chip(
            "Stop being addicted to likes",
            _ => GameData.chips.freelancing,
            _ => GameData.chips.patreon,
        ),

        buildBetterPortfolio: new Chip(
            "Build a better portfolio",
            _ => GameData.chips.buildSuitablePortfolio,
            _ => GameData.chips.buildBetterPortfolio,
        ),

        increaseQuality: new Chip(
            "Increase quality of the game",
            _ => GameData.chips.developmentHell,
            _ => GameData.chips.forgetTheGame,
        ),

        howTradeOff: new Chip(
            "Teach people how to trade-off",
            _ => GameData.chips.peoplePerfectionism,
            _ => GameData.chips.peoplePerfectionism,
        ),

        patreon: new Chip(
            "Start patreon",
            _ => GameData.chips.becomeCosplayer,
            _ => GameData.chips.becomeBlogger,
        ),

        freelancing: new Chip(
            "Start freelancing",
            _ => GameData.chips.leftForFreelance,
            _ => GameData.chips.hateOfficeWork,
        ),

        buildSuitablePortfolio: new Chip(
            "Build an suitable portfolio",
            _ => GameData.chips.receiveJobInvitation,
            _ => GameData.chips.continueCurrentJob,
        ),

        forgetTheGame: new Chip(
            "You want to start new and forget about the game",
        ),

        developmentHell: new Chip(
            "Game fall to development hell",
        ),

        peoplePerfectionism: new Chip(
            "People continue perfectionism",
        ),

        becomeBlogger: new Chip(
            "You become a blogger",
        ),

        becomeCosplayer: new Chip(
            "You become a cosplayer",
        ),

        hateOfficeWork: new Chip(
            "You hate office work",
        ),

        leftForFreelance: new Chip(
            "You left the job for freelance",
        ),

        continueCurrentJob: new Chip(
            "Continue to work at the current job",
        ),

        receiveJobInvitation: new Chip(
            "You receive a great job invitation",
        ),

        // gamejam
        gamejam: new Chip(
            "Participate in gamejams",
            _ => GameData.chips.stopWork7,
            _ => GameData.chips.startPet,
        ),

        startPet: new Chip(
            "Start a pet-project",
            _ => GameData.chips.addBattleRoyale,
            _ => GameData.chips.findForPet,
        ),

        stopWork7: new Chip(
            "Stop working 7 days a week",
            _ => GameData.chips.useFreeTime,
            _ => GameData.chips.beatWorkaholism,
        ),

        findForPet: new Chip(
            "Find people for pet-project",
            _ => GameData.chips.manageSideTeam,
            _ => GameData.chips.escapeFromPet,
        ),

        addBattleRoyale: new Chip(
            "Add to pet-project battle-royale mode",
            _ => GameData.chips.addBlockchain,
            _ => GameData.chips.addBattle,
        ),

        beatWorkaholism: new Chip(
            "Beat the workaholism",
            _ => GameData.chips.stopProcrastination,
            _ => GameData.chips.occupationalBurnout,
        ),

        useFreeTime: new Chip(
            "Start to use free time somehow",
            _ => GameData.chips.courses,
            _ => GameData.chips.stopWatchingCeiling,
        ),

        escapeFromPet: new Chip(
            "Escape from someone else's pet-project",
            _ => GameData.chips.sayNo,
            _ => GameData.chips.underestimated,
        ),

        manageSideTeam: new Chip(
            "Manage a side team of amateurs",
            _ => GameData.chips.ownTeam,
            _ => GameData.chips.everyoneAmateurs,
        ),

        addBattle: new Chip(
            "Add to pet-project at least a battle",
            _ => GameData.chips.petBattle,
            _ => GameData.chips.returnToPet,
        ),

        addBlockchain: new Chip(
            "Add to project blockchain",
            _ => GameData.chips.howTradeOff,
            _ => GameData.chips.blockchainWallet,
        ),

        stopWatchingCeiling: new Chip(
            "Stop looking at the ceiling all weekend",
            _ => GameData.chips.eyesWeekends,
            _ => GameData.chips.ceilingLooking,
        ),

        courses: new Chip(
            "Sign up for courses",
            _ => GameData.chips.knowNothing,
            _ => GameData.chips.knowSomething,
        ),

        stopProcrastination: new Chip(
            "Stop procrastinating",
            _ => GameData.chips.stillWorkaholic,
            _ => GameData.chips.youFired,
        ),

        underestimated: new Chip(
            "You consider yourself underestimated",
        ),

        sayNo: new Chip(
            "You learned how to say NO",
        ),

        everyoneAmateurs: new Chip(
            "You consider everyone as amateurs",
        ),

        ownTeam: new Chip(
            "You have your own team",
        ),

        returnToPet: new Chip(
            "You will return to your pet-project someday",
        ),

        petBattle: new Chip(
            "You have a pet-project with a battle",
        ),

        blockchainWallet: new Chip(
            "You have a blockchain wallet",
        ),

        worldOfTrading: new Chip(
            "You collide with the world of trading",
        ),

        ceilingLooking: new Chip(
            "Ceiling started looking at you",
        ),

        eyesWeekends: new Chip(
            "You prefer not to open your eyes all the weekends",
        ),

        knowSomething: new Chip(
            "You think you know something",
        ),

        knowNothing: new Chip(
            "You think you know nothing",
        ),

        youFired: new Chip(
            "You're fired",
        ),

        stillWorkaholic: new Chip(
            "You are still a workaholic",
        ),
    },
    handChipsCount: 8,
    bosses: [
        { health: 1 },
        { health: 2 },
        { health: 4 },
        { health: 3 }
    ],
    handChips: function () {
        return [
            this.chips.personalLife,
            this.chips.socialLife,
            this.chips.healthySleep,
            this.chips.vacation,
            this.chips.buildPortfolio,
            this.chips.gamejam,
            // TODO Add all starting chips here
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