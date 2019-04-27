export const question3 = {
    type: "TextToText",
    variant: "DragAndDrop",
    htmlFragment: "Verbind de juiste definitie rechts met het juiste begrip links.",
    matchContainers: {
        "A": "Gewoonte",
        "B": "Ritueel",
        "C": "Symbool",
        "D": "Traditie"
    },
    matchItems: {
        "A": "Iets wat je vaak op dezelfde manier doet, omdat je dat zo gewend bent.",
        "B": "Een teken dat een specifieke betekenis heeft in een cultuur.",
        "C": "Een handeling die een bepaalde betekenis heeft in een cultuur.",
        "D": "Een gebruik dat van generatie op generatie wordt doorgegeven."
    },
    correctAnswers: {
        "A": ["A"],
        "B": ["C"],
        "C": ["B"],
        "D": ["D"]
    }
}

export const question4 = {
    type: "TextToText",
    variant: "DragAndDrop",
    htmlFragment: "Verbind elk voorbeeld rechts met het juiste begrip links.",
    matchContainers: {
        "A": "Assimilatie",
        "B": "Integratie",
        "C": "Segregatie",
    },
    matchItems: {
        "A": "Jaime zit in een basketbalteam met jongens met verschillende migratieachtergronden. Ze eten elke week bij een van hen thuis om elkaar beter te leren kennen.",
        "B": "Midas zit op een school met vrijwel alleen maar blanke kinderen. Op een andere school in de wijk zitten vrijwel alleen maar donkere kinderen.",
        "C": "Glenn is een Indische jongen die in Nederland woont. Hij heeft zich volledig aangepast aan de Nederlandse cultuur en spreekt daarom de taal van zijn land van herkomst nooit meer."
    },
    correctAnswers: {
        "A": ["C"],
        "B": ["A"],
        "C": ["B"]
    }
}

export const question5 = {
    type: "TextToText",
    variant: "DragAndDrop",
    htmlFragment: "Verbind elk medium rechts met de functie van de media links.",
    matchContainers: {
        "A": "Informatieve functie",
        "B": "Amusementsfunctie",
        "C": "Sociale functie",
        "D": "Commentaarfunctie"
    },
    matchItems: {
        "A": "Wikipedia",
        "B": "9GAG",
        "C": "WhatsApp",
        "D": "Twitter"
    },
    correctAnswers: {
        "A": ["A"],
        "B": ["B"],
        "C": ["D"],
        "D": ["C"]
    }
}

export const question6 = {
    type: "ImageToText",
    variant: "DragAndDrop",
    htmlFragment: "Lees de beschrijvingen. Deze personen waren de afgelopen tijd in het nieuws. Welke naam hoort bij welke beschrijving? Koppel de juiste beschrijving aan de juiste persoon.",
    matchContainers: {
        "A": "Ronnie Flex",
        "B": "Emiliano Sala",
        "C": "Chris Brown",
        "D": "Julen"
    },
    matchItems: {
        "A": "src/images/namen/Julen.PNG",
        "B": "src/images/namen/EmilianoSala.PNG",
        "C": "src/images/namen/RonnieFlex.PNG",
        "D": "src/images/namen/ChrisBrown.PNG"
    },
    correctAnswers: {
        "A": ["C"],
        "B": ["B"],
        "C": ["D"],
        "D": ["A"]
    }
}

export const question7 = {
    type: "ImageToText",
    variant: "DragAndDrop",
    htmlFragment: "Afgelopen week was er ophef over verschillende bedreigingen aan het adres van Thierry Baudet. Wie deed welke uitspraak? Sleep de juiste persoon naar bijbehorende uitspraak.",
    matchContainers: {
        "A": "Mark Rutte",
        "B": "Woordvoerder Openbaar Ministerie",
        "C": "Ruben L. Oppenheimer (cartoonist)",
        "D": "Thierry Baudet"
    },
    matchItems: {
        "A": "src/images/uitspraken/baudet.PNG",
        "B": "src/images/uitspraken/cartoonist.PNG",
        "C": "src/images/uitspraken/markrutte.PNG",
        "D": "src/images/uitspraken/woordvoerderOM.PNG"
    },
    correctAnswers: {
        "A": ["C"],
        "B": ["D"],
        "C": ["B"],
        "D": ["A"]
    }
}

export const question8 = {
    type: "ImageToText",
    variant: "DragAndDrop",
    htmlFragment: "In welke landen vonden de volgende gebeurtenissen plaats? Sleep de gebeurtenissenin de juiste volgorde.",
    matchContainers: {
        "A": "Veel mensen komen om en raken gewond door twee tornado's.",
        "B": "Tientallen mensen komen om bij het instorten van een goudmijn.",
        "C": "Twee treinen botsen op elkaar door een ruzie tussen de machinisten."
    },
    matchItems: {
        "A": "src/images/landen/indonesia.PNG",
        "B": "src/images/landen/amerika.PNG",
        "C": "src/images/landen/egypte.PNG"
    },
    correctAnswers: {
        "A": ["B"],
        "B": ["A"],
        "C": ["C"]
    }
}

export const question9 = {
    type: "ImageToText",
    variant: "DragAndDrop",
    htmlFragment: "Waar vonden de volgende gebeurtenissen plaats? Sleep het juiste land naar de juiste gebeurtenis.",
    matchContainers: {
        "A": "Vrachtwagen rijdt door stuurfout in op groep mensen: 18 doden.",
        "B": "Noodtoestand uitgeroepen na mazelenuitbraak.",
        "C": "Spectaculaire uitbarsting: vulkaan spuwt opnieuw lava."
    },
    matchItems: {
        "A": "src/images/vlaggen/guatemalaplusnaam.PNG",
        "B": "src/images/vlaggen/mexicoplusnaam.PNG",
        "C": "src/images/vlaggen/amerikaplusnaam.PNG"
    },
    correctAnswers: {
        "A": ["B"],
        "B": ["A"],
        "C": ["C"]
    }
}

export const question = {
    type: "TextToText", // andere mogelijkheden: ImageToText, ImageToImage, TextToTimeLine, ImageToTimeLine
    variant: "DragAndDrop", // andere mogelijkheden: DrawLines
    htmlFragment: "",
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
    htmlFragment: "",
    matchContainers: {
        "A": "Assassins Creed",
        "B": "Monopoly",
        "C": "Pokemon",
        "D": "Catan"
    },
    matchItems: {
        "A": "src/images/pokemon2.jpg",
        "B": "src/images/catan2.jpg",
        "C": "src/images/odyssee2.jpg",
        "D": "src/images/monopoly2.jpg"
    },
    correctAnswers: {
        "A": ["C"],
        "B": ["A"],
        "C": ["D"],
        "D": ["B"]
    }
}

export const question10 = {
    type: 'TextToText',
    variant: 'ManyTooMany',
    htmlFragment: '',
    matchContainers: {
        'A': 'Getallen',
        'B': 'Letters',
        'C': 'Kleuren',
        'D': 'Dieren'
    },
    matchItems: {
        'A': 'eend',
        'B': '3',
        'C': 'geel',
        'D': 'koe',
        'E': 'blauw',
        'F': '5',
        'G': 'A',
        'H': 'zeven',
        'I': 'walvis',
        'J': 'L',
        'K': 'groen',
        'L': 'kat',
        'M': 'M',
        'N': 'turquoise',
        'O': 'T',
        'P': 'MMXIX'
    },
    correctAnswers: {
        'A': ['B', 'F', 'H', 'P'],
        'B': ['G', 'J', 'M', 'O'],
        'C': ['C', 'E', 'K', 'N'],
        'D': ['A', 'D', 'I', 'L']
    }
}

export interface IQuestionVO {
    type: string;
    variant: string;
    htmlFragment: string;
    matchContainers: Object;
    matchItems: Object;
    correctAnswers: Object;
}