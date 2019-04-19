import { Sprite, Graphics, Text } from "pixi.js";
import { MatchItem } from "./match-item";
import * as question from '../data/question';
import { MatchQuestion } from "./match-question";
import * as PIXI from 'pixi.js';
import '../utils/dashed-polygon';



export class MatchContainer extends PIXI.Sprite {

    public box;
    public placeholder;
    public placeholderBackground;
    public triangle;
    public matchItem: MatchItem;
    public validateTexts: PIXI.Text[] = [];

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
        switch (this.matchQuestion.type) {
            case 'TextToText':
                this.box = new PIXI.Graphics();
                this.box.beginFill(0xefefef);
                this.box.drawRect(0, 0, 300, 140);
                this.box.endFill();
                this.interactive = true;

                let title = new PIXI.Graphics();
                title.beginFill(0x0d4374);
                title.drawRect(0, 0, 300, 40);
                title.endFill();


                let message = new PIXI.Text(this.title, {
                    fill: '0xffffff',
                    fontSize: 16,
                    wordWrap: true,
                    wordWrapWidth: 200
                });
                message.x = 20;
                message.y = 10;

                super.addChild(this.box);
                super.addChild(title);
                super.addChild(message);
                break;
            case 'ImageToText':
                this.box = new PIXI.Graphics();
                this.box.beginFill(0x0d4374);
                this.box.drawPolygon([
                    0, 0,
                    300, 0,
                    300, 25,
                    250, 75,
                    300, 125,
                    300, 150,
                    0, 150
                ]);
                this.box.endFill();

                this.placeholderBackground = new PIXI.Graphics();
                this.placeholderBackground.beginFill(0xEFEFEF);
                this.placeholderBackground.drawRect(300, 0, 300, 150);
                this.placeholderBackground.endFill();
                this['addChild'](this.placeholderBackground);

                let offsetInterval = 750;
                this.placeholder = new PIXI.Graphics();
                this.placeholder.beginFill(0xEFEFEF);
                let polygons = [];
                polygons.push({x: 0, y: 0});
                polygons.push({x: 300, y: 1});
                polygons.push({x: 300, y: 148});
                polygons.push({x: 0, y: 148});
                polygons.push({x: 0, y: 130});
                polygons.push({x: -55, y: 75});
                polygons.push({x: 0, y: 20});

                this.placeholder.lineStyle(1, 0x0d4374, 0.7);
                this.placeholder.drawDashedPolygon(polygons, 0, 0, 0, 10, 5, (Date.now() % offsetInterval + 1) / offsetInterval);
                this.placeholder.endFill();
                this.placeholder.x = 300;
                this.placeholder.y = 0;
                this['addChild'](this.placeholder);

                this.triangle = new PIXI.Graphics();
                this.triangle.beginFill(0xEFEFEF);
                this.triangle.drawPolygon([
                    0, 50,
                    50, 0,
                    50, 100
                ]);
                this.triangle.endFill();
                this.triangle.x = this.box.width - this.triangle.width;
                this.triangle.y = this.box.height / 2 - this.triangle.height / 2;
                this.box.addChild(this.triangle);

                let fontSize = 24;

                if(this.title.length > 50) {
                    fontSize = 16;
                }

                let imageMessage = new PIXI.Text(this.title, {
                    fill: '0xffffff',
                    fontSize: fontSize,
                    wordWrap: true,
                    wordWrapWidth: 200
                });


                imageMessage.x = 25;
                imageMessage.y = this.box.height / 2 - imageMessage.height / 2;

                this.box.addChild(imageMessage);

                super.addChild(this.box);
                break;
            default:
                break;
        }
    }

    public setMatchItem(matchItem: MatchItem) {
        let heightOfMatchItem = matchItem['height'];

        let newHeight = heightOfMatchItem + 60;

        if (newHeight > 140) {
            this.box.height = newHeight;
        }
        matchItem['x'] = 0;
        matchItem['y'] = 40;
        matchItem['pivot'].set(0, 0);
        matchItem.container = this;
        this.matchItem = matchItem;
        if (this.matchQuestion.type === 'ImageToText') {
            matchItem['y'] = 0;
            matchItem['x'] = this.box.width;
        }
        this.box.addChild(matchItem);
        this['alpha'] = 1;
    }

    public setHoverState() {
        if (this.matchQuestion.type === 'ImageToText') {
            this.placeholderBackground['alpha'] = 0.4;
            this.triangle['alpha'] = 0.4;
        } else {
            this['alpha'] = 0.4;
        }
    }

    public setNonHoverState() {
        if (this.matchQuestion.type === 'ImageToText') {
            this.placeholderBackground['alpha'] = 1;
            this.triangle['alpha'] = 1;
        } else {
            this['alpha'] = 1;
        }
    }

    public validate() {
        this.validateTexts.forEach(t => t.destroy());
        this.validateTexts = [];
        let answers = question.question.correctAnswers;

        if (this.matchItem) {
            if (answers[this.questionIdentifier].indexOf(this.matchItem.itemIdentifier) > -1) {
                let correct = new PIXI.Text('Juist', {
                    fill: 0x16dd48
                });
                correct.x = 240;
                correct.y = 140;
                this.validateTexts.push(correct);
                super.addChild(correct);
            } else {
                let incorrect = new PIXI.Text('Onjuist', {
                    fill: 0xdd5c16
                });
                incorrect.x = 210;
                incorrect.y = 140;
                this.validateTexts.push(incorrect);
                super.addChild(incorrect);
            }

        } else {
            let incorrect = new PIXI.Text('Onjuist',
                {
                    fill: 0xdd5c16
                });
            incorrect.x = 210;
            incorrect.y = 100;
            this.validateTexts.push((incorrect));
            super.addChild(incorrect);
        }
    }
}