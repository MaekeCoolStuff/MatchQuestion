import { Sprite, Graphics, Text } from "pixi.js";
import { MatchItem } from "./match-item";
import * as question from '../data/question';
import { MatchQuestion } from "./match-question";
import * as PIXI from 'pixi.js';
import '../utils/dashed-polygon';
import { MatchContainer } from "./match-container";

export class MultipleMatchContainer extends PIXI.Sprite {
    public box;
    public placeholder;
    public placeholderBackground;
    public triangle;
    public matchItem: MatchItem;

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
        let boxWidth = 220;
        this.box = new PIXI.Graphics();
        this.box.beginFill(0xefefef);
        this.box.drawRect(0, 0, boxWidth, 140);
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

        let matchContainer = new MatchContainer(this.title, this.questionIdentifier, this.x, this.y, this.matchQuestion);
        matchContainer.interactive = true;
        this.box.addChild(matchContainer);

        super.addChild(this.box);
        super.addChild(title);
        super.addChild(message);
    }
}