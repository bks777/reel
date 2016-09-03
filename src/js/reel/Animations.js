import Reel from "./Reel";

/**
 * TimelineLite animation
 * @param target symbol
 * @param size delta for Y
 * @param time for move in milliseconds
 * @returns {Promise}
 */
function parabolaAnimation (target, size = 0, time = 0) {
    return new Promise ((resolve, reject) => {
        new TimelineLite()
            .to (target, time/1000, {y: size})
            .to (target, time/1000, {y: 0, onComplete: resolve});

        setTimeout (reject, time+500);
    });
}

/**
 * Getter for the most bottom element on the reelArea
 * @param reel
 * @returns {PIXI.DisplayObject}
 */
function findBottomElement (reel) {
    let el = reel.getChildAt(0);

    for (let i = 1; i < reel.children.length; i++) {
        if (el.y < reel.getChildAt(i).y) {
            el = reel.getChildAt(i);
        }
    }

    return el;
}

export default class Animations{
    /**
     * Standard linear animation to bottom
     */
    static standard () {
        let maxY = this.config.height + this.config.rowHeight,
            startPosition = -this.config.rowHeight,
            velocity = this.config.speed/60;


        if (this.state === Reel.STATE_NEED_START) {
            this.state = Reel.STATE_STARTING;
            let startParabolaSize = this.config.startParabolaSize,
                startParabolaTime = this.config.startParabolaTime;

            parabolaAnimation.call (this, this, startParabolaSize, startParabolaTime)
                .then (() => {
                    if (this.state === Reel.STATE_STARTING) {
                        this.state = Reel.STATE_RUN;
                    }
                });

            return;
        }

        if (this.state === Reel.STATE_STARTING || this.state === Reel.STATE_FINISHING) {
            return;
        }

        if (this.state === Reel.STATE_RUN || this.state === Reel.STATE_STOPPING) {
            setTimeout(() => {
                  let lastEl = findBottomElement(this);
                  if (lastEl.y + velocity >= maxY) {
                      this.elements.splice(this.elements.length - 1, 1);
                      this.removeChild(lastEl);

                      let newEl = this.nextElement(); //!* if this is the last element than state will change to STATE_NEED_FINISH *!/
                      newEl.x = 0;
                      newEl.y = (lastEl.y - maxY) + startPosition;
                      this.elements.splice(0, 0, newEl);
                      this.addChildAt(newEl, 0);
                  }

                  if (this.state === Reel.STATE_NEED_FINISH){
                      velocity = maxY - lastEl.y;
                  }

                  for (let i = 0; i < this.children.length; i++) {
                      this.getChildAt(i).y += velocity;
                  }
            }, 0);
        }

        if (this.state === Reel.STATE_NEED_FINISH){
            this.state = Reel.STATE_FINISHING;

            let endParabolaSize = this.config.endParabolaSize,
                endParabolaTime = this.config.endParabolaTime;

            parabolaAnimation.call (this, this, endParabolaSize, endParabolaTime)
                .then (() => this.state = Reel.STATE_STOP);
        }
    }
}