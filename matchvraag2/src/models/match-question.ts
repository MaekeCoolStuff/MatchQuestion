import { IQuestionVO } from "../data/question";
import { MatchItemContainer } from "./match-item-container";
import { Container } from "pixi.js";
import { MatchItem } from "./match-item";
import { MatchContainer } from "./match-container";

export class MatchQuestion {
    public matchContainers: MatchContainer[] = [];
    public matchItemContainers: MatchItemContainer[] = [];

    constructor(question: IQuestionVO, stage: Container) {
        let matchContainerY = 20;
    
        for(let key in question.matchContainers) {
            if(question.matchContainers.hasOwnProperty(key)) {
                let matchContainer = new MatchContainer(question.matchContainers[key], key, 20, matchContainerY);
                this.matchContainers.push(matchContainer);
                stage.addChild(matchContainer);
                matchContainerY += 200;
            }
        }
        
        let matchItemContainerX = 400;
        let matchItemContainerY = 20;
        
        for(let key in question.matchItems) {
            if(question.matchItems.hasOwnProperty(key)) {
                let matchItem = new MatchItem(question.matchItems[key], key, stage, this);
                let matchItemContainer = new MatchItemContainer(matchItemContainerX, matchItemContainerY, matchItem);
                this.matchItemContainers.push(matchItemContainer);
                stage.addChild(matchItemContainer);
                matchItemContainerY += 200;
            }
        }
    }

    public checkForContainerCollisions(x: number, y: number, matchItem: MatchItem, dragEnd: boolean): boolean {
        let hasCollisions: boolean = false;
        let allContainersToCheck: any[] = <any[]>this.matchContainers
            .concat(<any[]>this.matchItemContainers)
        
        allContainersToCheck.forEach(c => {
            let isInDropzone = c.getBounds().contains(x, y);
            if(isInDropzone) {
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

     public validateQuestions() {
        this.matchContainers.forEach(c => {
            c.validate();
        });
    }
}