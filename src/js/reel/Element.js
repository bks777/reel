const PIXI = window.PIXI;

export default class Element extends PIXI.Container{
    constructor(symbolNumber, symbolType, configOfSymbol, configOfSymbolTypes, texture){
        super();
        this.symbolNumber = symbolNumber;
        this.symbolType = symbolType;
        this.imageAlias = symbolType+"_"+symbolNumber;
        this.configOfSymbolTypes = configOfSymbolTypes;
        this.configOfSymbol = configOfSymbol;
        this.texture = texture;

        this._addContent();
    }

    _addContent () {
        this.content = new PIXI.Sprite (this.texture);
        this.applyContentConfig();
        this.addChild(this.content);
        this.setContentToCenter();
    }

    applyContentConfig () {

    }

    setContentToCenter () {
    }
    setSpriteSheet (spriteSheet) {

    }
    getSymbolName () {
        return this.configOfSymbol.name;
    }

    getContent () {
        return this.content;
    }

    setSymbol (symbolNumber, configOfSymbol, symbolType = "def") {
        if (symbolNumber !== undefined && symbolNumber !== this.symbolNumber) {
            this.imageAlias = `${symbolType}_${symbolNumber}`;
            this.symbolNumber = symbolNumber;
            this.configOfSymbol = configOfSymbol;
        }
        this.setSymbolType(symbolType);
    }

    setSymbolType (symbolType) {
        this.content.stop();

        this.symbolType = symbolType;
        this.imageAlias = `${symbolType}_${this.symbolNumber}`;
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
}