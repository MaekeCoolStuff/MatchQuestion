import { Sprite, Graphics, Text } from "pixi.js";
import { MatchItem } from "./match-item";

export class MatchContainer extends Sprite {

    box: Graphics;
    matchItem: MatchItem;

    constructor(public title: string, public x: number, public y: number) {
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

        let title = new Graphics();
        title.beginFill(0x0d4374);
        title.drawRect(0, 0, 300, 40);
        title.endFill();
        

        let message = new Text(this.title, {
            fill: '0xffffff',
            fontSize: 16
        });
        message.x = 20;
        message.y = 10;

        this.addChild(this.box);
        this.addChild(title);
        this.addChild(message);

        //this.getBounds().contains()
    }

    setMatchItem(matchItem: MatchItem) {
        console.log('setMatchItem');
        let heightOfMatchItem = matchItem.height;

        let newHeight = heightOfMatchItem + 60;

        if(newHeight > 140) {
            this.box.height = newHeight;
        }
        matchItem.x = 0;
        matchItem.y = 40;
        matchItem.pivot.set(0, 0);
        matchItem.container = this;
        this.matchItem = matchItem;
        this.box.addChild(matchItem);        
    }
}