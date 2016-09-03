const PIXI = window.PIXI;
import config from './config';
export default class Controls extends PIXI.Container{
    constructor(startBtnCallback, stopBtnCallback, aboutBtnCallbak){
        super();

        this.width = config.controls.width;
        this.height = config.controls.height;
        this.position = new PIXI.Point(config.controls.x, config.controls.y);
        this._addStartButton(startBtnCallback);
        this._addStopButton(stopBtnCallback);
        this._addAboutButton(aboutBtnCallbak);
    }

    _addStartButton(callback) {
        let btnContainer = new PIXI.Container(),
            btnTxt = new PIXI.Text(
                config.controls.startBtn.text,
                config.controls.startBtn.textStyle
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

        btnTxt.x = (config.controls.btn.width - btnTxt.width) / 2;
        btnTxt.y = (config.controls.btn.height - btnTxt.height) / 2;

        btnContainer.addChild(btnBg);
        btnContainer.addChild(btnTxt);

        btnContainer.interactive = btnContainer.buttonMode = true;
        btnContainer.defaultCursor = 'pointer';
        btnContainer.click = callback;

        btnContainer.position = new PIXI.Point(config.controls.startBtn.x, config.controls.startBtn.y)

        this.addChild(btnContainer);
    }

    _addStopButton(callback) {
        let btnContainer = new PIXI.Container(),
            btnTxt = new PIXI.Text(
                config.controls.stopBtn.text,
                config.controls.stopBtn.textStyle
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

        btnTxt.x = (config.controls.btn.width - btnTxt.width) / 2;
        btnTxt.y = (config.controls.btn.height - btnTxt.height) / 2;

        btnContainer.addChild(btnBg);
        btnContainer.addChild(btnTxt);

        btnContainer.interactive = btnContainer.buttonMode = true;
        btnContainer.defaultCursor = 'pointer';
        btnContainer.click = callback;

        btnContainer.position = new PIXI.Point(config.controls.stopBtn.x, config.controls.stopBtn.y)

        this.addChild(btnContainer);
    }

    _addAboutButton(callback) {
        let btnContainer = new PIXI.Container(),
            btnTxt = new PIXI.Text(
                config.controls.aboutBtn.text,
                config.controls.aboutBtn.textStyle
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

        btnTxt.x = (config.controls.btn.width - btnTxt.width) / 2;
        btnTxt.y = (config.controls.btn.height - btnTxt.height) / 2;

        btnContainer.addChild(btnBg);
        btnContainer.addChild(btnTxt);

        btnContainer.interactive = btnContainer.buttonMode = true;
        btnContainer.defaultCursor = 'pointer';
        btnContainer.click = callback;

        btnContainer.position = new PIXI.Point(config.controls.aboutBtn.x, config.controls.aboutBtn.y)

        this.addChild(btnContainer);
    }
}