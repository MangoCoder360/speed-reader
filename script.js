let initWordList = ["Welcome to Speed Reader!","Shift to rewind","Space to read"];
let bufferList = ["","Reading Complete!","","","",""];
let wordList = [];
let currentWord = 3;
let wpm = 500;
let inReadingMode = false;
let isSpacePressed = false;
let isShiftPressed = false;
let interval;
let wordListLength = 0;

function wpmDisplay(){
    document.getElementById("speedDisplay").innerHTML = document.getElementById("wpmSlider").value + " WPM";
}

function startReading(){
    document.getElementById("inputMode").style.display = "none";
    document.getElementById("readingMode").style.display = "block";
    
    wpm = document.getElementById("wpmSlider").value;

    isShiftPressed = false;
    isSpacePressed = false;
    currentWord = 3;
    wordList = [];
    initWordList.forEach(element => {
        wordList.push(element);
    });
    document.getElementById("inputText").value.split(" ").forEach(element => {
        wordList.push(element);
    });
    wordListLength = wordList.length + 2;
    bufferList.forEach(element => {
        wordList.push(element);
    });

    inReadingMode = true;
    renderWords();

    interval = setInterval(() => {
        if (isSpacePressed) {
            nextWord();
        } else if (isShiftPressed) {
            previousWord();
        }
    }, wpmToMs(wpm));
}

function returnToInput(){
    document.getElementById("inputMode").style.display = "block";
    document.getElementById("readingMode").style.display = "none";

    inReadingMode = false;

    clearInterval(interval);
}

function renderWords(){
    if(currentWord > wordListLength){
        alert("Reading Complete! Returning to input mode.");
        returnToInput();
    }
    if(currentWord < 3){
        currentWord = 3;
        renderWords();
    }
    document.getElementById("prev1").innerHTML = wordList[currentWord - 1];
    document.getElementById("prev2").innerHTML = wordList[currentWord - 2];
    document.getElementById("prev3").innerHTML = wordList[currentWord - 3];
    document.getElementById("currentWord").innerHTML = wordList[currentWord];
    document.getElementById("next1").innerHTML = wordList[currentWord + 1];
    document.getElementById("next2").innerHTML = wordList[currentWord + 2];
    document.getElementById("next3").innerHTML = wordList[currentWord + 3];
}

function nextWord(){
    currentWord++;
    renderWords();
}

function previousWord(){
    currentWord--;
    renderWords();
}

function wpmToMs(wpm) {
    return 60000 / wpm;
}

document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        isSpacePressed = true;
    } else if (event.code === "ShiftLeft" || event.code === "ShiftRight") {
        isShiftPressed = true;
    }
});

document.addEventListener("keyup", (event) => {
    if (event.code === "Space") {
        isSpacePressed = false;
    } else if (event.code === "ShiftLeft" || event.code === "ShiftRight") {
        isShiftPressed = false;
    }
});