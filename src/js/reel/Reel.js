const PIXI = window.PIXI;
import Element from './Element';
import Animations from './Animations';

export default class Reel extends PIXI.Container {
    static get STATE_STOP () {      return 1;   }
    static get STATE_STARTING () {  return 2;   }
    static get STATE_RUN () {       return 3;   }
    static get STATE_STOPPING () {  return 4;   }
    static get STATE_FINISHING () { return 5;   }
    static get STATE_NEED_FINISH(){ return 6;   }
    static get STATE_NEED_START (){ return 7;   }

    constructor(config){
        super();
        this.config = config;
        this.stoppedRows = 0;
        this.values = [];
        this.elements = [];
        this.state = Reel.STATE_STOP;
        this.init();

        this.setAnimation (this.config.animation);
    }

    init () {
        for (var i = 0; i < this.config.numOfRows; i++) {
            var el = this.createRandomElement();
            el.x = 0;
            el.y = (i-1)*(this.config.rowHeight + this.config.distanceBetweenRows);
            this.addChild(el);
            this.elements.push(el);

            if (i > 0 && i < this.config.numOfRows-1) {
                el.cursor = "pointer";
            }
        }
        PIXI.customTicker.add( this.reelTick, this);
        // this.addEventListener("tick", this.reelTick.bind(this));
    }

    setAnimation (animationType = "standard") {
        if (Animations[animationType] !== undefined) {
            this.mainLoop = Animations[animationType].bind(this);
            this.animationType = animationType;
        } else {
            this.mainLoop = Animations.standard.bind(this);
            this.animationType = "standard";
        }
    }

    createRandomElement (type) {
        let imgNum = this.getAllowedRandomSymbol();
        return this.createElement (imgNum, type);
    }

    getAllowedRandomSymbol () {
        let imgNum,
            allowedSymbols = [],
            gameType = "spins",
            index;

        if (this.config.allowedSymbols[gameType]) {
            allowedSymbols = this.config.allowedSymbols[gameType];
        } else {
            for (let i = 0; i < this.config.numOfSymbols; i++) {
                allowedSymbols.push (i+1);
            }
        }

        index = Math.floor (Math.random() * allowedSymbols.length );
        imgNum = allowedSymbols[index];

        return imgNum;
    }

    createElement (num, type = this.config.defaultTypeOfSymbol) {
        if (this.config.symbols[num] === undefined) {
            console.error (`There is no symbol=${num}. Using symbol = 1`);
            num = 1;
        }

        if (this.config.symbols[num].types.indexOf(type) < 0) {
            console.error (`There is no type=${type} for symbol=${num}. Using default type`);
            type = this.config.defaultTypeOfSymbol;
        }

        let el = new Element (
            num,
            type,
            this.config.symbols[num],
            this.config.symbolTypes,
            this.config.textures[this.config.symbols[num].name]
        );

        el.width = this.config.width;
        el.height = this.config.rowHeight;

        return el;
    }

    reelTick (event) {
        this.mainLoop (event);

        if (this.state === Reel.STATE_RUN && this.needBlur) {

            for (let i = 0; i < this.elements.length; i++) {
                this.elements[i].setSymbolType("blur");
            }

            this.needBlur = false;
            this.needDefaultSymbols = true;
        }

        if (this.needDefaultSymbols && (
                this.state === Reel.STATE_NEED_FINISH
                    || this.state === Reel.STATE_FINISHING
                        || this.state === Reel.STATE_STOP
                )
        ){
            for (let i = 0; i < this.elements.length; i++) {
                this.elements[i].setSymbolType("def");
            }
            this.needDefaultSymbols = false;
        }
    }
}