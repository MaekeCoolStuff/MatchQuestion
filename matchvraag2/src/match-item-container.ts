import { Sprite, Graphics, Text } from "pixi.js";
import { MatchItem } from "./match-item";

export class MatchItemContainer extends Sprite {

    box: Graphics;
    
    constructor(public x: number, public y: number, public matchItem: MatchItem) {
        super();

        this.x = x;
        this.y = y;
        this.setup();
    }

    setup() {
        this.setupGraphics();
    }

    draw() {        
    }

    setupGraphics() {
        this.box = new Graphics();
        this.box.beginFill(0xefefef);
        this.box.drawRect(0, 0, 300, 140);
        this.box.endFill();

        this.addChild(this.box);
        this.matchItem.x = 0;
        this.matchItem.y = 0;
        this.addChild(this.matchItem);
    }
}