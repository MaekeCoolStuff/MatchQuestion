import { Sprite, Graphics, Text } from "pixi.js";
import { CollisionService } from "./collision-service";

export class MatchItem extends Sprite {
    public data: any;
    public dragging: boolean;

    constructor(public text: string) {
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

        let message = new Text(this.text, {
            fill: '0x565656',
            fontSize: 16,
            wordWrap: true,
            wordWrapWidth: 270
        });
        message.x = 20;
        message.y = 10;

        this.addChild(g);
        this.addChild(message);

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
        let position = this.data.getLocalPosition(this);
        this.pivot.set(position.x, position.y)
        //this.position.set(this.data.global.x, this.data.global.y)
    
        this.alpha = 0.5;
        this.dragging = true;
    }

    onDragEnd() {
        this.alpha = 1;
        this.dragging = false;
        var newPosition = this.data.getLocalPosition(this.parent.parent);
        console.log('newPosition.x', newPosition.x, newPosition.y)
        let hasCollided = CollisionService.checkForCollisions(newPosition.x, newPosition.y, this.text);
        this.data = null;        

        if(hasCollided) {
            this.visible = false;
        }
    }

    onDragMove() {
        if(this.dragging) {
            var newPosition = this.data.getLocalPosition(this.parent);
            this.position.x = newPosition.x;
            this.position.y = newPosition.y;
        }
    }

    makeInvisible() {
        this.visible = false;
    }
}