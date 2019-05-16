import { Sprite, Graphics, Text } from "pixi.js";
import { MatchItem } from "./match-item";
import { MatchQuestion } from "./match-question";
import * as PIXI from 'pixi.js';
import { MatchItemContainer } from "./match-item-container";

export class MultipleMatchItemContainer extends PIXI.Sprite {

    public box;
    public matchItemContainers: any[] = [];

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

        let lineAbove = new PIXI.Graphics();
        lineAbove.beginFill(0xefefef);
        lineAbove.drawRect(0, 0, 1075, 5);
        lineAbove.endFill();

        lineAbove.y = 0;
        lineAbove.x = -20;
        

        let numberOfMatchItems = 16;
        let numberOfRows = numberOfMatchItems / 4;

        this.box = new PIXI.Graphics();
        this.box.x = 20;
        this.box.y = 320;

        this.box.addChild(lineAbove);

        this['addChild'](this.box);

        let positionY = 20;
        let positionYIncrement = 90;
        
        for(let i = 0; i < numberOfRows; i++) {

            let positionX = 20;
            let positionXIncrement = 230;
            for(let j = 0; j < 4; j++) {
                let matchItem = this.matchItems[i * 4 + j];
                let matchItemContainer = new MatchItemContainer(positionX, positionY, matchItem, this.matchQuestion);
                this.matchQuestion.matchItemContainers.push(matchItemContainer);
                matchItem.container = matchItemContainer;
                this.matchItemContainers.push(matchItemContainer);
                
                this.box.addChild(matchItemContainer);

                positionX += positionXIncrement;
            }
            positionX = 20;
            positionY += positionYIncrement;
        }
    }

    public setMatchItem(matchItem: MatchItem) {        
        alert('set match Item');
    }

    public setHoverState() {
        this.alpha = 0.6;
    }

    public setNonHoverState() {
        this.alpha = 1;
    }
}