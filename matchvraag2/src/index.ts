import * as PIXI from 'pixi.js';
import { MatchContainer } from './match-container';
import { MatchItem } from './match-item';
import { MatchItemContainer } from './match-item-container';
import { CollisionService } from './collision-service';

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

let matchContainer1 = new MatchContainer('Confucius', 20, 20);
CollisionService.matchContainers.push(matchContainer1);
let matchContainer2 = new MatchContainer('Dakota Johnson', 20, 180);
CollisionService.matchContainers.push(matchContainer2);
let matchContainer3 = new MatchContainer('Jane Goodall', 20, 340);
CollisionService.matchContainers.push(matchContainer3);
let matchContainer4 = new MatchContainer('Elon Musk', 20, 500);
CollisionService.matchContainers.push(matchContainer4);

let matchItem1 = new MatchItem('I want my outfit to match my mood.');
let matchItem2 = new MatchItem('Brand is just a perception, and perception will match reality over time. Sometimes it will be ahead, other times it will be behind. But brand is simply a collective impression some have about a product.');
let matchItem3 = new MatchItem('A gentleman would be ashamed should his deeds not match his words.');
let matchItem4 = new MatchItem('What you do makes a difference, and you have to decide what kind of difference you want to make.');

stage.addChild(matchContainer1);
stage.addChild(matchContainer2);
stage.addChild(matchContainer3);
stage.addChild(matchContainer4);

let matchItemContainer1 = new MatchItemContainer(400, 20, matchItem1);
let matchItemContainer2 = new MatchItemContainer(400, 180, matchItem2);
let matchItemContainer3 = new MatchItemContainer(400, 340, matchItem3);
let matchItemContainer4 = new MatchItemContainer(400, 500, matchItem4);

stage.addChild(matchItemContainer1);
stage.addChild(matchItemContainer2);
stage.addChild(matchItemContainer3);
stage.addChild(matchItemContainer4);

gameLoop();

function inGameState() {

}