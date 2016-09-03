let config = {
    left: 130,
    top: 113,
    width: 700,
    height: 420,
    distanceBetweenReels: 0,
    delayBetweenReelsStart: 0,
    delayBetweenReelsStop: 200,
    reels: [
        {
            animation: 'standard',
            allowedSymbols: {
                spins: [1, 2, 3, 4, 5]
            }
        },
        {
            animation: 'standard',
            allowedSymbols: {
                spins: [1, 2, 3, 4, 5]
            }
        },
        {
            animation: 'standard',
            allowedSymbols: {
                spins: [1, 2, 3, 4, 5]
            }
        },
        {
            animation: 'standard',
            allowedSymbols: {
                spins: [1, 2, 3, 4, 5]
            }
        },
        {
            animation: 'standard',
            allowedSymbols: {
                spins: [1, 2, 3, 4, 5]
            }
        },
    ],
    defaultReel: {
        left: "auto",
        top: 0,
        width: 140,
        height: 420,
        numOfRows: 5,
        rowHeight: 140,
        distanceBetweenRows: 0,
        animation: "standard",
        numOfSymbols: 14,
        // blurWhileRun: false,
        speed: 3500,
        startParabolaSize: 0,
        startParabolaTime: 0,
        endParabolaSize: 40,
        endParabolaTime: 80,
        defaultTypeOfSymbol: "def",
        symbols: {
            1: {
                types: [
                    "def",
                    "blur",
                ],
                name: "el_1"
            },
            2: {
                types: [
                    "def",
                    "blur"
                ],
                name: "el_2"
            },
            3: {
                types: [
                    "def",
                    "blur"
                ],
                name: "el_3"
            },
            4: {
                types: [
                    "def",
                    "blur"
                ],
                name: "el_4"
            },
            5: {
                types: [
                    "def",
                    "blur"
                ],
                name: "el_5"
            }
        },
        symbolTypes: {
            "def": {
                scale: 1
            },
            "disable": {
                scale: 1
            },
            "blur": {
                scale: 1.33
            }
        },
        allowedSymbolTypes: {
            "default": {
                "def": "def",
                "disable": "disable",
                "blur": "blur"
            }
        },
        fps: 60
    },
};
export default config;