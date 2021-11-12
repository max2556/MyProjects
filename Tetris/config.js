//Переменные указывающие состояние игры: старт, поражение, пауза
let isGameStarted = false;
let isLose = false;
let isPaused = false;
let heartsAnimDuration = 1000;


//Стандартные значения переменных, можно редактировать
let defaultSettings = {
    "cellSize": 40,
    "traceBlockColor": "#888888",
    "backgroundColor": "#bb3366",
    "emptyColor": "#181818",
    "deltaLight": 3,
    "border": 0,
    "gradientBlocks": true,
    "colors": [
        "hsl(0, 100%, 60%)",
        "hsl(30, 100%, 60%)",
        "hsl(50, 100%, 60%)",
        "hsl(110, 100%, 60%)",
        "hsl(180, 100%, 60%)",
        "hsl(230, 100%, 65%)",
        "hsl(285, 100%, 60%)"
    ]
};

//Для загрузки стандартных настроек впишите в консоли браузера localstorage.removeItem("settings");
//И перезагрузите страницу

//Стандарт
/*"colors": [
        "hsl(0, 100%, 80%)",
        "hsl(30, 100%, 80%)",
        "hsl(50, 100%, 80%)",
        "hsl(110, 100%, 80%)",
        "hsl(180, 100%, 80%)",
        "hsl(230, 100%, 85%)",
        "hsl(285, 100%, 80%)"
    ]*/

/*Розовые
"colors": [
        "hsl(300, 100%, 50%)",
        "hsl(305, 100%, 50%)",
        "hsl(310, 100%, 50%)",
        "hsl(295, 100%, 50%)",
        "hsl(315, 100%, 50%)",
        "hsl(320, 100%, 50%)",
        "hsl(290, 100%, 50%)"
    ]
*/