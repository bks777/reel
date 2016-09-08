const PIXI = window.PIXI;
import Element from './Element';
import Animations from './Animations';

/**
 * Object clone
 * @param object
 * @returns {*}
 */
function getClone(object)
{
    return JSON.parse(JSON.stringify(object));
}

export default class Reel extends PIXI.Container {
    /**
     * Reel inner states getters
     */
    static get STATE_STOP () {      return 1;   }
    static get STATE_STARTING () {  return 2;   }
    static get STATE_RUN () {       return 3;   }
    static get STATE_STOPPING () {  return 4;   }
    static get STATE_FINISHING () { return 5;   }
    static get STATE_NEED_FINISH(){ return 6;   }
    static get STATE_NEED_START (){ return 7;   }

    /**
     * Init of a reel
     * @param config
     * @constructor
     */
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

    /**
     * creating and setting of symbols,
     * adding to the PIXI render
     */
    init () {
        for (var i = 0; i < this.config.numOfRows; i++) {
            var el = this.createRandomElement();
            el.x = 0;
            el.y = (i - 1)*(this.config.rowHeight + this.config.distanceBetweenRows);
            this.addChild(el);
            this.elements.push(el);

            if (i > 0 && i < this.config.numOfRows-1) {
                el.cursor = "pointer";
            }
        }
        PIXI.customTicker.add( this.reelTick, this);
    }

    /**
     * For future extending of animations
     * @param animationType
     */
    setAnimation (animationType = "standard") {
        if (Animations[animationType] !== undefined) {
            this.mainLoop = Animations[animationType].bind(this);
            this.animationType = animationType;
        } else {
            this.mainLoop = Animations.standard.bind(this);
            this.animationType = "standard";
        }
    }

    /**
     * Creates random symbol instance
     * @param type
     * @returns {*}
     */
    createRandomElement (type) {
        let imgNum = this.getAllowedRandomSymbol();
        return this.createElement (imgNum, type);
    }

    /**
     * getting of available type for current reel
     * @returns {*}
     */
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

    /**
     * Creates PIXI Sprite element
     * @param num
     * @param type
     * @returns {Element}
     */
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
            this.config.textures[this.config.symbols[num].name]
        );

        el.width = this.config.width;
        el.height = this.config.rowHeight;

        return el;
    }

    /**
     * Render function
     * @param event
     */
    reelTick (event) {
        this.mainLoop (event);
        if (this.state === Reel.STATE_RUN ) {
            this.needDefaultSymbols = true;
        }

        if (this.needDefaultSymbols && (
                this.state === Reel.STATE_NEED_FINISH
                    || this.state === Reel.STATE_FINISHING
                        || this.state === Reel.STATE_STOP
                )
        ){
            this.needDefaultSymbols = false;
        }
    }

    /**
     * Creates element for further animating
     * @returns {*}
     */
    nextElement () {
        let newEl,
            type = "def";

        if (this.state === Reel.STATE_STOPPING) {
            newEl = this.createElement(this.values[this.stoppedRows], type);
            this.stoppedRows++;
            if (this.stoppedRows > this.children.length) {
                this.state = Reel.STATE_NEED_FINISH;
                this.stoppedRows = 0;
            }
        } else {
            newEl = this.createRandomElement(type);
        }

        return newEl;
    }

    /**
     * Stop logic for current reel
     * @param values
     * @returns {*}
     */
    stop (values) {
        if (this.state === Reel.STATE_STARTING) {
            return new Promise ((resolve, reject) => {
                setInterval (() => {
                    if (this.state !== Reel.STATE_STARTING) {
                        resolve();
                    }
                },50);
            }).then (() => {
                return this._stop(values);
            });

        } else {
            return this._stop(values);
        }
    };

    /**
     * Stop of current reel
     * @param values
     * @returns {Promise}
     * @private
     */
    _stop (values) {
        return new Promise ((resolve, reject) => {
            let first = this.getAllowedRandomSymbol(),
                last = this.getAllowedRandomSymbol();

            values = getClone(values);
            values = values.reverse();
            this.values = [first, ...values, last];
            this.state = Reel.STATE_STOPPING;

            let detectStopInterval = setInterval(() => {
                if (this.state === Reel.STATE_STOP) {
                    clearInterval(detectStopInterval);
                    resolve();
                }
            }, 50);
        });
    }

    /**
     * Change of state to start the animation
     */
    start () {
        this.state = Reel.STATE_NEED_START;
    }
}