import * as PIXI from 'pixi.js';

export class MenuView extends PIXI.Container {
    constructor(public stage: PIXI.Container, public renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer, public menuItems: IMenuItem[]) {
        super();
        this.initializeView();
    }

    initializeView() {
        let matchQuestionTitle = new PIXI.Text('Match Question voorbeelden');
        matchQuestionTitle.x = this.renderer.view.width / 2 - matchQuestionTitle.width / 2;
        matchQuestionTitle.y = 20;
        this.stage.addChild(matchQuestionTitle);

        let buttonY = 80;

        this.menuItems.forEach((menuItem: IMenuItem) => {
            let button = this.createMenuButton(menuItem.title, menuItem.callback);
            button.y = buttonY;
            buttonY += 60;
            this.stage.addChild(button);
        });
    }
    
    private createMenuButton(title: string, clickHandler: any) {
        let button = new PIXI.Graphics();
        button.beginFill(0x2b7cff);
        button.drawRect(0,0,400,50);
        button.endFill();
    
        button.interactive = true;
        button.buttonMode = true;
    
        let titleText = new PIXI.Text(title, { fill: 'white'});
        titleText.y = 10;
        titleText.x = (button.width - titleText.width) / 2;
        button.addChild(titleText);
        button.on('mouseover', () => {
            button.alpha = 0.8;
        });
        button.on('mouseout', () => {
            button.alpha = 1;
        });
        button.on('click', () => {
            clickHandler();
        });
        button.x = this.renderer.view.width / 2 - button.width / 2;
        return button;
    }
}

export interface IMenuItem {
    title: string,
    callback: Function
}