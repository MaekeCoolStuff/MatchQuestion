import * as PIXI from 'pixi.js';
import { MenuView } from './views/menu-view';
import { MatchQuestionView } from './views/match-question-view';
import { question3, question2, question4, question5, question6, question7, question8, question9, question10 } from './data/question';
import { scaleToWindow } from './utils/scaleToWindow';

const app = new PIXI.Application(1024, 900, {
    transparent: true,
    antialias: true
});

const renderer = app.renderer;
document.body.appendChild(renderer.view);
// window.addEventListener("resize", event => {
//     scaleToWindow(renderer.view);
// });

export const stage = new PIXI.Container();
let questions = [question3, question4, question5];
let state = menuState;
let stateInitialized = false;
let currentQuestionIndex = 0;
let currentQuestion = questions[0];

PIXI.loaders.shared
.add("src/images/catan1.png")
.add("src/images/catan2.jpg")
.add("src/images/monopoly1.jpeg")
.add("src/images/monopoly2.jpg")
.add("src/images/odyssee1.jpg")
.add("src/images/odyssee2.jpg")
.add("src/images/pokemon1.jpg")
.add("src/images/pokemon2.jpg")
.load(() => {
    gameLoop();
})

const menuItems = [
    {
        title: 'Tekst matchen',
        callback: () => {
            clearStage();
            stateInitialized = false;
            questions = [question3, question4, question5];
            currentQuestion = question3;
            state = inQuestionState;
        }
    },
    {
        title: 'Plaatjes matchen',
        callback: () => {
            clearStage();
            stateInitialized = false;
            currentQuestionIndex = 0;
            questions = [question6, question7, question8, question9];
            currentQuestion = question6;
            state = inQuestionState;
        }
    },
    {
        title: 'Meerdere items matchen',
        callback: () => {
            clearStage();
            stateInitialized = false;
            currentQuestionIndex = 0;
            questions = [question10];
            currentQuestion = questions[currentQuestionIndex];
            state = inQuestionState;
        }
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
    if (!stateInitialized) {
        stateInitialized = true;

        if (currentQuestion.type === 'ImageToText') {
            let loader = PIXI.loaders.shared;
            loader.reset();
            loader.add('src/images/krul.png');
            loader.add('src/images/fout.png');
            loader.add('src/images/vergrootglas.png');
            for (let key in currentQuestion.matchItems) {
                if (currentQuestion.matchItems.hasOwnProperty(key)) {
                    loader.add(currentQuestion.matchItems[key]);
                }
            }

            loader.load(() => {
                new MatchQuestionView(stage, app.renderer, currentQuestion, () => {
                    clearStage();
                    stateInitialized = false;
                    state = menuState;
                });
            });
        } else {
            let loader = PIXI.loaders.shared;
            loader.reset();
            loader.add('src/images/krul.png');
            loader.add('src/images/fout.png');

            loader.load(() => {
                new MatchQuestionView(stage, app.renderer, currentQuestion, () => {
                    clearStage();
                    stateInitialized = false;
                    state = menuState;
                });
            });
        }
    }
}

export function nextQuestion() {
    if(currentQuestionIndex + 1 < questions.length) {
        currentQuestionIndex++;
        currentQuestion = questions[currentQuestionIndex];
    } else {
        currentQuestionIndex = 0;
        currentQuestion = questions[currentQuestionIndex];
    }

    clearStage();
    stateInitialized = false;
    state = inQuestionState;
}

function clearStage() {
    for (var i = stage.children.length - 1; i >= 0; i--) {	stage.removeChild(stage.children[i]);};
}

export function backToMenu() {    
    clearStage();
    stateInitialized = false;
    state = menuState;
}