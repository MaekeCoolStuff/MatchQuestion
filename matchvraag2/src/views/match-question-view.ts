import * as PIXI from 'pixi.js';
import { IQuestionVO } from '../data/question';
import { MatchQuestion } from '../models/match-question';
import { backToMenu } from '../index';

export class MatchQuestionView extends PIXI.Container {
    questionObject: IQuestionVO;
    matchQuestion: MatchQuestion;

    constructor(public stage: PIXI.Container, public renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer, public question: IQuestionVO) {
        super();
        this.initializeView();
    }

    initializeView() {
        this.matchQuestion = new MatchQuestion(this.question, this.stage);
        this.setDefaultButtons();
    }
    
    private setDefaultButtons() {
        let button = new PIXI.Graphics();
        button.beginFill(0x0d4374);
        button.drawRect(0, 0, 200, 50);
        button.endFill();
        button.interactive = true;
        button.buttonMode = true;
        button.on('click', () => {
            this.matchQuestion.validateQuestions();
        });
        button.on('mouseover', () => {
            button.alpha = 0.75;
        });
        button.on('mouseout', () => {
            button.alpha = 1;
        });
        
        button.x = 750;
        button.y = 20;
        
        let text = new PIXI.Text('Valideer', {
            fill: '0xffffff',
            fontSize: 32
        });
        text.x = 40;
        text.y = 7;
    
        let button2 = new PIXI.Graphics();
        button2.beginFill(0x0d4374);
        button2.drawRect(0, 0, 200, 50);
        button2.endFill();
        button2.interactive = true;
        button2.buttonMode = true;
        button2.x = 750;
        button2.y = 80;
    
        button2.on('mouseover', () => {
            button2.alpha = 0.75;
        });
        button2.on('mouseout', () => {
            button2.alpha = 1;
        });
        button2.on('click', () => {
            backToMenu();            
        });
        let text2 = new PIXI.Text('Terug', { fill: '0xffffff', fontSize: 32 });
        button2.addChild(text2);
        text2.y = 7;
        text2.x = button2.width / 2 - text2.width /2;
    
        this.stage.addChild(button2);
        button.addChild(text);
        this.stage.addChild(button);
    }
}

