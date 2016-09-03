const PIXI = window.PIXI;
import config from './config';
import Reel from './Reel';
import Controls from './Controls';

/**
 * Creating of random number
 * @param min {Number} from
 * @param max {Number} to
 * @returns {*}
 */
 function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

export default class SlotMachine {
    /**
     * States getters
     */
    static get STATE_DATA_LOADED() {return 1;}
    static get STATE_STOP () {      return 2;}
    static get STATE_STARTING () {  return 3;}
    static get STATE_RUN () {       return 4;}
    static get STATE_STOPPING () {  return 5;}

    /**
     * Constructor for reelSystem
     * @param conf {Object} consists parsed JSON with images and init data
     * @constructor
     */
    constructor(conf) {
        this.state = false;
        this._rootContainer = new PIXI.Container();

        this.initRenderer(conf.parent, conf.width, conf.height);
        this.initTextures(conf.images)
            .then(()=> {
                this.state = SlotMachine.STATE_DATA_LOADED;
            });
        this.startCounter = 0;
        this.initSlotMachine();

        this._rootContainer.x = config.left;
        this._rootContainer.y = config.top;
        this._rootContainer.width = config.width;
        this._rootContainer.height = config.height;
        this._setMask(config.width, config.height);
        this._fillStageBg(config.bgColor, conf.width, conf.height);

    }

    /**
     * Setting mask for main screen of reelSystem
     * Decoration for reels
     * @param width
     * @param height
     * @private
     */
    _setMask(width, height){
        let mask = new PIXI.Graphics(),
            rect = new PIXI.Graphics();
        mask.beginFill();
        mask.drawRoundedRect(config.left, config.top, width, height, config.cornerRaduis);
        mask.endFill();
        this.stage.addChild(mask);
        this._rootContainer.mask = mask;

        rect.beginFill(config.fillColor, config.fillAlpha);
        rect.drawRoundedRect(config.left, config.top, width, height, config.cornerRaduis);
        rect.endFill();

        this.stage.addChildAt(rect, 1);
    }

    /**
     * Adds back color
     * @param color
     * @param width
     * @param height
     * @private
     */
    _fillStageBg(color, width = 1280, height = 720){
        let bgFiller = new PIXI.Graphics();
        bgFiller.beginFill(color, 1);
        bgFiller.drawRect(0, 0, width, height);
        bgFiller.endFill();
        this.stage.addChildAt(new PIXI.Sprite(bgFiller.generateCanvasTexture()), 0);
    }

    /**
     * Creates PIXI renderer and start frames ticker
     * @param parent {String} parent node id for a PIXI stage
     * @param width {Number} width of a stage
     * @param height {Number} height of a stage
     */
    initRenderer(parent = 'container', width = 640, height = 480) {
        let renderer = PIXI.autoDetectRenderer(width, height, {antialias: true, resolution: 1}),
            stage = new PIXI.Container(),
            ticker = new PIXI.ticker.Ticker();

        document.getElementById(parent).appendChild(renderer.view);
        ticker.add(()=> {
            renderer.render(stage);
        });
        ticker.start();

        this.stage = stage;
        this.ticker = ticker;
        PIXI.customTicker = ticker;
    }

    /**
     * Creates PIXI.Textures and continue to init SlotMachine
     * @param images {Array} Array of objects with 'name' and 'path' properties
     * @returns {Promise}
     */
    initTextures(images = []) {
        return new Promise((resolve, reject)=> {
            let loader = PIXI.loader,
                textures = [];

            images.forEach((element)=> {
                loader.add(element.name, element.path);
            });
            loader.on('error', reject);
            loader.on('complete', (loader, res)=> {
                for (let image in res) {
                    textures[image] = new PIXI.Texture(
                        new PIXI.BaseTexture(res[image].data)
                    );
                }
                config.defaultReel.textures = textures;
                resolve();
            });
            loader.load();
        });
    }

    /**
     * Start setup of SlotMachine
     */
    initSlotMachine() {
        clearInterval(this.startInterval);
        if (this.state !== SlotMachine.STATE_DATA_LOADED) {
            if (this.startCounter > 15) {
                console.error('something happened during data parsing.\nTry to reload the page ;-(');
                return;
            }
            console.info('images not loaded, \nanother try in 1 sec');
            this.startInterval = setInterval(this.initSlotMachine.bind(this), 1000);
            this.startCounter++;
            return;
        }
        this.startCounter = undefined;
        this.state = SlotMachine.STATE_STOP;
        this.initReels();
        this.controls = new Controls(this.startReels.bind(this), this.stopReels.bind(this), ()=>{console.info('K.Bokov production')});
        this.stage.addChild(this.controls);
    }

    /**
     * Creating and adding of reels
     */
    initReels() {
        this.reels = [];
        for (let reel in config.reels) {
            this.addReel(config.reels[reel]);
        }
        this.stage.addChild(this._rootContainer);
    }

    /**
     * Add single reel container to the slotMachine container
     * @param conf
     */
    addReel(conf) {
        let reelConfig = Object.assign({}, config.defaultReel, conf),
            reel = new Reel(reelConfig),
            x = 0;

        if (reelConfig.left === "auto") {
            for (let r in this.reels) {
                x += this.reels[r].config.width + config.distanceBetweenReels;
            }
        } else {
            x = reelConfig.left;
        }

        reel.x = x;
        reel.y = reelConfig.top;
        reel.setAnimation(reelConfig.animation);
        reel.number = this.reels.length;

        this._rootContainer.addChild(reel);
        this.reels.push(reel);
    }

    /**
     * Stops slotMachine animations
     * @returns {Promise}
     */
    stopReels () {
        let values = this.randomValues;
        return new Promise ( (resolve, reject) => {
            this._delayBetweenReelsStop = (config.delayBetweenReelsStop !== undefined ? config.delayBetweenReelsStop : 0);

            /* stop with delay */
            this.state = SlotMachine.STATE_STOPPING;
            let i = 0,
                reelsStopped = 0,
                stopThreadCallback = (callback = stopThreadCallback)=>{
                if (i > this.reels.length-1){
                    return;
                }

                this.reels[i].stop(this.randomValues[i])
                    .then (() => {
                        reelsStopped++;

                        if (reelsStopped === this.reels.length) {
                            this.state = SlotMachine.STATE_STOP;
                            resolve();
                        }
                    })
                    .catch((rejection) => {
                        reject(rejection);
                    });

                i++;
                if (callback){
                    setTimeout(callback, this._delayBetweenReelsStop);
                }
            };

            setTimeout(stopThreadCallback, this._delayBetweenReelsStop );
        });

    }

    /**
     * Starting of slot machine animations. Yay!
     */
    startReels() {
        if (this.state === SlotMachine.STATE_STOP) {
            this.ticker.addOnce(()=>{
                /* momentum start */
                this.state = SlotMachine.STATE_STARTING;
                for (let i = 0; i < this.reels.length; i++) {
                    this.reels[i].start();
                }
                this.state = SlotMachine.STATE_RUN;
            }, this);
        }
    }

    /**
     * Server imitation
     * @returns {Array}
     */
    get randomValues(){
        let cols = 5,
            raws = 3,
            arr = [],
            innerArr;
        for(let col = 0; col < cols; col++){
            innerArr = [];
            for(let raw = 0; raw < raws; raw++){
                innerArr.push(getRandomNumber(1, 5))
            }
            arr.push(innerArr);
        }

        return arr;
    }
}