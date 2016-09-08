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
        speed: 3500,
        startParabolaSize: 0,
        startParabolaTime: 0,
        endParabolaSize: 40,
        endParabolaTime: 80,
        defaultTypeOfSymbol: "def",
        symbols: {
            1: {
                types: [
                    "def"
                ],
                name: "el_1"
            },
            2: {
                types: [
                    "def"
                ],
                name: "el_2"
            },
            3: {
                types: [
                    "def"
                ],
                name: "el_3"
            },
            4: {
                types: [
                    "def"
                ],
                name: "el_4"
            },
            5: {
                types: [
                    "def"
                ],
                name: "el_5"
            }
        },
        symbolTypes: {
            "def": {
                scale: 1
            }
        },
        allowedSymbolTypes: {
            "default": {
                "def": "def"
            }
        },
        fps: 60
    },
    controls: {
        width: 700,
        height: 150,
        x: 280,
        y: 550,
        btn: {
            width: 200,
            height: 90,
            color: 0xfcfcfc,
            cornersRadius: 15
        },
        startBtn: {
            x: 10,
            y: 10,
            text: 'START!',
            textStyle: {
                font: 'bold 24px Arial',
                fill: '#00ff00',
                stroke: '#cccccc',
                strokeThickness: 2
            }
        },
        stopBtn: {
            x: 220,
            y: 10,
            text: 'STOP!',
            textStyle: {
                font: 'bold 24px Arial',
                fill: '#ff0000',
                stroke: '#cccccc',
                strokeThickness: 2
            }
        }
    },

    descrtiptionLabel:{
        x: 50,
        y: 30,
        text: "Hello! It's a simple and quality slot machine solution made by Kostiantyn Bokov.",
        textStyle: {
            font: '64px Arial',
            fill: '#000000',
            stroke: '#cccccc',
            strokeThickness: 2
        }
    }
};
export default config;