import * as PIXI from 'pixi.js';
import { IQuestionVO } from '../data/question';
import { MatchQuestion } from '../models/match-question';
import { backToMenu, nextQuestion } from '../index';

export class MatchQuestionView extends PIXI.Container {
    public questionObject: IQuestionVO;
    public matchQuestion: MatchQuestion;

    constructor(public stage, public renderer, public question: IQuestionVO, public backFn: Function) {
        super();
        this.initializeView();
    }

    public initializeView() {
        scroll(0,0);
        this.matchQuestion = new MatchQuestion(this.question, this.stage, this);
        if (this.matchQuestion.type === 'ImageToText') {
            this.renderer.resize(1200, 2000);
        }
        this.setDefaultButtons();
    }

    private setDefaultButtons() {
        let button = new PIXI.Graphics();
        button.beginFill(0x0d4374);
        button.drawRect(0, 0, 200, 50);
        button.endFill();
        button.interactive = true;
        button.buttonMode = true;

        if (this.question.type === 'ImageToText') {
            button.x = 460;
            button.y = 850;
        } else {
            button.x = 750;
            button.y = 20;
        }


        let text = new PIXI.Text('Valideer', {
            fill: '0xffffff',
            fontSize: 32
        });
        text.x = 40;
        text.y = 7;

        button.on('click', () => {
            if (this.matchQuestion.questionLocked) {
                this.matchQuestion.resetQuestion();
            } else {
                button.removeChildren();
                text = new PIXI.Text('Reset vraag', {
                    fill: '0xffffff',
                    fontSize: 32
                });
                text.x = 15;
                text.y = 7;
                button.addChild(text);
                this.matchQuestion.validateQuestions();
            }
        });
        button.on('mouseover', () => {
            button.alpha = 0.75;
        });
        button.on('mouseout', () => {
            button.alpha = 1;
        });
        button.addChild(text);
        this.stage.addChild(button);

        let button2 = new PIXI.Graphics();
        button2.beginFill(0x0d4374);
        button2.drawRect(0, 0, 200, 50);
        button2.endFill();
        button2.interactive = true;
        button2.buttonMode = true;
        if (this.question.type === 'ImageToText') {
            button2.x = 20;
            button2.y = 850;
        } else {
            button2.x = 750;
            button2.y = 140;
        }

        button2.on('mouseover', () => {
            button2.alpha = 0.75;
        });
        button2.on('mouseout', () => {
            button2.alpha = 1;
        });
        button2.on('click', () => {
            this.backFn();
        });
        let text2 = new PIXI.Text('Terug', { fill: '0xffffff', fontSize: 32 });
        button2.addChild(text2);
        text2.y = 7;
        text2.x = button2.width / 2 - text2.width / 2;      

        this.stage.addChild(button2);

        let button3 = new PIXI.Graphics();
        button3.beginFill(0x0d4374);
        button3.drawRect(0, 0, 200, 50);
        button3.endFill();
        button3.interactive = true;
        button3.buttonMode = true;
        if (this.question.type === 'ImageToText') {
            button3.x = 240;
            button3.y = 850;
        } else {
            button3.x = 750;
            button3.y = 80;
        }

        button3.on('mouseover', () => {
            button3.alpha = 0.75;
        });
        button3.on('mouseout', () => {
            button3.alpha = 1;
        });
        button3.on('click', () => {
            nextQuestion();
        });
        let text3 = new PIXI.Text('Volgende', { fill: '0xffffff', fontSize: 32 });
        button3.addChild(text3);
        text3.y = 7;
        text3.x = button3.width / 2 - text3.width / 2;      

        this.stage.addChild(button3);  
    }
}
