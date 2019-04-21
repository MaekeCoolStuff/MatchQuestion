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
            let polygons = [];
            polygons.push({x: 0, y: 0});
            polygons.push({x: 300, y: 1});
            polygons.push({x: 300, y: 148});
            polygons.push({x: 0, y: 148});
            polygons.push({x: 0, y: 125});
            polygons.push({x: -50, y: 75});
            polygons.push({x: 0, y: 25});

            this.box.lineStyle(1, 0x0d4374, 0.7);
            this.box.drawDashedPolygon(polygons, 0, 0, 0, 10, 5);
            this.box.endFill();
        } else {
            this.box.beginFill(0xefefef);
            //this.box.drawRect(0, 0, 300, 140);
            let polygons = [];
            polygons.push({x: 0, y: 0});
            polygons.push({x: 300, y: 0});
            polygons.push({x: 300, y: 140});
            polygons.push({x: 0, y: 140});

            this.box.lineStyle(1, 0x0d4374, 0.7);
            this.box.drawDashedPolygon(polygons, 0, 0, 0, 10, 5);
            this.box.endFill();
        }
        //this.box.drawRect(0, 0, 300, 140);
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
        matchItem.container = this;
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