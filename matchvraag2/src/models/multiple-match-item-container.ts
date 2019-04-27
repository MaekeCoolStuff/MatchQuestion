import { Sprite, Graphics, Text } from "pixi.js";
import { MatchItem } from "./match-item";
import { MatchQuestion } from "./match-question";
import * as PIXI from 'pixi.js';

export class MultipleMatchItemContainer extends PIXI.Sprite {

    public box;

    constructor(public x: number, public y: number, public matchQuestion: MatchQuestion, public matchItems: MatchItem[]) {
        super();

        this.x = x;
        this.y = y;
        this.setup();
    }

    public setup() {
        this.setupGraphics();
    }

    public setupGraphics() {

        let numberOfMatchItems = 16;
        let numberOfRows = numberOfMatchItems / 4;

        this.box = new PIXI.Graphics();
        this.box.x = 20;
        this.box.y = 300;

        this['addChild'](this.box);

        let positionY = 20;
        let positionYIncrement = 90;
        
        for(let i = 0; i < numberOfRows; i++) {

            let positionX = 20;
            let positionXIncrement = 230;
            for(let j = 0; j < 4; j++) {
                let matchItemContainer = new PIXI.Graphics();
                // matchItemContainer.beginFill(0xEFEFEF);
                // matchItemContainer.drawRect(0, 0, 220, 70);
                
                let polygons = [];
                polygons.push({x: 0, y: 0});
                polygons.push({x: 220, y: 0});
                polygons.push({x: 220, y: 70});
                polygons.push({x: 0, y: 70});
    
                matchItemContainer.lineStyle(1, 0x0d4374, 0.7);
                matchItemContainer['drawDashedPolygon'](polygons, 0, 0, 0, 10, 5);
                matchItemContainer.endFill();

                matchItemContainer.addChild(this.matchItems[i * 4 + j]);
                matchItemContainer.x = positionX;
                matchItemContainer.y = positionY;
                this.box.addChild(matchItemContainer);
                positionX += positionXIncrement;
            }
            positionX = 20;
            positionY += positionYIncrement;
            console.log('Y', positionY);
        }
    }

    public setMatchItem(matchItem: MatchItem) {        

    }

    public setHoverState() {
        this.alpha = 0.6;
    }

    public setNonHoverState() {
        this.alpha = 1;
    }
}