/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Loader = __webpack_require__(2);

	var _Loader2 = _interopRequireDefault(_Loader);

	var _SlotMachine = __webpack_require__(3);

	var _SlotMachine2 = _interopRequireDefault(_SlotMachine);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var sm = void 0;
	_Loader2.default.httpGet({ url: './res/config.json' }).then(function (config) {
	    sm = new _SlotMachine2.default(JSON.parse(config));
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Class for loading of resources
	 * @singleton
	 */

	var loaderInstance;

	var Loader = function () {
	    /**
	     * Constructor
	     */
	    function Loader() {
	        _classCallCheck(this, Loader);

	        this.XHR = "onload" in new XMLHttpRequest() ? XMLHttpRequest : XDomainRequest;
	        this.serverAlias = "http://localhost:8080/slot/";
	    }

	    /**
	     * GET Action
	     * @param config
	     * @returns {Promise}
	     */


	    _createClass(Loader, [{
	        key: "httpGet",
	        value: function httpGet() {
	            var config = arguments.length <= 0 || arguments[0] === undefined ? { url: 'http://google.com' } : arguments[0];

	            var request = new this.XHR();

	            return new Promise(function (resolve, reject) {
	                request.onload = function () {
	                    resolve(request.responseText);
	                };
	                request.onerror = function () {
	                    reject(request);
	                };
	                request.open("GET", config.url, true);
	                request.send();
	            });
	        }
	    }]);

	    return Loader;
	}();

	/**
	 * Realization of singleton in ES6
	 */


	if (!loaderInstance) {
	    loaderInstance = new Loader();
	}

	exports.default = loaderInstance;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _config = __webpack_require__(4);

	var _config2 = _interopRequireDefault(_config);

	var _Reel = __webpack_require__(5);

	var _Reel2 = _interopRequireDefault(_Reel);

	var _Controls = __webpack_require__(8);

	var _Controls2 = _interopRequireDefault(_Controls);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PIXI = window.PIXI;


	/**
	 * Creating of random number
	 * @param min {Number} from
	 * @param max {Number} to
	 * @returns {*}
	 */
	function getRandomNumber(min, max) {
	    return Math.floor(Math.random() * (max - min)) + min;
	}

	var SlotMachine = function () {
	    _createClass(SlotMachine, null, [{
	        key: 'STATE_DATA_LOADED',

	        /**
	         * States getters
	         */
	        get: function get() {
	            return 1;
	        }
	    }, {
	        key: 'STATE_STOP',
	        get: function get() {
	            return 2;
	        }
	    }, {
	        key: 'STATE_STARTING',
	        get: function get() {
	            return 3;
	        }
	    }, {
	        key: 'STATE_RUN',
	        get: function get() {
	            return 4;
	        }
	    }, {
	        key: 'STATE_STOPPING',
	        get: function get() {
	            return 5;
	        }

	        /**
	         * Constructor for reelSystem
	         * @param conf {Object} consists parsed JSON with images and init data
	         * @constructor
	         */

	    }]);

	    function SlotMachine(conf) {
	        var _this = this;

	        _classCallCheck(this, SlotMachine);

	        this.state = false;
	        this._rootContainer = new PIXI.Container();

	        this.initRenderer(conf.parent, conf.width, conf.height);
	        this.initTextures(conf.images).then(function () {
	            _this.state = SlotMachine.STATE_DATA_LOADED;
	        });
	        this.startCounter = 0;
	        this.initSlotMachine();

	        this._rootContainer.x = _config2.default.left;
	        this._rootContainer.y = _config2.default.top;
	        this._rootContainer.width = _config2.default.width;
	        this._rootContainer.height = _config2.default.height;
	        this._setMask(_config2.default.width, _config2.default.height);
	        this._fillStageBg(_config2.default.bgColor, conf.width, conf.height);
	    }

	    /**
	     * Setting mask for main screen of reelSystem
	     * Decoration for reels
	     * @param width
	     * @param height
	     * @private
	     */


	    _createClass(SlotMachine, [{
	        key: '_setMask',
	        value: function _setMask(width, height) {
	            var mask = new PIXI.Graphics(),
	                rect = new PIXI.Graphics();
	            mask.beginFill();
	            mask.drawRoundedRect(_config2.default.left, _config2.default.top, width, height, _config2.default.cornerRaduis);
	            mask.endFill();
	            this.stage.addChild(mask);
	            this._rootContainer.mask = mask;

	            rect.beginFill(_config2.default.fillColor, _config2.default.fillAlpha);
	            rect.drawRoundedRect(_config2.default.left, _config2.default.top, width, height, _config2.default.cornerRaduis);
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

	    }, {
	        key: '_fillStageBg',
	        value: function _fillStageBg(color) {
	            var width = arguments.length <= 1 || arguments[1] === undefined ? 1280 : arguments[1];
	            var height = arguments.length <= 2 || arguments[2] === undefined ? 720 : arguments[2];

	            var bgFiller = new PIXI.Graphics();
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

	    }, {
	        key: 'initRenderer',
	        value: function initRenderer() {
	            var parent = arguments.length <= 0 || arguments[0] === undefined ? 'container' : arguments[0];
	            var width = arguments.length <= 1 || arguments[1] === undefined ? 640 : arguments[1];
	            var height = arguments.length <= 2 || arguments[2] === undefined ? 480 : arguments[2];

	            var renderer = PIXI.autoDetectRenderer(width, height, {
	                antialiasing: true,
	                resolution: window.devicePixelRatio,
	                autoResize: true
	            }),
	                stage = new PIXI.Container(),
	                ticker = new PIXI.ticker.Ticker();
	            renderer.view.style.position = "absolute";
	            renderer.view.style.top = "0px";
	            renderer.view.style.left = "0px";
	            document.getElementById(parent).appendChild(renderer.view);
	            resize();
	            ticker.add(function () {
	                renderer.render(stage);
	            });
	            window.addEventListener("resize", resize);
	            ticker.start();

	            this.stage = stage;
	            this.ticker = ticker;
	            PIXI.customTicker = ticker;

	            function resize() {
	                window.ratio = Math.min(window.innerWidth / width, window.innerHeight / height);
	                stage.scale.x = stage.scale.y = ratio;
	                renderer.resize(Math.ceil(width * ratio), Math.ceil(height * ratio));
	            }
	        }

	        /**
	         * Creates PIXI.Textures and continue to init SlotMachine
	         * @param images {Array} Array of objects with 'name' and 'path' properties
	         * @returns {Promise}
	         */

	    }, {
	        key: 'initTextures',
	        value: function initTextures() {
	            var images = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

	            return new Promise(function (resolve, reject) {
	                var loader = PIXI.loader,
	                    textures = [];

	                images.forEach(function (element) {
	                    loader.add(element.name, element.path);
	                });
	                loader.on('error', reject);
	                loader.on('complete', function (loader, res) {
	                    for (var image in res) {
	                        textures[image] = new PIXI.Texture(new PIXI.BaseTexture(res[image].data));
	                    }
	                    _config2.default.defaultReel.textures = textures;
	                    resolve();
	                });
	                loader.load();
	            });
	        }

	        /**
	         * Start setup of SlotMachine
	         */

	    }, {
	        key: 'initSlotMachine',
	        value: function initSlotMachine() {
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
	            this.controls = new _Controls2.default(this.startReels.bind(this), this.stopReels.bind(this), function () {
	                console.info('K.Bokov production');
	            });
	            this.stage.addChild(this.controls);
	        }

	        /**
	         * Creating and adding of reels
	         */

	    }, {
	        key: 'initReels',
	        value: function initReels() {
	            this.reels = [];
	            for (var reel in _config2.default.reels) {
	                this.addReel(_config2.default.reels[reel]);
	            }
	            this.stage.addChild(this._rootContainer);
	        }

	        /**
	         * Add single reel container to the slotMachine container
	         * @param conf
	         */

	    }, {
	        key: 'addReel',
	        value: function addReel(conf) {
	            var reelConfig = Object.assign({}, _config2.default.defaultReel, conf),
	                reel = new _Reel2.default(reelConfig),
	                x = 0;

	            if (reelConfig.left === "auto") {
	                for (var r in this.reels) {
	                    x += this.reels[r].config.width + _config2.default.distanceBetweenReels;
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

	    }, {
	        key: 'stopReels',
	        value: function stopReels() {
	            var _this2 = this;

	            if (this.state === SlotMachine.STATE_RUN) {
	                // let values = this.randomValues;
	                return new Promise(function (resolve, reject) {
	                    _this2._delayBetweenReelsStop = _config2.default.delayBetweenReelsStop !== undefined ? _config2.default.delayBetweenReelsStop : 0;

	                    /* stop with delay */
	                    _this2.state = SlotMachine.STATE_STOPPING;
	                    var i = 0,
	                        reelsStopped = 0,
	                        stopThreadCallback = function stopThreadCallback() {
	                        var callback = arguments.length <= 0 || arguments[0] === undefined ? stopThreadCallback : arguments[0];

	                        if (i > _this2.reels.length - 1) {
	                            return;
	                        }

	                        _this2.reels[i].stop(_this2.randomValues[i]).then(function () {
	                            reelsStopped++;

	                            if (reelsStopped === _this2.reels.length) {
	                                _this2.state = SlotMachine.STATE_STOP;
	                                resolve();
	                            }
	                        }).catch(function (rejection) {
	                            reject(rejection);
	                        });

	                        i++;
	                        if (callback) {
	                            setTimeout(callback, _this2._delayBetweenReelsStop);
	                        }
	                    };

	                    setTimeout(stopThreadCallback, _this2._delayBetweenReelsStop);
	                });
	            }
	        }

	        /**
	         * Starting of slot machine animations. Yay!
	         */

	    }, {
	        key: 'startReels',
	        value: function startReels() {
	            var _this3 = this;

	            if (this.state === SlotMachine.STATE_STOP) {
	                this.ticker.addOnce(function () {
	                    /* momentum start */
	                    _this3.state = SlotMachine.STATE_STARTING;
	                    for (var i = 0; i < _this3.reels.length; i++) {
	                        _this3.reels[i].start();
	                    }
	                    _this3.state = SlotMachine.STATE_RUN;
	                }, this);
	            }
	        }

	        /**
	         * Server imitation
	         * @returns {Array}
	         */

	    }, {
	        key: 'randomValues',
	        get: function get() {
	            var cols = 5,
	                raws = 3,
	                arr = [],
	                innerArr = void 0;
	            for (var col = 0; col < cols; col++) {
	                innerArr = [];
	                for (var raw = 0; raw < raws; raw++) {
	                    innerArr.push(getRandomNumber(1, 5));
	                }
	                arr.push(innerArr);
	            }

	            return arr;
	        }
	    }]);

	    return SlotMachine;
	}();

	exports.default = SlotMachine;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var config = {
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
	    reels: [{
	        animation: 'standard',
	        allowedSymbols: {
	            spins: [1, 2, 3, 4, 5]
	        }
	    }, {
	        animation: 'standard',
	        allowedSymbols: {
	            spins: [1, 2, 3, 4, 5]
	        }
	    }, {
	        animation: 'standard',
	        allowedSymbols: {
	            spins: [1, 2, 3, 4, 5]
	        }
	    }, {
	        animation: 'standard',
	        allowedSymbols: {
	            spins: [1, 2, 3, 4, 5]
	        }
	    }, {
	        animation: 'standard',
	        allowedSymbols: {
	            spins: [1, 2, 3, 4, 5]
	        }
	    }],
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
	                types: ["def"],
	                name: "el_1"
	            },
	            2: {
	                types: ["def"],
	                name: "el_2"
	            },
	            3: {
	                types: ["def"],
	                name: "el_3"
	            },
	            4: {
	                types: ["def"],
	                name: "el_4"
	            },
	            5: {
	                types: ["def"],
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
	        x: 350,
	        y: 580,
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
	        }
	    }
	};
	exports.default = config;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Element = __webpack_require__(6);

	var _Element2 = _interopRequireDefault(_Element);

	var _Animations = __webpack_require__(7);

	var _Animations2 = _interopRequireDefault(_Animations);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PIXI = window.PIXI;


	/**
	 * Object clone
	 * @param object
	 * @returns {*}
	 */
	function getClone(object) {
	    return JSON.parse(JSON.stringify(object));
	}

	var Reel = function (_PIXI$Container) {
	    _inherits(Reel, _PIXI$Container);

	    _createClass(Reel, null, [{
	        key: 'STATE_STOP',

	        /**
	         * Reel inner states getters
	         */
	        get: function get() {
	            return 1;
	        }
	    }, {
	        key: 'STATE_STARTING',
	        get: function get() {
	            return 2;
	        }
	    }, {
	        key: 'STATE_RUN',
	        get: function get() {
	            return 3;
	        }
	    }, {
	        key: 'STATE_STOPPING',
	        get: function get() {
	            return 4;
	        }
	    }, {
	        key: 'STATE_FINISHING',
	        get: function get() {
	            return 5;
	        }
	    }, {
	        key: 'STATE_NEED_FINISH',
	        get: function get() {
	            return 6;
	        }
	    }, {
	        key: 'STATE_NEED_START',
	        get: function get() {
	            return 7;
	        }

	        /**
	         * Init of a reel
	         * @param config
	         * @constructor
	         */

	    }]);

	    function Reel(config) {
	        _classCallCheck(this, Reel);

	        var _this = _possibleConstructorReturn(this, (Reel.__proto__ || Object.getPrototypeOf(Reel)).call(this));

	        _this.config = config;
	        _this.stoppedRows = 0;
	        _this.values = [];
	        _this.elements = [];
	        _this.state = Reel.STATE_STOP;
	        _this.init();

	        _this.setAnimation(_this.config.animation);
	        return _this;
	    }

	    /**
	     * creating and setting of symbols,
	     * adding to the PIXI render
	     */


	    _createClass(Reel, [{
	        key: 'init',
	        value: function init() {
	            for (var i = 0; i < this.config.numOfRows; i++) {
	                var el = this.createRandomElement();
	                el.x = 0;
	                el.y = (i - 1) * (this.config.rowHeight + this.config.distanceBetweenRows);
	                this.addChild(el);
	                this.elements.push(el);

	                if (i > 0 && i < this.config.numOfRows - 1) {
	                    el.cursor = "pointer";
	                }
	            }
	            PIXI.customTicker.add(this.reelTick, this);
	        }

	        /**
	         * For future extending of animations
	         * @param animationType
	         */

	    }, {
	        key: 'setAnimation',
	        value: function setAnimation() {
	            var animationType = arguments.length <= 0 || arguments[0] === undefined ? "standard" : arguments[0];

	            if (_Animations2.default[animationType] !== undefined) {
	                this.mainLoop = _Animations2.default[animationType].bind(this);
	                this.animationType = animationType;
	            } else {
	                this.mainLoop = _Animations2.default.standard.bind(this);
	                this.animationType = "standard";
	            }
	        }

	        /**
	         * Creates random symbol instance
	         * @param type
	         * @returns {*}
	         */

	    }, {
	        key: 'createRandomElement',
	        value: function createRandomElement(type) {
	            var imgNum = this.getAllowedRandomSymbol();
	            return this.createElement(imgNum, type);
	        }

	        /**
	         * getting of available type for current reel
	         * @returns {*}
	         */

	    }, {
	        key: 'getAllowedRandomSymbol',
	        value: function getAllowedRandomSymbol() {
	            var imgNum = void 0,
	                allowedSymbols = [],
	                gameType = "spins",
	                index = void 0;

	            if (this.config.allowedSymbols[gameType]) {
	                allowedSymbols = this.config.allowedSymbols[gameType];
	            } else {
	                for (var i = 0; i < this.config.numOfSymbols; i++) {
	                    allowedSymbols.push(i + 1);
	                }
	            }

	            index = Math.floor(Math.random() * allowedSymbols.length);
	            imgNum = allowedSymbols[index];

	            return imgNum;
	        }

	        /**
	         * Creates PIXI Sprite element
	         * @param num
	         * @param type
	         * @returns {Element}
	         */

	    }, {
	        key: 'createElement',
	        value: function createElement(num) {
	            var type = arguments.length <= 1 || arguments[1] === undefined ? this.config.defaultTypeOfSymbol : arguments[1];

	            if (this.config.symbols[num] === undefined) {
	                console.error('There is no symbol=' + num + '. Using symbol = 1');
	                num = 1;
	            }

	            if (this.config.symbols[num].types.indexOf(type) < 0) {
	                console.error('There is no type=' + type + ' for symbol=' + num + '. Using default type');
	                type = this.config.defaultTypeOfSymbol;
	            }

	            var el = new _Element2.default(this.config.textures[this.config.symbols[num].name]);

	            el.width = this.config.width;
	            el.height = this.config.rowHeight;

	            return el;
	        }

	        /**
	         * Render function
	         * @param event
	         */

	    }, {
	        key: 'reelTick',
	        value: function reelTick(event) {
	            this.mainLoop(event);
	            if (this.state === Reel.STATE_RUN) {
	                this.needDefaultSymbols = true;
	            }

	            if (this.needDefaultSymbols && (this.state === Reel.STATE_NEED_FINISH || this.state === Reel.STATE_FINISHING || this.state === Reel.STATE_STOP)) {
	                this.needDefaultSymbols = false;
	            }
	        }

	        /**
	         * Creates element for further animating
	         * @returns {*}
	         */

	    }, {
	        key: 'nextElement',
	        value: function nextElement() {
	            var newEl = void 0,
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

	    }, {
	        key: 'stop',
	        value: function stop(values) {
	            var _this2 = this;

	            if (this.state === Reel.STATE_STARTING) {
	                return new Promise(function (resolve, reject) {
	                    setInterval(function () {
	                        if (_this2.state !== Reel.STATE_STARTING) {
	                            resolve();
	                        }
	                    }, 50);
	                }).then(function () {
	                    return _this2._stop(values);
	                });
	            } else {
	                return this._stop(values);
	            }
	        }
	    }, {
	        key: '_stop',


	        /**
	         * Stop of current reel
	         * @param values
	         * @returns {Promise}
	         * @private
	         */
	        value: function _stop(values) {
	            var _this3 = this;

	            return new Promise(function (resolve, reject) {
	                var first = _this3.getAllowedRandomSymbol(),
	                    last = _this3.getAllowedRandomSymbol();

	                values = getClone(values);
	                values = values.reverse();
	                _this3.values = [first].concat(_toConsumableArray(values), [last]);
	                _this3.state = Reel.STATE_STOPPING;

	                var detectStopInterval = setInterval(function () {
	                    if (_this3.state === Reel.STATE_STOP) {
	                        clearInterval(detectStopInterval);
	                        resolve();
	                    }
	                }, 50);
	            });
	        }

	        /**
	         * Change of state to start the animation
	         */

	    }, {
	        key: 'start',
	        value: function start() {
	            this.state = Reel.STATE_NEED_START;
	        }
	    }]);

	    return Reel;
	}(PIXI.Container);

	exports.default = Reel;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PIXI = window.PIXI;

	var Element = function (_PIXI$Container) {
	    _inherits(Element, _PIXI$Container);

	    /**
	     * Init of single symbol
	     * @param texture
	     * @constructor
	     */
	    function Element(texture) {
	        _classCallCheck(this, Element);

	        var _this = _possibleConstructorReturn(this, (Element.__proto__ || Object.getPrototypeOf(Element)).call(this));

	        _this.texture = texture;

	        _this._addContent();
	        return _this;
	    }

	    /**
	     * adding of sprite to container
	     * @private
	     */


	    _createClass(Element, [{
	        key: "_addContent",
	        value: function _addContent() {
	            this.content = new PIXI.Sprite(this.texture);
	            this.addChild(this.content);
	        }
	    }]);

	    return Element;
	}(PIXI.Container);

	exports.default = Element;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Reel = __webpack_require__(5);

	var _Reel2 = _interopRequireDefault(_Reel);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * TimelineLite animation
	 * @param target symbol
	 * @param size delta for Y
	 * @param time for move in milliseconds
	 * @returns {Promise}
	 */
	function parabolaAnimation(target) {
	    var size = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	    var time = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

	    return new Promise(function (resolve, reject) {
	        new TimelineLite().to(target, time / 1000, { y: size }).to(target, time / 1000, { y: 0, onComplete: resolve });

	        setTimeout(reject, time + 500);
	    });
	}

	/**
	 * Getter for the most bottom element on the reelArea
	 * @param reel
	 * @returns {PIXI.DisplayObject}
	 */
	function findBottomElement(reel) {
	    var el = reel.getChildAt(0);

	    for (var i = 1; i < reel.children.length; i++) {
	        if (el.y < reel.getChildAt(i).y) {
	            el = reel.getChildAt(i);
	        }
	    }

	    return el;
	}

	var Animations = function () {
	    function Animations() {
	        _classCallCheck(this, Animations);
	    }

	    _createClass(Animations, null, [{
	        key: "standard",

	        /**
	         * Standard linear animation to bottom
	         */
	        value: function standard() {
	            var _this = this;

	            var maxY = this.config.height + this.config.rowHeight,
	                startPosition = -this.config.rowHeight,
	                velocity = this.config.speed / 60;

	            if (this.state === _Reel2.default.STATE_NEED_START) {
	                this.state = _Reel2.default.STATE_STARTING;
	                var startParabolaSize = this.config.startParabolaSize,
	                    startParabolaTime = this.config.startParabolaTime;

	                parabolaAnimation.call(this, this, startParabolaSize, startParabolaTime).then(function () {
	                    if (_this.state === _Reel2.default.STATE_STARTING) {
	                        _this.state = _Reel2.default.STATE_RUN;
	                    }
	                });

	                return;
	            }

	            if (this.state === _Reel2.default.STATE_STARTING || this.state === _Reel2.default.STATE_FINISHING) {
	                return;
	            }

	            if (this.state === _Reel2.default.STATE_RUN || this.state === _Reel2.default.STATE_STOPPING) {
	                setTimeout(function () {
	                    var lastEl = findBottomElement(_this);
	                    if (lastEl.y + velocity >= maxY) {
	                        _this.elements.splice(_this.elements.length - 1, 1);
	                        _this.removeChild(lastEl);

	                        var newEl = _this.nextElement(); //!* if this is the last element than state will change to STATE_NEED_FINISH *!/
	                        newEl.x = 0;
	                        newEl.y = lastEl.y - maxY + startPosition;
	                        _this.elements.splice(0, 0, newEl);
	                        _this.addChildAt(newEl, 0);
	                    }

	                    if (_this.state === _Reel2.default.STATE_NEED_FINISH) {
	                        velocity = maxY - lastEl.y;
	                    }

	                    for (var i = 0; i < _this.children.length; i++) {
	                        _this.getChildAt(i).y += velocity;
	                    }
	                }, 0);
	            }

	            if (this.state === _Reel2.default.STATE_NEED_FINISH) {
	                this.state = _Reel2.default.STATE_FINISHING;

	                var endParabolaSize = this.config.endParabolaSize,
	                    endParabolaTime = this.config.endParabolaTime;

	                parabolaAnimation.call(this, this, endParabolaSize, endParabolaTime).then(function () {
	                    return _this.state = _Reel2.default.STATE_STOP;
	                });
	            }
	        }
	    }]);

	    return Animations;
	}();

	exports.default = Animations;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _config = __webpack_require__(4);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PIXI = window.PIXI;

	var Controls = function (_PIXI$Container) {
	    _inherits(Controls, _PIXI$Container);

	    /**
	     * Init of buttons
	     * @param startBtnCallback
	     * @param stopBtnCallback
	     * @extends PIXI.Container
	     * @constructor
	     */
	    function Controls(startBtnCallback, stopBtnCallback) {
	        _classCallCheck(this, Controls);

	        var _this = _possibleConstructorReturn(this, (Controls.__proto__ || Object.getPrototypeOf(Controls)).call(this));

	        _this.width = _config2.default.controls.width;
	        _this.height = _config2.default.controls.height;
	        _this.position = new PIXI.Point(_config2.default.controls.x, _config2.default.controls.y);
	        _this._addStartButton(startBtnCallback);
	        _this._addStopButton(stopBtnCallback);
	        return _this;
	    }

	    /**
	     * Inits and adds a START button
	     * @param callback
	     * @private
	     */


	    _createClass(Controls, [{
	        key: '_addStartButton',
	        value: function _addStartButton(callback) {
	            var startBtn = this._createButton({
	                text: _config2.default.controls.startBtn.text,
	                textStyle: _config2.default.controls.startBtn.textStyle,
	                x: _config2.default.controls.startBtn.x,
	                y: _config2.default.controls.startBtn.y,
	                callback: callback
	            });

	            this.addChild(startBtn);
	        }

	        /**
	         * Inits and adds a STOP button
	         * @param callback
	         * @private
	         */

	    }, {
	        key: '_addStopButton',
	        value: function _addStopButton(callback) {
	            var stopButton = this._createButton({
	                text: _config2.default.controls.stopBtn.text,
	                textStyle: _config2.default.controls.stopBtn.textStyle,
	                x: _config2.default.controls.stopBtn.x,
	                y: _config2.default.controls.stopBtn.y,
	                callback: callback
	            });

	            this.addChild(stopButton);
	        }

	        /**
	         * Inits a button object with data
	         * @param conf
	         * @private
	         */

	    }, {
	        key: '_createButton',
	        value: function _createButton(conf) {
	            var btnContainer = new PIXI.Container(),
	                btn = new PIXI.Text(conf.text, conf.textStyle),
	                btnBg = new PIXI.Graphics();

	            btnBg.beginFill(_config2.default.controls.btn.color, 1);
	            btnBg.drawRoundedRect(0, 0, _config2.default.controls.btn.width, _config2.default.controls.btn.height, _config2.default.controls.btn.cornersRadius);
	            btnBg.endFill();
	            btnBg = new PIXI.Sprite(btnBg.generateCanvasTexture());

	            btn.x = (_config2.default.controls.btn.width - btn.width) / 2;
	            btn.y = (_config2.default.controls.btn.height - btn.height) / 2;

	            btnContainer.addChild(btnBg);
	            btnContainer.addChild(btn);

	            btnContainer.interactive = btnContainer.buttonMode = true;
	            btnContainer.defaultCursor = 'pointer';
	            btnContainer.click = btnContainer.touchend = conf.callback;

	            btnContainer.position = new PIXI.Point(conf.x, conf.y);

	            return btnContainer;
	        }
	    }]);

	    return Controls;
	}(PIXI.Container);

	exports.default = Controls;

/***/ }
/******/ ]);