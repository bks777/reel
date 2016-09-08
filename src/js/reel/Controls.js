const PIXI = window.PIXI;
import config from './config';

export default class Controls extends PIXI.Container{
    /**
     * Init of buttons
     * @param startBtnCallback
     * @param stopBtnCallback
     * @extends PIXI.Container
     * @constructor
     */
    constructor(startBtnCallback, stopBtnCallback){
        super();

        this.width = config.controls.width;
        this.height = config.controls.height;
        this.position = new PIXI.Point(config.controls.x, config.controls.y);
        this._addStartButton(startBtnCallback);
        this._addStopButton(stopBtnCallback);
    }

    /**
     * Inits and adds a START button
     * @param callback
     * @private
     */
    _addStartButton(callback) {
        let startBtn = this._createButton({
            text:  config.controls.startBtn.text,
            textStyle: config.controls.startBtn.textStyle,
            x: config.controls.startBtn.x,
            y: config.controls.startBtn.y,
            callback
        });

        this.addChild(startBtn);
    }

    /**
     * Inits and adds a STOP button
     * @param callback
     * @private
     */
    _addStopButton(callback) {
        let stopButton = this._createButton({
            text:  config.controls.stopBtn.text,
            textStyle: config.controls.stopBtn.textStyle,
            x: config.controls.stopBtn.x,
            y: config.controls.stopBtn.y,
            callback
        });

        this.addChild(stopButton);
    }

    /**
     * Inits a button object with data
     * @param conf
     * @private
     */
    _createButton(conf){
        let btnContainer = new PIXI.Container(),
            btn = new PIXI.Text(
                conf.text,
                conf.textStyle
            ),
            btnBg = new PIXI.Graphics();

        btnBg.beginFill(config.controls.btn.color, 1);
        btnBg.drawRoundedRect(
            0,
            0,
            config.controls.btn.width,
            config.controls.btn.height,
            config.controls.btn.cornersRadius
        );
        btnBg.endFill();
        btnBg = new PIXI.Sprite(btnBg.generateCanvasTexture());

        btn.x = (config.controls.btn.width - btn.width) / 2;
        btn.y = (config.controls.btn.height - btn.height) / 2;

        btnContainer.addChild(btnBg);
        btnContainer.addChild(btn);

        btnContainer.interactive = btnContainer.buttonMode = true;
        btnContainer.defaultCursor = 'pointer';
        btnContainer.click = btnContainer.touchend = conf.callback;

        btnContainer.position = new PIXI.Point(conf.x, conf.y);

        return btnContainer;
    }
}