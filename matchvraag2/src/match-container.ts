import { Sprite, Graphics, Text } from "pixi.js";

export class MatchContainer extends Sprite {

    box: Graphics;

    constructor(public title: string, public x: number, public y: number) {
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
        this.box = new Graphics();
        this.box.beginFill(0xefefef);
        this.box.drawRect(0, 0, 300, 140);
        this.box.endFill();

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

        //this.getBounds().contains()
    }

    setText(title) {        
        let message = new Text(title, {
            fill: '0x565656',
            fontSize: 16,
            wordWrap: true,
            wordWrapWidth: 270
        });
        message.x = 20;
        message.y = 50;

        let heightOfMessage = message.height;

        let newHeight = heightOfMessage + 60;

        if(newHeight > 140) {
            this.box.height = newHeight;
        }

        this.addChild(message);        
    }
}