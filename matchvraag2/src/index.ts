import * as PIXI from 'pixi.js';
import { MenuView } from './views/menu-view';
import { MatchQuestionView } from './views/match-question-view';
import { question, question2 } from './data/question';
import { scaleToWindow } from './utils/scaleToWindow';

const app = new PIXI.Application(1024, 800, {
    transparent: true,
    antialias: true
});

const renderer = app.renderer;
document.body.appendChild(renderer.view);
renderer.view.style.width = '1024px';
renderer.view.style.height = '800px';

// window.addEventListener("resize", event => {
//     scaleToWindow(renderer.view);
// });

export const stage = new PIXI.Container();
let state = menuState;
let stateInitialized = false;
let currentQuestion = question;

PIXI['Loader'].shared
.add("/src/images/catan1.png")
.add("/src/images/catan2.jpg")
.add("/src/images/monopoly1.jpeg")
.add("/src/images/monopoly2.jpg")
.add("/src/images/odyssee1.jpg")
.add("/src/images/odyssee2.jpg")
.add("/src/images/pokemon1.jpg")
.add("/src/images/pokemon2.jpg")
.load(() => {
    gameLoop();
})

const menuItems = [
    {
        title: 'Tekst aan tekst matchen',
        callback: () => {
            clearStage();
            stateInitialized = false;
            currentQuestion = question;
            state = inQuestionState;
        }
    },
    {
        title: 'Plaatje aan tekst matchen',
        callback: () => {
            clearStage();
            stateInitialized = false;
            currentQuestion = question2;
            state = inQuestionState;
        }
    },
    {
        title: 'Plaatje aan plaatje matchen',
        callback: () => {}
    },
    {
        title: 'Teksten aan tekst matchen',
        callback: () => {}
    },
    {
        title: 'Plaatjes aan tekst matchen',
        callback: () => {}
    },
    {
        title: 'Plaatjes aan plaatje matchen',
        callback: () => {}
    }
]

function gameLoop() {
    requestAnimationFrame(gameLoop);
    state();
    renderer.render(stage);
}

function menuState() {
    if(!stateInitialized) {
        stateInitialized = true;
        new MenuView(stage, app.renderer, menuItems);
    }
}

function inQuestionState() {
    if(!stateInitialized) {      
        stateInitialized = true;
        new MatchQuestionView(stage, app.renderer, currentQuestion);
    }
}

function clearStage() {
    for (var i = stage.children.length - 1; i >= 0; i--) {	stage.removeChild(stage.children[i]);};
}

export function backToMenu() {
    clearStage();
    stateInitialized = false;
    state = menuState;
}