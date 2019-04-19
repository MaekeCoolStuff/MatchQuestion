import { Sprite, Graphics, Text, Container } from "pixi.js";
import { MatchItemContainer } from "./match-item-container";
import { MatchContainer } from "./match-container";
import { MatchQuestion } from "./match-question";
import * as PIXI from 'pixi.js';

export class MatchItem extends Sprite {
    public data: any;
    public dragging: boolean;
    public container: MatchItemContainer | MatchContainer;

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
            image.width = 290;
            image.height = 140;
            image.x = 5;
            image.y = 5;
            // let longestSide = image.width > image.height ? 'width' : 'height';
            // let ratio = 1;
            // if (longestSide === 'width') {
            //     ratio = image.width / image.height;
            // } else {
            //     ratio = image.height / image.width;
            // }
            //
            // image.scale.set(0.5, 0.5);

            this['addChild'](image);
        } else {
            let message = new PIXI.Text(this.text, {
                fill: '0x565656',
                fontSize: 16,
                wordWrap: true,
                wordWrapWidth: 270
            });
            message.x = 20;
            message.y = 10;
            this['addChild'](message);
        }


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
}