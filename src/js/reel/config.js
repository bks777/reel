let config = {
    bgColor: 0x40e0d0,
    fillColor: 0xfcfcfc,
    fillAlpha: .3,
    cornerRaduis: 20,
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
    controls: {
        width: 700,
        height: 150,
        x: 300,
        y: 600,
        btn: {
            width: 100,
            height: 45,
            color: 0xfcfcfc,
            cornersRadius: 5
        },
        startBtn: {
            x: 10,
            y: 10,
            text: 'START!',
            textStyle: {
                font: 'bold 14px Arial',
                fill: '#00ff00',
                stroke: '#000000'
            }
        },
        stopBtn: {
            x: 120,
            y: 10,
            text: 'STOP!',
            textStyle: {
                font: 'bold 14px Arial',
                fill: '#ff0000',
                stroke: '#000000'
            }
        },
        aboutBtn: {
            x: 230,
            y: 10,
            text: 'Info',
            textStyle: {
                font: 'bold 20px Arial',
                fill: '#cccccc',
                stroke: '#000000'
            }
        },
    }
};
export default config;