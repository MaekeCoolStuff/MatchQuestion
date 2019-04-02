export const question = {
    type: "TextToText", // andere mogelijkheden: ImageToText, ImageToImage, TextToTimeLine, ImageToTimeLine
    variant: "DragAndDrop", // andere mogelijkheden: DrawLines
    matchContainers: {
        "A": "Confucius", // i.p.v. tekst kunnen dit ook url's naar plaatjes zijn
        "B": "Dakota Johnson",
        "C": "Jane Goodall",
        "D": "Elon Musk"
    },
    matchItems: {
        "A": "I want my outfit to match my mood.", // i.p.v. tekst kunnen dit ook url's naar plaatjes zijn
        "B": "Brand is just a perception, and perception will match reality over time. Sometimes it will be ahead, other times it will be behind. But brand is simply a collective impression some have about a product.",
        "C": "A gentleman would be ashamed should his deeds not match his words.",
        "D": "What you do makes a difference, and you have to decide what kind of difference you want to make."
        // Er mogen meer matchItems zijn dan matchContainers. Er kunnen dus items overblijven.
    },
    correctAnswers: {
        "A": ["C"],
        "B": ["A"],
        "C": ["D"],
        "D": ["B"]
        // Er kunnen meer correcte matchItems aan één matchContainer gematched worden.
        // Het kan ook voorkomen dat er helemaal geen matchItem aan een matchContainer gematched hoeft te worden. i.e. []
    }
}

export const question2 = {
    type: "ImageToText",
    variant: "DragAndDrop",
    matchContainers: {
        "A": "Assassins Creed",
        "B": "Monopoly",
        "C": "Pokemon",
        "D": "Catan"
    },
    matchItems: {
        "A": "/src/images/pokemon2.jpg",
        "B": "/src/images/catan2.jpg",
        "C": "/src/images/odyssee2.jpg",
        "D": "/src/images/monopoly2.jpg"
    },
    correctAnswers: {
        "A": ["C"],
        "B": ["A"],
        "C": ["D"],
        "D": ["B"]
    }
}

export interface IQuestionVO {
    type: string;
    variant: string;
    matchContainers: Object;
    matchItems: Object;
    correctAnswers: Object;
}