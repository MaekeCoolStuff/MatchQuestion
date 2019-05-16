import { Sprite, Graphics, Text } from "pixi.js";
import { MatchItem } from "./match-item";
import * as question from '../data/question';
import { MatchQuestion } from "./match-question";
import * as PIXI from 'pixi.js';
import '../utils/dashed-polygon';
import { MatchContainer } from "./match-container";
import { MultipleMatchSubContainer } from "./multiple-match-sub-container";

export class MultipleMatchContainer extends PIXI.Sprite {
    public box;
    public placeholder;
    public placeholderBackground;
    public triangle;
    public matchItem: MatchItem;
    public subContainerYPos: number = 0;
    public boxHeight: number = 140;
    public matchSubContainers: MultipleMatchSubContainer[] = [];

    constructor(public title: string, public questionIdentifier: string, public x: number, public y: number, public matchQuestion: MatchQuestion) {
        super();

        this.x = x;
        this.y = y;
        this.setup();
    }

    public setup() {
        this.setupGraphics();
    }

    public setupGraphics() {
        let boxWidth = 230;
        this.box = new PIXI.Graphics();
        this.box.beginFill(0xefefef);
        this.box.drawRect(0, 0, boxWidth, this.boxHeight);
        this.box.endFill();
        this.interactive = true;

        let title = new PIXI.Graphics();
        title.beginFill(0x0d4374);
        title.drawRect(0, 0, boxWidth, 40);
        title.endFill();


        let message = new PIXI.Text(this.title, {
            fill: '0xffffff',
            fontSize: 16,
            wordWrap: true,
            wordWrapWidth: 200
        });
        message.x = 20;
        message.y = 10;

        // let matchContainer = new MatchContainer(this.title, this.questionIdentifier, this.x, this.y, this.matchQuestion);
        // matchContainer.interactive = true;
        // this.box.addChild(matchContainer);

        let subContainer = new MultipleMatchSubContainer(0, 0, this, this.matchQuestion);
        this.matchSubContainers.push(subContainer);
        this.matchQuestion.matchSubContainers.push(subContainer);


        super.addChild(this.box);
        super.addChild(title);
        super.addChild(message);
        this.box.addChild(subContainer);
    }

    public addSubContainer() {
        if(this.matchSubContainers.length === 4) {
            return;
        }
        this.subContainerYPos += 80;
        this.boxHeight += 80;
        let subContainer2 = new MultipleMatchSubContainer(0, this.subContainerYPos, this, this.matchQuestion);
        this.matchQuestion.matchSubContainers.push(subContainer2);
        this.matchSubContainers.push(subContainer2);
        this.box.addChild(subContainer2);
        
        this.box.clear();
        this.box.beginFill(0xefefef);
        this.box.drawRect(0, 0, 230, this.boxHeight);
        this.box.endFill();

         let sortedMatchContainers = this.matchQuestion.multipleMatchContainers.sort((c1, c2) => {
            if(c1.matchSubContainers.length > c2.matchSubContainers.length) {
                return -1;
            } else if(c1.matchSubContainers.length === c2.matchSubContainers.length) {
                return 0;
            } else {
                return 1;
            }
        });

        if(sortedMatchContainers[0].matchSubContainers.length === 3) {
            this.matchQuestion.multipleMatchItemContainer.y = 140;
        }

        if(sortedMatchContainers[0].matchSubContainers.length === 4) {
            this.matchQuestion.multipleMatchItemContainer.y = 160;
        }
    }
}