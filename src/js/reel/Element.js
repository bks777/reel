const PIXI = window.PIXI;

export default class Element extends PIXI.Container{
    /**
     * Init of single symbol
     * @param symbolNumber
     * @param symbolType
     * @param configOfSymbol
     * @param texture
     * @constructor
     */
    constructor(symbolNumber, symbolType, configOfSymbol, texture){
        super();
        this.symbolNumber = symbolNumber;
        this.imageAlias = symbolType+"_"+symbolNumber;
        this.configOfSymbol = configOfSymbol;
        this.texture = texture;

        this._addContent();
    }

    /**
     * adding of sprite to container
     * @private
     */
    _addContent () {
        this.content = new PIXI.Sprite (this.texture);
        this.addChild(this.content);
    }

    /**
     * Changes texture
     * @param spriteSheet
     */
    setSpriteSheet (spriteSheet) {
        this.content.texture = spriteSheet;
    }

    /**
     * Getter for the symbol name
     * @returns {*}
     */
    getSymbolName () {
        return this.configOfSymbol.name;
    }

    /**
     * Getter for the content
     * @returns {PIXI.Sprite}
     */
    getContent () {
        return this.content;
    }
}