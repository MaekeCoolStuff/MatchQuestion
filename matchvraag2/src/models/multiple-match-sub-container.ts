import { Sprite, Graphics, Text } from "pixi.js";
import { MatchItem } from "./match-item";
import * as question from '../data/question';
import { MatchQuestion } from "./match-question";
import * as PIXI from 'pixi.js';
import '../utils/dashed-polygon';



export class MultipleMatchSubContainer extends PIXI.Sprite {

    public box;
    public placeholder;
    public placeholderBackground;
    public triangle;
    public matchItem: MatchItem;

    constructor(public x: number, public y: number, public multipleMatchContainer, public matchQuestion: MatchQuestion) {
        super();

        this.x = x;
        this.y = y;
        this.setup();
    }

    public setup() {
        this.setupGraphics();
    }

    public setupGraphics() {
        this.box = new Graphics();
        let polygons = [];
        polygons.push({x: 0, y: 0});
        polygons.push({x: 220, y: 0});
        polygons.push({x: 220, y: 70});
        polygons.push({x: 0, y: 70});

        this.box.lineStyle(1, 0x0d4374, 0.7);
        this.box['drawDashedPolygon'](polygons, 0, 0, 0, 10, 5);
        this.box.endFill();
        this.box.x = 5;
        this.box.y = 50;

        super.addChild(this.box);
    }

    public setHoverState() {
        this['alpha'] = 0.4;
    }

    public setNonHoverState() {
        this['alpha'] = 1;        
    }

    public validate() {
        let answers = this.matchQuestion.question.correctAnswers;
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
        if(this.matchItem) {
            for(let mic = 0; mic < this.matchQuestion.matchItemContainers.length; mic++) {
                let matchItemContainer = this.matchQuestion.matchItemContainers[mic];
                if(!matchItemContainer.matchItem) {
                    matchItemContainer.setMatchItem(this.matchItem);
                    break;
                }
            }
        }
        if (this.matchQuestion.question.variant !== 'ManyTooMany') {
            matchItem.container = null;
        }
        
      //  matchItem.container = this;
        this.matchItem = matchItem;
        if (this.matchQuestion.type === 'ImageToText') {
            matchItem['y'] = 0;
            matchItem['x'] = this.box.width;
        }
        this.box.addChild(matchItem);
        this['alpha'] = 1;
        this.multipleMatchContainer.addSubContainer();
    }
}