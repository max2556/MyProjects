//Переменные указывающие состояние игры: старт, поражение, пауза
let isGameStarted = true;
let isLose = false;
let isPaused = false;



//Стандартные значения переменных, можно редактировать
let defaultSettings = {
    "cellSize": 40,
    "traceBlockColor": "#888888",
    "backgroundColor": "#444444",
    "emptyColor": "#444444",
    "deltaLight": 5,
    "border": 5,
    "gradientBlocks": false,
    "colors": [
        "hsl(0, 100%, 50%)",
        "hsl(30, 100%, 60%)",
        "hsl(50, 100%, 50%)",
        "hsl(110, 100%, 50%)",
        "hsl(180, 100%, 50%)",
        "hsl(230, 100%, 65%)",
        "hsl(285, 100%, 50%)"
    ]
};





//-----
//ВСЁ, ЧТО НИЖЕ - ЛУЧШЕ НЕ МЕНЯТЬ(ИЛИ ПРОКОНСУЛЬТИРОВАТЬСЯ СО СПЕЦИАЛИСТОМ)
//-----

//Переменные используемые в коде!!! Не менять их имени ни в коем разе, иначе - КРИНДЕЦ!!!!
let cellSize, traceBlockColor, backgroundColor, emptyColor, deltaLight, border, gradientBlocks, colors;
checkForSettingsInLocalStorage();


//Процедура, которая задает переменным из 2-й строчки значения
//Не менять!!
function checkForSettingsInLocalStorage() {
    let storage = localStorage.getItem("settings");
    if (storage === null) {
        localStorage.setItem("settings", JSON.stringify(defaultSettings));
        storage = defaultSettings;
    } else { storage = JSON.parse(storage); }
    cellSize = storage.cellSize;
    traceBlockColor = storage.traceBlockColor;
    backgroundColor = storage.backgroundColor;
    emptyColor = storage.emptyColor;
    deltaLight = storage.deltaLight;
    border = storage.border;
    gradientBlocks = storage.gradientBlocks;
    colors = storage.colors;

}

//Метод меняет значение какой-нибудь штуки в настройках
//Можно использовать для какой-нибудь менюшки настроек, чтобы пользователь мог менять параметры на свой вкус
function changeSettingsItem(itemName, itemValue) {
    let storage = JSON.parse(localStorage.getItem("settings"));
    storage[itemName] = itemValue;
    localStorage.setItem("settings", JSON.stringify(storage));
}