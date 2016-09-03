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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PIXI = window.PIXI;

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
	    }, {
	        key: 'STATE_FINISHING',
	        get: function get() {
	            return 6;
	        }
	    }, {
	        key: 'STATE_NEED_FINISH',
	        get: function get() {
	            return 7;
	        }
	    }, {
	        key: 'STATE_NEED_START',
	        get: function get() {
	            return 8;
	        }

	        /**
	         * Constructor for reelSystem
	         * @param config {Object} consists parsed JSON with images and init data
	         * @constructor
	         */

	    }]);

	    function SlotMachine(config) {
	        var _this = this;

	        _classCallCheck(this, SlotMachine);

	        this.state = false;
	        this._rootContainer = new PIXI.Container();
	        this.initRenderer(config.parent, config.width, config.height);
	        this.initTextures(config.images).then(function () {
	            _this.state = SlotMachine.STATE_DATA_LOADED;
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


	    _createClass(SlotMachine, [{
	        key: 'initRenderer',
	        value: function initRenderer() {
	            var parent = arguments.length <= 0 || arguments[0] === undefined ? 'container' : arguments[0];
	            var width = arguments.length <= 1 || arguments[1] === undefined ? 640 : arguments[1];
	            var height = arguments.length <= 2 || arguments[2] === undefined ? 480 : arguments[2];

	            var renderer = PIXI.autoDetectRenderer(width, height, { antialias: true, resolution: 1 }),
	                stage = new PIXI.Container(),
	                ticker = new PIXI.ticker.Ticker();

	            document.getElementById(parent).appendChild(renderer.view);
	            ticker.add(function () {
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
	            console.info('!!! START !!!');
	            this.startCounter = undefined;
	            this.state = SlotMachine.STATE_STOP;
	            this.initReels();
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
	        // blurWhileRun: false,
	        speed: 3500,
	        startParabolaSize: 0,
	        startParabolaTime: 0,
	        endParabolaSize: 40,
	        endParabolaTime: 80,
	        defaultTypeOfSymbol: "def",
	        symbols: {
	            1: {
	                types: ["def", "blur"],
	                name: "el_1"
	            },
	            2: {
	                types: ["def", "blur"],
	                name: "el_2"
	            },
	            3: {
	                types: ["def", "blur"],
	                name: "el_3"
	            },
	            4: {
	                types: ["def", "blur"],
	                name: "el_4"
	            },
	            5: {
	                types: ["def", "blur"],
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

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PIXI = window.PIXI;

	var Reel = function (_PIXI$Container) {
	    _inherits(Reel, _PIXI$Container);

	    _createClass(Reel, null, [{
	        key: 'STATE_STOP',
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
	            // this.addEventListener("tick", this.reelTick.bind(this));
	        }
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
	    }, {
	        key: 'createRandomElement',
	        value: function createRandomElement(type) {
	            var imgNum = this.getAllowedRandomSymbol();
	            return this.createElement(imgNum, type);
	        }
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

	            var el = new _Element2.default(num, type, this.config.symbols[num], this.config.symbolTypes, this.config.textures[this.config.symbols[num].name]);

	            el.width = this.config.width;
	            el.height = this.config.rowHeight;

	            return el;
	        }
	    }, {
	        key: 'reelTick',
	        value: function reelTick(event) {
	            this.mainLoop(event);

	            if (this.state === Reel.STATE_RUN && this.needBlur) {

	                for (var i = 0; i < this.elements.length; i++) {
	                    this.elements[i].setSymbolType("blur");
	                }

	                this.needBlur = false;
	                this.needDefaultSymbols = true;
	            }

	            if (this.needDefaultSymbols && (this.state === Reel.STATE_NEED_FINISH || this.state === Reel.STATE_FINISHING || this.state === Reel.STATE_STOP)) {
	                for (var _i = 0; _i < this.elements.length; _i++) {
	                    this.elements[_i].setSymbolType("def");
	                }
	                this.needDefaultSymbols = false;
	            }
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

	    function Element(symbolNumber, symbolType, configOfSymbol, configOfSymbolTypes, texture) {
	        _classCallCheck(this, Element);

	        var _this = _possibleConstructorReturn(this, (Element.__proto__ || Object.getPrototypeOf(Element)).call(this));

	        _this.symbolNumber = symbolNumber;
	        _this.symbolType = symbolType;
	        _this.imageAlias = symbolType + "_" + symbolNumber;
	        _this.configOfSymbolTypes = configOfSymbolTypes;
	        _this.configOfSymbol = configOfSymbol;
	        _this.texture = texture;

	        _this._addContent();
	        return _this;
	    }

	    _createClass(Element, [{
	        key: "_addContent",
	        value: function _addContent() {
	            this.content = new PIXI.Sprite(this.texture);
	            this.applyContentConfig();
	            this.addChild(this.content);
	            this.setContentToCenter();
	        }
	    }, {
	        key: "applyContentConfig",
	        value: function applyContentConfig() {}
	    }, {
	        key: "setContentToCenter",
	        value: function setContentToCenter() {}
	    }, {
	        key: "setSpriteSheet",
	        value: function setSpriteSheet(spriteSheet) {}
	    }, {
	        key: "getSymbolName",
	        value: function getSymbolName() {
	            return this.configOfSymbol.name;
	        }
	    }, {
	        key: "getContent",
	        value: function getContent() {
	            return this.content;
	        }
	    }, {
	        key: "setSymbol",
	        value: function setSymbol(symbolNumber, configOfSymbol) {
	            var symbolType = arguments.length <= 2 || arguments[2] === undefined ? "def" : arguments[2];

	            if (symbolNumber !== undefined && symbolNumber !== this.symbolNumber) {
	                this.imageAlias = symbolType + "_" + symbolNumber;
	                this.symbolNumber = symbolNumber;
	                this.configOfSymbol = configOfSymbol;
	            }
	            this.setSymbolType(symbolType);
	        }
	    }, {
	        key: "setSymbolType",
	        value: function setSymbolType(symbolType) {
	            this.content.stop();

	            this.symbolType = symbolType;
	            this.imageAlias = symbolType + "_" + this.symbolNumber;
	            this.content.gotoAndPlay(this.imageAlias);

	            this.applyContentConfig();

	            this.setContentToCenter();
	        }

	        // set _width(width) {
	        //     this.width = width;
	        //     this.setContentToCenter();
	        // }
	        //
	        // get _width () {
	        //     return this.width;
	        // }
	        //
	        // set _height(height) {
	        //     this.height = height;
	        //     this.setContentToCenter();
	        // }
	        //
	        // get _height () {
	        //     return this.height;
	        // }

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

	function parabolaAnimation(target) {
	    var size = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	    var time = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];


	    return new Promise(function (resolve, reject) {
	        createjs.Tween.get(target, { override: true }).to({ y: size }, time).to({ y: 0 }, time).call(resolve);

	        setTimeout(reject, time + 500);
	    });
	}

	function findBottomElement(reel) {
	    var el = reel.getChildAt(0);

	    for (var i = 1; i < reel.numChildren; i++) {
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
	        value: function standard(event) {
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
	                var lastEl = findBottomElement(this);

	                if (lastEl.y + velocity >= maxY) {
	                    this.elements.splice(this.elements.length - 1, 1);
	                    this.removeChild(lastEl);

	                    var newEl = this.nextElement(); //!* if this is the last element than state will change to STATE_NEED_FINISH *!/
	                    newEl.x = 0;
	                    newEl.y = lastEl.y - maxY + startPosition;
	                    this.elements.splice(0, 0, newEl);
	                    this.addChildAt(newEl, 0);
	                }

	                if (this.state === _Reel2.default.STATE_NEED_FINISH) {
	                    velocity = maxY - lastEl.y;
	                }

	                for (var i = 0; i < this.numChildren; i++) {
	                    this.getChildAt(i).y += velocity;
	                }

	                setTimeout(function () {
	                    var pt = _this.localToGlobal(0, 0);
	                    _this.stage.requestUpdate(new createjs.Rectangle(pt.x, pt.y, _this.config.width, _this.config.height));
	                    //this.stage.requestUpdate();
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

/***/ }
/******/ ]);