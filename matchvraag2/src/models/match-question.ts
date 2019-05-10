import { IQuestionVO } from "../data/question";
import { MatchItemContainer } from "./match-item-container";
import { Container } from "pixi.js";
import { MatchItem } from "./match-item";
import { MatchContainer } from "./match-container";
import * as PIXI from 'pixi.js';
import { MatchQuestionView } from "../views/match-question-view";
import { MultipleMatchItemContainer } from "./multiple-match-item-container";
import { MultipleMatchContainer } from "./multiple-match-container";

export class MatchQuestion {
    public matchContainers: MatchContainer[] = [];
    public matchItemContainers: MatchItemContainer[] = [];
    public matchItems: MatchItem[] = [];
    public type: string;
    public questionLocked: boolean = false;

    constructor(public question: IQuestionVO, public stage, public view: MatchQuestionView) {
        this.initQuestion(question, stage);
    }

    public initQuestion(question: IQuestionVO, stage) {
        this.type = question.type;
        let matchContainerY = 80;
        let matchContainerX = 20;
        let matchXIncrement = 0;
        let matchYIncrement = 200;
        if (this.type === 'ImageToText') {
            matchYIncrement = 200;
        } else if (question.variant === 'ManyTooMany') {
            matchYIncrement = 0;
            matchXIncrement = 240;
        }

        for (let key in question.matchContainers) {
            if (question.matchContainers.hasOwnProperty(key)) {
                if(this.question.variant === 'ManyTooMany') {
                    let multipleMatchContainer = new MultipleMatchContainer(question.matchContainers[key], key, matchContainerX, matchContainerY, this);
                    stage.addChild(multipleMatchContainer);
                } else {
                    let matchContainer = new MatchContainer(question.matchContainers[key], key, matchContainerX, matchContainerY, this);
                    this.matchContainers.push(matchContainer);
                    stage.addChild(matchContainer);
                }
                matchContainerY += matchYIncrement;
                matchContainerX += matchXIncrement;
            }
        }

        if(question.variant !== 'ManyTooMany') {
            let matchItemContainerX = 400;
            if (this.question.type === 'ImageToText') {
               matchItemContainerX = 750;
            }
            let matchItemContainerY = 80;
    
            for (let key in question.matchItems) {
                if (question.matchItems.hasOwnProperty(key)) {
                    let matchItem = new MatchItem(question.matchItems[key], key, stage, this);
                    let matchItemContainer = new MatchItemContainer(matchItemContainerX, matchItemContainerY, matchItem, this);
                    matchItemContainer.matchItem = matchItem;
                    matchItem.container = matchItemContainer;
                    this.matchItems.push(matchItem);
                    this.matchItemContainers.push(matchItemContainer);
                    stage.addChild(matchItemContainer);
                    matchItemContainerY += matchYIncrement;
                }
            }
        } else {
            for (let key in question.matchItems) {
                if (question.matchItems.hasOwnProperty(key)) {
                    let matchItem = new MatchItem(question.matchItems[key], key, stage, this);
                    this.matchItems.push(matchItem);
                }
            }
            let multipleMatchItemContainer = new MultipleMatchItemContainer(0, 0, this, this.matchItems);
            this.stage.addChild(multipleMatchItemContainer);
        }
    }

    public checkForContainerCollisions(x: number, y: number, matchItem: MatchItem, dragEnd: boolean): boolean {
        let hasCollisions: boolean = false;
        let allContainersToCheck: any[] = <any[]>this.matchContainers
            .concat(<any[]>this.matchItemContainers);

        allContainersToCheck.forEach(c => {
            let isInDropzone = c.getBounds().contains(x, y);
            if (isInDropzone) {
                hasCollisions = true;
                if (dragEnd) {
                    c.setMatchItem(matchItem);
                } else {
                    c.setHoverState();
                }
            } else {
                c.setNonHoverState();
            }
        });

        return hasCollisions;
    }

    public nextQuestion(question: IQuestionVO) {
        this.question = question;
        this.resetQuestion();
    }

    public resetQuestion() {
        for (let i = this.stage.children.length - 1; i >= 0; i--) {	this.stage.removeChild(this.stage.children[i]);};
        this.view.initializeView();
    }

    public validateQuestions() {
        this.questionLocked = true;
        this.matchContainers.forEach(c => {
            c.validate();
        });
        this.matchItems.forEach(mi => {
            mi.validate();
        });
    }
}