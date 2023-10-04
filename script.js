// welcome to the script

// game data
// for inputsEnabled:
// 1 is if only the first input is enabled
// 2 is if only the last input is enabled
// 3 is if both are enabled

const puzzles = 
[
    {
    "puzzleLetters": "car",
    "inputsEnabled": [2, 2, 2, 1, 1, 3, 3, 3],
    "syllablesRequired": [1, 2, 3, 1, 2, 2, 3, 4],
    "goldenWords": ["carve", "careful", "caramel", "scar", "boxcar", "scarlet", "scarcity", "vicarious"]
    },
    {
    "puzzleLetters": "ble",
    "inputsEnabled": [2, 2, 1, 1, 1, 3, 3, 3],
    "syllablesRequired": [1, 2, 2, 3, 4, 2, 3, 4],
    "goldenWords": ["bleak", "blender", "amble", "syllable", "impeccable", "sublet", "bumblebee", "problematic"]
    },
    {
    "puzzleLetters": "cor",
    "inputsEnabled": [2, 2, 1, 2, 3, 3, 3, 3],
    "syllablesRequired": [1, 2, 2, 3, 1, 2, 3, 4],
    "goldenWords": ["cork", "corgi", "rancor", "corridor", "score", "hardcore", "incorrect", "accordion"]
    },
    {
    "puzzleLetters": "hat",
    "inputsEnabled": [2, 1, 2, 1, 2, 3, 3, 3],
    "syllablesRequired": [1, 1, 2, 2, 3, 2, 3, 4],
    "goldenWords": ["hatch", "chat", "hatchet", "chitchat", "hatchery", "shatter", "emphatic", "whatsoever"]
    },
    {
    "puzzleLetters": "art",
    "inputsEnabled": [1, 1, 1, 2, 2, 3, 3, 3],
    "syllablesRequired": [1, 2, 3, 2, 3, 1, 2, 3],
    "goldenWords": ["thwart", "outsmart", "worrywart", "artist", "artisan", "earth", "martyr", "cathartic"]
    },
    {
    "puzzleLetters": "int",
    "inputsEnabled": [2, 2, 2, 2, 1, 1, 1, 3],
    "syllablesRequired": [2, 3, 4, 5, 1, 2, 3, 1],
    "goldenWords": ["intrigue", "intricate", "intuition", "interpolation", "squint", "complaint", "fingerprint", "ninth"]
    },
];

// submit() takes the three inputs and gets the word info from the formed word

function submit() {
    let first = document.getElementById('slotOne').value;
    let second = document.getElementById('slotTwo').value;
    let third = document.getElementById('slotThree').value;
    if (structure === 1 && !document.getElementById('slotOne').value.trim()) {
    alert("You must fill in the first field.");
        return;
    } 
    if (structure === 2 && !document.getElementById('slotThree').value.trim()) {
        alert("You must fill in the last field.")
        return;
    } 
    if (structure === 3 && !document.getElementById('slotOne').value.trim()) {
        alert("You must fill in both fields.")
        return;
    }
    if (structure === 3 && !document.getElementById('slotThree').value.trim()) {
        alert("You must fill in both fields.")
        return;
    }
    fetch(`https://wordsapiv1.p.rapidapi.com/words/${first+second+third}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "2abe5831c9msh56936816ad908fcp1f6f3ajsn8d5162bb" + 1597,
        "x-rapidapi-host": "wordsapiv1.p.rapidapi.com"
      }
    })
    .then(response => response.json())
        .then(data => {;
            if (data.message === "word not found" || data.syllables === undefined || data.results === undefined) {
                alert("Please enter a valid word.")
            } else if (syllablesNeeded !== data.syllables.count) {
                alert("The entered word does not meet the syllables requirement.")
            } else if (data.word != first+second+third) {
                console.log(data.word + " AND " + first + second + third)
                alert("The word may not be plural.")
            } else {
                score++;
                externalScore += 1;
                fetchedWord = data;
                document.getElementById("message").innerHTML = "+1 point!";
                if (data.frequency <= 3) {
                    document.getElementById("title").style.color = "rebeccapurple";
                    document.getElementById("message").innerHTML = "+3 points!";
                    document.getElementById("message").style.color = "rebeccapurple";
                    externalScore += 3;
                }
                if (data.word === puzzles[puzzleID].goldenWords[score - 1]) {
                    document.getElementById("title").style.color = "gold"
                    document.getElementById("message").innerHTML = "+5 points!";
                    document.getElementById("message").style.color = "gold";
                    externalScore += 5;
                }
                setTimeout(() => {
                    document.getElementById("title").style.color = "white"
                    document.getElementById("message").style.color = "white";
                    start();
                }, "600");
            }
    });
}

function gameSet() {
    document.getElementById('play').innerHTML = "Reset";
    puzzleID = Math.floor(Math.random() * puzzles.length)
    document.getElementById('slotOne').value = "";
    document.getElementById("slotTwo").value = puzzles[puzzleID].puzzleLetters
    document.getElementById('slotThree').value = "";
    for (let i = 1; i <= 8; i++) {
        document.getElementById("word"+i).innerHTML = "";
        document.getElementById("word"+i).style.color = "white"
        document.getElementById("definition"+i).innerHTML = "";
        document.getElementById("definition"+i).style.color = "white"  
        document.getElementById("obscure"+i).hidden = true           
        document.getElementById("golden"+i).hidden = true    
    }
    score = 0;
    externalScore = 0
    document.getElementById("message").innerHTML = "Score: 0";
    start();
}

let puzzleID = 0;
let fetchedWord = {};
let structure = 0
let syllablesNeeded = 0;
let score = 0;
let externalScore = 0;

function inputDisabler() {
    structure = puzzles[puzzleID].inputsEnabled[score];
    syllablesNeeded = puzzles[puzzleID].syllablesRequired[score];
    document.getElementById('syllables').innerHTML = "syllables required: " + syllablesNeeded
    if (structure === 1) {
        document.getElementById('slotOne').readOnly = false;
        document.getElementById('slotOne').style.backgroundColor = "white";
        document.getElementById('slotThree').readOnly = true;
        document.getElementById('slotThree').style.backgroundColor = "gray";

    }
    if (structure === 2) {
        document.getElementById('slotOne').readOnly = true;
        document.getElementById('slotOne').style.backgroundColor = "gray";
        document.getElementById('slotThree').readOnly = false;
        document.getElementById('slotThree').style.backgroundColor = "white";
    }
    if (structure === 3) {
        document.getElementById('slotOne').readOnly = false;
        document.getElementById('slotOne').style.backgroundColor = "white";
        document.getElementById('slotThree').readOnly = false;
        document.getElementById('slotThree').style.backgroundColor = "white";
    }
}

function start() {
    document.getElementById("message").innerHTML = "Score: " + externalScore;
    document.getElementById('slotOne').value = "";
    document.getElementById('slotThree').value = "";
    inputDisabler();
    if (score >= 1 && score <= 8) {
        document.getElementById("word"+score).innerHTML = fetchedWord.word;
        document.getElementById("definition"+score).innerHTML = fetchedWord.results[0].partOfSpeech + ". " + fetchedWord.results[0].definition;
        if (fetchedWord.word === puzzles[puzzleID].goldenWords[score - 1]) {
            document.getElementById("word"+score).style.color = "gold"
            document.getElementById("definition"+score).style.color = "gold"  
            document.getElementById("golden"+score).style.backgroundColor = "gold"              
            document.getElementById("golden"+score).innerHTML = "Golden word!"              
            document.getElementById("golden"+score).hidden = false           
        }
        if (fetchedWord.frequency <= 3) {
            document.getElementById("obscure"+score).style.backgroundColor = "rebeccapurple"              
            document.getElementById("obscure"+score).innerHTML = "Obscure word!"   
            document.getElementById("obscure"+score).hidden = false  
        }
    }
    if (score === 8) {
        document.getElementById('syllables').innerHTML = "Congratulations!"
        alert("Congratulations! You've won!")
    }
}