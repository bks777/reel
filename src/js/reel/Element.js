const PIXI = window.PIXI;

export default class Element extends PIXI.Container{
    /**
     * Init of single symbol
     * @param texture
     * @constructor
     */
    constructor(texture){
        super();
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
}