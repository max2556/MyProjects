import { listOfRecords } from "./databaseScript.js";
import { Init, ClearGame, score } from "./tetris.js";
import { changeSettingsItem, clearTheStorage, getStorage } from "./storageScipt.js";
import { updateDatabase } from "./databaseScript.js";

//Элементы
const settingsHolder = document.querySelector(".settings");
const mainMenuHolder = document.querySelector(".buttonsHandler");



const scoresTable = document.getElementById("scoresTable");
const startButton = document.getElementById("startButton");
const continueButton = document.getElementById("continueButton");
const repeatButton = document.getElementById("repeatButton");
const menuOverlay = document.getElementById("menuOverlay");
const settingsButton = document.getElementById("settingsButton");

const restoreButton = document.getElementById("restoreSettings");
const applyButton = document.getElementById("applySettings");
const settingsInputs = document.getElementsByClassName("settingsInput");

const imgHolder = document.querySelector(".imgHolder");
const nicknameInput = document.getElementById("nicknameInput");

const alertBase = document.querySelector(".alert");
const closeAlertBtn = document.getElementById("closeAlert");
const sendScoreBtn = document.getElementById("sendScore");



//Переменные
let currentStorage = getStorage(); //Хранилище с настройками тетриса
let lengthOfTable = 10; //Количество рекордсменов
let typesOfBreak = {
    start: "start",
    pause: "pause",
    end: "end"
}

let nickname = "";
let isValidAlert = false;













//Основная часть
if (listOfRecords) fillTheTable(lengthOfTable); //Заполнить рекордсменов

startButton.onclick = startTheGame;
repeatButton.onclick = repeatTheGame;
continueButton.onclick = changePause;
restoreButton.onclick = clearTheStorage;
applyButton.onclick = applyTheSettings;
settingsButton.onclick = openSetting;

nicknameInput.oninput = verifyNickname; //Проверка алёрта
sendScoreBtn.onclick = uploadScore;
closeAlertBtn.onclick = endGame;



document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && isGameStarted) {
        changePause();
    }
})

fillPlaceholders();



//#region Функции

function fillTheTable(count) {
    //const allScores = getScores();
    const sortedScores = sortData(listOfRecords);
    let a = 0;

    for (let i = 0; i < count; i++) {
        let newLi = document.createElement("li");
        let item = sortedScores[i];
        newLi.textContent = item[0] + ": " + item[1];
        scoresTable.append(newLi);
    }
}

function sortData(list) {
    let inputArr = [];
    for (let item in list) {
        inputArr.push([list[item]["name"], list[item]["score"]]);
    }
    let len = inputArr.length - 1;
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < len; i++) {
            if (inputArr[i][1] < inputArr[i + 1][1]) {
                let tmp = inputArr[i];
                inputArr[i] = inputArr[i + 1];
                inputArr[i + 1] = tmp;
                swapped = true;
            }
        }
    } while (swapped);
    return inputArr;
}

function startTheGame() {
    Init();
    hideMenu();
    hideImg();
}

function repeatTheGame() {
    ClearGame();
    hideMenu();
    hideImg();
}


function hideMenu() {
    menuOverlay.hidden = true;
}

function openMenu() {
    menuOverlay.hidden = false;
}

function hideImg() {
    imgHolder.hidden = true;
}

function switchMenu(state, type) {
    if (type === typesOfBreak.pause) {
        startButton.hidden = true;
        repeatButton.hidden = true;
        continueButton.hidden = false;
    }
    if (type === typesOfBreak.end) {
        startButton.hidden = true;
        repeatButton.hidden = false;
        continueButton.hidden = true;
    }
    if (state) { openMenu(); } else { hideMenu(); }
}

function changePause() {
    isPaused = !isPaused;
    switchMenu(isPaused, typesOfBreak.pause);
}

function applyTheSettings() {
    for (let input of settingsInputs) {
        if (input.value != "") changeSettingsItem(input.id, input.value);
    }
    mainMenuHolder.hidden = false;
    settingsHolder.hidden = true;
}

function openSetting() {
    mainMenuHolder.hidden = true;
    settingsHolder.hidden = false;
}

function fillPlaceholders() {
    for (let input of settingsInputs) {
        input.placeholder = currentStorage[input.id];
    }
}



//#region Функции Алёрта
export function initAlert() {
    showAlert();
}

function uploadScore() {
    if (isValidAlert) {
        updateDatabase(score, nickname);
        endGame();
    }
}

function endGame() {
    hideAlert();
    switchMenu(true, typesOfBreak.end);
}

function verifyNickname(e) {
    let input = e.target;
    let val = e.target.value;
    const format = /[ `!@#$%^&*()+\=\[\]{};':"\\|,.<>\/?~]/;
    let isFormatted = !val.match(format);
    isValidAlert = val.length >= 3 && val.length <= 16 && isFormatted;
    if (isValidAlert) {
        input.style.color = "black";
        nickname = val;
    } else {
        input.style.color = "red"
    }
    console.log(isFormatted);
}


function showAlert() {
    alertBase.hidden = false;
}

function hideAlert() {
    alertBase.hidden = true;
}
//#endregion



//#endregion