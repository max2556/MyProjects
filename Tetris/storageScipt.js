//-----
//ВСЁ, ЧТО НИЖЕ - ЛУЧШЕ НЕ МЕНЯТЬ(ИЛИ ПРОКОНСУЛЬТИРОВАТЬСЯ СО СПЕЦИАЛИСТОМ)
//-----
let storageKey = "settings";



//Переменные используемые в коде!!! Не менять их имени ни в коем разе, иначе - КРИНДЕЦ!!!!
export let cellSize, traceBlockColor, backgroundColor, emptyColor, deltaLight, border, gradientBlocks, colors;
checkForSettingsInLocalStorage();


//Процедура, которая задает переменным из 2-й строчки значения
//Не менять!!
function checkForSettingsInLocalStorage() {
    let storage = localStorage.getItem(storageKey);
    if (storage === null) {
        localStorage.setItem(storageKey, JSON.stringify(defaultSettings));
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
export function changeSettingsItem(itemName, itemValue) {
    let storage = JSON.parse(localStorage.getItem(storageKey));
    storage[itemName] = itemValue;
    localStorage.setItem(storageKey, JSON.stringify(storage));
}

export function clearTheStorage() {
    localStorage.removeItem(storageKey);
}

export function getStorage() {
    return JSON.parse(localStorage.getItem(storageKey));
}