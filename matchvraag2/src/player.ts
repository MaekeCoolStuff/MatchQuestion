import { Sprite, Graphics } from "pixi.js";
import { KeyboardHandler } from "./keyboard-handler";

export class Player extends Sprite {
    vx: number = 0;
    vy: number = 0;
    gravity: number = 0.5; 
    isFalling: boolean = true;
    jumpTimeout: any;

    constructor() {
        super();

        this.setup();
    }

    setup() {
        this.setupGraphics();
        this.setupControls();
    }

    draw() {
        this.x += this.vx * 5;
        if (this.isFalling) {
            clearTimeout(this.jumpTimeout);
            this.y += this.gravity * 5;
            if(this.y > 718) {
                this.y = 718 - this.height
                this.isFalling = false;
            }
        } else {
            this.y += this.vy * 5;
        }
        
    }

    setupGraphics() {
        let g = new Graphics();
        g.beginFill(0x0d4374);
        g.drawRect(0, 0, 20, 50);
        g.endFill;

        this.x = 30;
        this.y = 600;

        this.addChild(g);
    }

    setupControls() {
        // LEFT KEY
        new KeyboardHandler([37],  () => {
            this.vx = -1;
        }, () => {
            this.vx = 0;
        });
        // RIGHT KEY
        new KeyboardHandler([39], () => {
            this.vx = 1;
        }, () => {
            this.vx = 0;
        });
        // SPACE OR UP KEY
        new KeyboardHandler([32, 38], () => {
            if(this.isFalling) {
                return;
            }
            this.vy = -1;
            this.jumpTimeout = setTimeout(() => {
                this.isFalling = true;
            }, 500)
        }, () => {
            this.vy = 0;
            this.isFalling = true;
        });
    }
}