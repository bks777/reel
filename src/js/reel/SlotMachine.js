const PIXI = window.PIXI;
import config from './config';
import Reel from './Reel';

export default class SlotMachine {
    /**
     * States getters
     */
    static get STATE_DATA_LOADED() {
        return 1;
    }

    static get STATE_STOP() {
        return 2;
    }

    static get STATE_STARTING() {
        return 3;
    }

    static get STATE_RUN() {
        return 4;
    }

    static get STATE_STOPPING() {
        return 5;
    }

    static get STATE_FINISHING() {
        return 6;
    }

    static get STATE_NEED_FINISH() {
        return 7;
    }

    static get STATE_NEED_START() {
        return 8;
    }

    /**
     * Constructor for reelSystem
     * @param config {Object} consists parsed JSON with images and init data
     * @constructor
     */
    constructor(config) {
        this.state = false;
        this._rootContainer = new PIXI.Container();
        this.initRenderer(config.parent, config.width, config.height);
        this.initTextures(config.images)
            .then(()=> {
                this.state = SlotMachine.STATE_DATA_LOADED;
            });
        this.startCounter = 0;
        this.initSlotMachine();
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
        console.info('!!! START !!!');
        this.startCounter = undefined;
        this.state = SlotMachine.STATE_STOP;
        this.initReels()
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
}