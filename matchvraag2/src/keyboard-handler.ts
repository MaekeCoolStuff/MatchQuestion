export class KeyboardHandler {
    private isDown: boolean;
    private isUp: boolean = true;
    private downHandler = undefined;
    private upHandler = undefined;

    constructor(private keyCodes: Array<number>, private press: Function, private release: Function) {
        keyCodes.forEach((keyCode) => {
            this.setup(keyCode);
        });
    }

    
    setup(keyCode) {
        this.downHandler = event => {
            if(event.keyCode === keyCode) {
                if(this.isUp && this.press) {
                    this.press();
                    this.isDown = true;
                    this.isUp = false;
                }
                event.preventDefault();
            };
        }

        this.upHandler = event => {
            if(event.keyCode === keyCode) {
                if(this.isDown && this.release) {
                    this.release();
                    this.isDown = false;
                    this.isUp = true;
                }
                event.preventDefault();
            }
        }

        window.addEventListener('keydown', this.downHandler.bind(this), false);
        window.addEventListener('keyup', this.upHandler.bind(this), false);
    }
}