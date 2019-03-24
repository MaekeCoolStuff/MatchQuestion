import * as PIXI from 'pixi.js';
import { MatchContainer } from './match-container';
import { MatchItem } from './match-item';
import { MatchItemContainer } from './match-item-container';
import { MatchCollisionService } from './match-collision-service';
import * as exampleQuestions from './question';

const app = new PIXI.Application(1200, 768, {
    transparent: true,
    antialias: true
});

const renderer = app.renderer;
document.body.appendChild(renderer.view);
const stage = new PIXI.Container();
let state = inGameState;

function gameLoop() {
    requestAnimationFrame(gameLoop);
    state();
    renderer.render(stage);
}

let q = exampleQuestions.question;
let matchContainerY = 20;

for(let key in q.matchContainers) {
    if(q.matchContainers.hasOwnProperty(key)) {
        let matchContainer = new MatchContainer(q.matchContainers[key], 20, matchContainerY);
        MatchCollisionService.matchContainers.push(matchContainer);
        stage.addChild(matchContainer);
        matchContainerY += 160;
    }
}

let matchItemContainerX = 400;
let matchItemContainerY = 20;

for(let key in q.matchItems) {
    if(q.matchItems.hasOwnProperty(key)) {
        let matchItem = new MatchItem(q.matchItems[key], stage);
        let matchItemContainer = new MatchItemContainer(matchItemContainerX, matchItemContainerY, matchItem);
        MatchCollisionService.matchItemContainers.push(matchItemContainer);
        stage.addChild(matchItemContainer);
        matchItemContainerY += 160;
    }
}

gameLoop();

function inGameState() {

}