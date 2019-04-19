import { Sprite, Graphics, Text } from "pixi.js";
import { MatchItem } from "./match-item";
import { MatchQuestion } from "./match-question";
import * as PIXI from 'pixi.js';

export class MatchItemContainer extends PIXI.Sprite {

    public box;

    constructor(public x: number, public y: number, public matchItem: MatchItem, public matchQuestion: MatchQuestion) {
        super();

        this.x = x;
        this.y = y;
        this.setup();
    }

    public setup() {
        this.setupGraphics();
    }

    public setupGraphics() {
        this.box = new PIXI.Graphics();
        if (this.matchQuestion.type === 'ImageToText') {
            this.box.opacity = 0;
            this.box.drawRect(0, 0, 300, 150);
        } else {
            this.box.beginFill(0xefefef);
            this.box.drawRect(0, 0, 300, 140);
        }
        this.box.drawRect(0, 0, 300, 140);
        this.box.endFill();

        super.addChild(this.box);
        this.matchItem['x'] = 0;
        this.matchItem['y'] = 0;
        super.addChild(this.matchItem);
    }

    public setMatchItem(matchItem: MatchItem) {
        let heightOfMatchItem = matchItem['height'];

        let newHeight = heightOfMatchItem + 60;

        if (newHeight > 140) {
            this.box.height = newHeight;
        }
        matchItem['x'] = 0;
        matchItem['y'] = 0;
        matchItem['pivot'].set(0, 0);


        this.matchItem = matchItem;
        this.box.addChild(matchItem);
        this.alpha = 1;
    }

    public setHoverState() {
        this.alpha = 0.6;
    }

    public setNonHoverState() {
        this.alpha = 1;
    }
}