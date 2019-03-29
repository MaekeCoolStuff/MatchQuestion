import { Sprite, Graphics, Text } from "pixi.js";
import { MatchItem } from "./match-item";
import * as question from '../data/question';
import { MatchQuestion } from "./match-question";

export class MatchContainer extends Sprite {

    box: Graphics;
    matchItem: MatchItem;

    constructor(public title: string, public questionIdentifier: string, public x: number, public y: number, public matchQuestion: MatchQuestion) {
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
        switch(this.matchQuestion.type) {
            case 'TextToText':
                this.box = new Graphics();
                this.box.beginFill(0xefefef);
                this.box.drawRect(0, 0, 300, 140);
                this.box.endFill();
                this.interactive = true;
        
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
            break;
            case 'ImageToText':
                this.box = new Graphics();
                this.box.beginFill(0x0d4374);
                this.box.drawRect(0, 0, 300, 300);
                this.box.endFill();

                        
                let imageMessage = new Text(this.title, {
                    fill: '0xffffff',
                    fontSize: 32
                });
                imageMessage.x = this.box.width / 2 - imageMessage.width / 2;
                imageMessage.y = this.box.height / 2 - imageMessage.height / 2;
                
                this.box.addChild(imageMessage);

                this.addChild(this.box);
            break;
        }
    }
    
    onMouseOver(event) {
        this.alpha = 0.5;
    }

    onMouseOut(event) {
        this.alpha = 1;
    }

    setMatchItem(matchItem: MatchItem) {
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
        this.alpha = 1;
    }

    setHoverState() {
        this.alpha = 0.6;
    }

    setNonHoverState() {
        this.alpha = 1;
    }

    validate() {
        let answers = question.question.correctAnswers;

        if(this.matchItem) {
            if(answers[this.questionIdentifier].indexOf(this.matchItem.itemIdentifier) > -1) {
                let correct = new Text('Juist', {
                    fill: 0x16dd48
                });
                correct.x = 240;
                correct.y = 140;
                this.addChild(correct);
            } else {
                let incorrect = new Text('Onjuist', {
                    fill: 0xdd5c16
                });
                incorrect.x = 210;
                incorrect.y = 140;
                this.addChild(incorrect);
            }
            
        } else {
            let incorrect = new Text('Onjuist',
            {
                fill: 0xdd5c16
            });
            incorrect.x = 210;
            incorrect.y = 100;
            this.addChild(incorrect);
        }
    }
}