import { Sprite, Graphics, Text, Container } from "pixi.js";
import { MatchItemContainer } from "./match-item-container";
import { MatchContainer } from "./match-container";
import { MatchQuestion } from "./match-question";
import * as PIXI from 'pixi.js';

export class MatchItem extends Sprite {
    public data: any;
    public dragging: boolean;
    public container: MatchItemContainer | MatchContainer;

    constructor(public text: string, public itemIdentifier: string, public stage: Container, public matchQuestion: MatchQuestion) {
        super();
        this.setup();
    }

    setup() {
        this.setupGraphics();
    }

    draw() {        
    }

    setupGraphics() {
        let g = new Graphics();
        g.beginFill(0xefefef);
        g.drawRect(0, 0, 300, 140);
        g.endFill();
        
        console.log(this.matchQuestion.type);  
        this.addChild(g);
        
        if(this.matchQuestion.type === 'ImageToText') {
            console.log(PIXI['Loader'].shared.resources);
            let image = new Sprite(PIXI['Loader'].shared.resources[this.text].texture);
            let longestSide = image.width > image.height ? 'width' : 'height';
            let ratio = 1;
            if(longestSide === 'width') {
                ratio = image.width / image.height;
            } else {
                ratio = image.height / image.width;
            }

            console.log('image', image);
            this.addChild(image);
        } else {
            let message = new Text(this.text, {
                fill: '0x565656',
                fontSize: 16,
                wordWrap: true,
                wordWrapWidth: 270
            });
            message.x = 20;
            message.y = 10;
            this.addChild(message);
        }
        

        this.interactive = true;
        this.buttonMode = true;

        this.on('mousedown', this.onDragStart)
            .on('touchstart', this.onDragStart)
            .on('mouseup', this.onDragEnd)
            .on('mouseupoutside', this.onDragEnd)
            .on('touchend', this.onDragEnd)
            .on('touchendoutside', this.onDragEnd)
            .on('mousemove', this.onDragMove)
            .on('touchmove', this.onDragMove);
    }

    onDragStart(event) {
        this.data = event.data;
        this.stage.addChild(this);
        let position = this.data.getLocalPosition(this);
        this.pivot.set(position.x, position.y)
        this.position.set(this.data.global.x, this.data.global.y)

        this.alpha = 0.75;
        this.dragging = true;
    }

    onDragEnd() {
        this.alpha = 1;
        this.dragging = false;
        //var newPosition = {this.data.getLocalPosition(this.parent.parent);}
        let newPosition = {
            x: this.data.global.x,
            y: this.data.global.y
        };

        this.matchQuestion.checkForContainerCollisions(newPosition.x, newPosition.y, this, true);
        this.data = null;
    }

    onDragMove() {
        if(this.dragging) {
            var newPosition = this.data.getLocalPosition(this.parent);
            this.position.x = newPosition.x;
            this.position.y = newPosition.y;
            this.matchQuestion.checkForContainerCollisions(newPosition.x, newPosition.y, this, false);
        }       
    }
}