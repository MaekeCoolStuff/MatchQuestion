import * as PIXI from 'pixi.js';
import { Player } from './player';
import { KeyboardHandler } from './keyboard-handler';
import { MatchContainer } from './match-container';
import { MatchChildContainer } from './match-child-container';
import { CollisionService } from './collision-service';

const app = new PIXI.Application(1024, 768, {
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

let matchChildContainer1 = new MatchChildContainer('I want my outfit to match my mood.', 400, 20);
let matchChildContainer2 = new MatchChildContainer('Brand is just a perception, and perception will match reality over time. Sometimes it will be ahead, other times it will be behind. But brand is simply a collective impression some have about a product.', 400, 180);
let matchChildContainer3 = new MatchChildContainer('A gentleman would be ashamed should his deeds not match his words.', 400, 340);
let matchChildContainer4 = new MatchChildContainer('What you do makes a difference, and you have to decide what kind of difference you want to make.', 400, 500);

stage.addChild(matchContainer1);
stage.addChild(matchContainer2);
stage.addChild(matchContainer3);
stage.addChild(matchContainer4);

stage.addChild(matchChildContainer1);
stage.addChild(matchChildContainer2);
stage.addChild(matchChildContainer3);
stage.addChild(matchChildContainer4);

gameLoop();

function inGameState() {

}