import { Sprite, Graphics, Text, Container } from "pixi.js";
import { MatchItemContainer } from "./match-item-container";
import { MatchContainer } from "./match-container";
import { MatchQuestion } from "./match-question";
import * as PIXI from 'pixi.js';
import { MultipleMatchItemContainer } from "./multiple-match-item-container";
import { MultipleMatchSubContainer } from "./multiple-match-sub-container";

export class MatchItem extends Sprite {
    public data: any;
    public dragging: boolean;
    public container: MatchItemContainer | MatchContainer | MultipleMatchSubContainer;
    public rightPosition: Graphics;
    public rightPositionNumber: number;

    constructor(public text: string, public itemIdentifier: string, public stage, public matchQuestion: MatchQuestion) {
        super();
        this.setup();
    }

    public setup() {
        this.setupGraphics();
    }

    public setupGraphics() {
        let g = new PIXI.Graphics();
        if (this.matchQuestion.type === 'ImageToText') {
            g.beginFill(0x397cc6);
            g.drawRect(0, 0, 300, 150);
        } else if (this.matchQuestion.question.variant === 'ManyTooMany') {
            g.beginFill(0x397cc6);
            g.drawRect(0, 0, 220, 70);
        } else {
            g.beginFill(0xefefef);
            g.drawRect(0, 0, 300, 140);
        }
        g.endFill();

        super.addChild(g);

        if (this.matchQuestion.type === 'ImageToText') {
            let triangle = new PIXI.Graphics();
            triangle.beginFill(0x397cc6);
            triangle.drawPolygon([
                0, 50,
                50, 0,
                50, 100
            ]);
            triangle.endFill();
            triangle.x = -50;
            triangle.y = g.height / 2 - triangle.height / 2;
            g.addChild(triangle);
            let image = new PIXI.Sprite(PIXI.loaders.shared.resources[this.text].texture);
            let change = 0;
            
            //image.height = 140;
            image.x = 5;
            image.y = 5;
            let longestSide = image.width > image.height ? 'width' : 'height';
            if(longestSide === 'width') {
                change = image.width / 290;
                let newHeight = image.height / change;
                image.height = newHeight;
                let extraHeight = g.height - image.height;
                image.y = extraHeight / 2;
            } else {
                image.width = 290;
            }

            image.width = 290;

            this['addChild'](image);
            let magnifier = new PIXI.Sprite(PIXI.loaders.shared.resources['src/images/vergrootglas.png'].texture);
            magnifier.width = 25;
            magnifier.height = 25;
            magnifier.y = 8;
            magnifier.x = 265;
            magnifier.interactive = true;
            magnifier.on('mouseover', () => {
                magnifier.alpha = 0.4
            });
            magnifier.on('mouseout', () => {
                magnifier.alpha = 1
            });
            magnifier.on('click', () => {
                this.matchQuestion.showFullSizeImage(this.text);
            })
            this['addChild'](magnifier);
        } else {
            let textColor = '0x565656';
            if(this.matchQuestion.question.variant === 'ManyTooMany') {
                textColor = '0xffffff';
            }
            let message = new PIXI.Text(this.text, {
                fill: textColor,
                fontSize: 16,
                wordWrap: true,
                wordWrapWidth: 270
            });
            message.x = 20;
            message.y = 10;

            this['addChild'](message);
        }

        this.rightPosition = new Graphics();
        this.rightPosition.beginFill(0xffd356);
        this.rightPosition.drawRect(0, 0, 120, 30);
        this.rightPosition.endFill();

        let n = 1;

        for (let key in this.matchQuestion.question.correctAnswers) {
            if (this.matchQuestion.question.correctAnswers.hasOwnProperty(key)) {
                if(this.matchQuestion.question.correctAnswers[key].indexOf(this.itemIdentifier) > -1) {
                    break;
                } else {
                    n++;
                }
            }
        }

        let rightPositionText = new PIXI.Text('Juiste positie: ' + n, {
            fontSize:14,
            fontVariant: 'bold'
        });
        rightPositionText.x = (this.rightPosition.width - rightPositionText.width) / 2;
        rightPositionText.y = (this.rightPosition.height - rightPositionText.height) / 2;
        this.rightPosition.addChild(rightPositionText);
        if(this.matchQuestion.type === 'ImageToText') {
            this.rightPosition.x = g.width - this.rightPosition.width - 60;
        } else {
            this.rightPosition.x = g.width - this.rightPosition.width - 10;
        }        
        this.rightPosition.y = g.height - this.rightPosition.height - 10;
        this.rightPosition.alpha = 0;

        this['addChild'](this.rightPosition);

        this['interactive'] = true;
        this['buttonMode'] = true;

        super.on('mousedown', this.onDragStart)
            .on('touchstart', this.onDragStart)
            .on('mouseup', this.onDragEnd)
            .on('mouseupoutside', this.onDragEnd)
            .on('touchend', this.onDragEnd)
            .on('touchendoutside', this.onDragEnd)
            .on('mousemove', this.onDragMove)
            .on('touchmove', this.onDragMove);
    }

    public onDragStart(event) {
        if (this.matchQuestion.questionLocked) {
            return;
        }
        this.data = event.data;
        this.stage.addChild(this);
        let position = this.data.getLocalPosition(this);
        this['pivot'].set(position.x, position.y);
        this['position'].set(this.data.global.x, this.data.global.y);

        this['alpha'] = 0.75;
        this.dragging = true;
    }

    public onDragEnd() {
        if (this.matchQuestion.questionLocked) {
            return;
        }
        this['alpha'] = 1;
        this.dragging = false;
        // var newPosition = {this.data.getLocalPosition(this.parent.parent);}
        let newPosition = {
            x: this.data.global.x,
            y: this.data.global.y
        };

        let hasCollisions = this.matchQuestion.checkForContainerCollisions(newPosition.x, newPosition.y, this, true);
        this.data = null;
        if (!hasCollisions) {
            this.container.setMatchItem(this);
        }
    }

    public onDragMove() {
        if (this.dragging) {
            let newPosition = this.data.getLocalPosition(this['parent']);
            this['position'].x = newPosition.x;
            this['position'].y = newPosition.y;
            this.matchQuestion.checkForContainerCollisions(newPosition.x, newPosition.y, this, false);
        }
    }

    public validate() {
        let correctAnswers = this.matchQuestion.question.correctAnswers;
        if(this.container && this.container['questionIdentifier']) {
            if(correctAnswers[this.container['questionIdentifier']].indexOf(this.itemIdentifier) > -1) {

            } else {
                this.rightPosition.alpha = 1;
            }
        } else {
            this.rightPosition.alpha = 1;
        }
    }
}