const canvas = document.getElementsByTagName("canvas")[0];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext('2d');


//#region Переменные

const cellSize = 20;
const cs = cellSize;

const X_count = 80;
const Y_count = 50;

let hslMultiplier = 2.5;

const blocks = {
    empty: null,
    obstacle: "obstacle"
};

let colors = {
    0: "red", //красный
    1: "orange", //оранжевый
    2: "yellow", //желтый
    3: "rgb(0, 230, 0)", //зеленый
    4: "rgb(0, 255, 204)", //голубой
    5: "rgb(0, 51, 204)", //синий
    6: "purple", //фиолетовый
    "endPoint": "white",
    "obstacle": "black",
    //"path": "rgb(0,255,0)"
    "path": "rgb(255,255,255)"
};

const answers = {
    0: "red", //красный
    1: "orange", //оранжевый
    2: "yellow", //желтый
    3: "green", //зеленый
    4: "light-blue", //голубой
    5: "dark-blue", //синий
    6: "purple", //фиолетовый
};


let startPoint = {
    x: 75,
    y: 19,
    path: []
};

let endPoint = {
    x: 2,
    y: 3
};

const buildModes = {
    'startPoint': 0,
    'endPoint': 1,
    'obstacles': 2
}

const fillModes = {
    static: 0,
    gradient: 1
}

let currentMode = buildModes.startPoint;
let fillMode = fillModes.gradient;



let map = [];
let isReachable = false;



let stack = [];

let path = [];



//#endregion


//#region Инициализация кнопок
const buttonStart = document.getElementById('start');
const buttonEnd = document.getElementById('end');
const buttonObstacle = document.getElementById('obstacle');

const display = document.getElementById('modeDisplay');


buttonStart.onclick = function() {
    currentMode = buildModes.startPoint;
    display.textContent = 'Поставьте стартовую точку';
}
buttonEnd.onclick = function() {
    currentMode = buildModes.endPoint;
    display.textContent = 'Поставьте конечную точку';
}
buttonObstacle.onclick = function() {
    currentMode = buildModes.obstacles;
    display.textContent = 'Поставьте препятствие';
}

//#endregion


//#region Основная часть

for (let y = 0; y < Y_count; y++) {
    let newRow = [];
    for (let x = 0; x < X_count; x++) {
        newRow.push(blocks.empty);
        draw(x, y)
    }
    map.push(newRow);
}

putObstaclesOnMap();

doCast();


//#endregion


//#region Функции

canvas.onclick = mouse;



function mouse(e) {
    const x = e.clientX;
    const y = e.clientY;
    const cellX = Math.floor(x / cellSize);
    const cellY = Math.floor(y / cellSize);

    if (cellX >= 0 && cellX <= X_count) {
        if (cellY >= 0 && cellY <= Y_count) {
            if (currentMode === buildModes.startPoint) {
                startPoint = { x: cellX, y: cellY, path: [] };

            }
            if (currentMode === buildModes.endPoint) {
                endPoint = { x: cellX, y: cellY };

            }
            if (currentMode === buildModes.obstacles) {
                if (map[cellY][cellX] === blocks.obstacle) {
                    for (let i = 0; i < obstacles.length; i++) {
                        const el = obstacles[i];
                        if (el.x === cellX && el.y === cellY) { obstacles.splice(i, 1); }
                    }
                } else {
                    obstacles.push({ x: cellX, y: cellY });
                }


            }
            clearMap();
            putObstaclesOnMap();
            doCast();
        }
    }
}

function doCast() {
    stack = [];

    isReachable = false;
    stack.push([startPoint, undefined]);

    while (stack.length > 0 && stack.length < 1000) {
        const step = stack.shift();
        waveCasting_steps(step[0], step[1]);

        if (step[0].x === endPoint.x && step[0].y === endPoint.y) {
            stack = [];
            let x = step[0].x;
            let y = step[0].y;
            waveCasting_steps(step[0], step[1]);
            draw(x, y, 'endPoint');
            isReachable = true;
            path = step[0].path;
            console.log(path);
        }
        //waveCasting_steps(step[0], step[1]);
    }

    if (isReachable) {
        console.log("Добрался");
    } else {
        console.log("Не добраться");
    }

    drawPath();
}


function putObstaclesOnMap() {
    for (let i = 0; i < obstacles.length; i++) {
        const el = obstacles[i];
        map[el.y][el.x] = blocks.obstacle;
        draw(el.x, el.y, blocks.obstacle);
    }
}


function clearMap() {
    for (let y = 0; y < Y_count; y++) {
        for (let x = 0; x < X_count; x++) {
            map[y][x] = null;
            draw(x, y);
        }
    }
}


function draw(x, y, state) {
    let color;

    if (fillMode === fillModes.static) {
        if (state === undefined) {
            color = "rgb(77, 77, 77)"; //white
        } else color = colors[state % 7];
    }
    if (fillMode === fillModes.gradient) {
        if (state === undefined) {
            color = "rgb(77, 77, 77)"; //grey
        } else color = "hsl(" + state * hslMultiplier % 360 + ",100%,50%)";
    }

    if (state === "endPoint") { color = "white" };
    if (state === "obstacle") { color = "black" };
    if (state === "path") { color = colors[state] };

    context.fillStyle = color;
    context.fillRect(x * cs, y * cs, cs - 1, cs - 1);
}


function waveCasting_steps(point, prevPoint) {
    let x = point.x;
    let y = point.y;


    if (map[y][x] === blocks.obstacle) { return false; }
    if (map[y][x] !== null) {
        map[y][x] = (map[y][x] + map[prevPoint.y][prevPoint.x]) / 2;
        return false;
    }

    if (prevPoint !== undefined) {
        let px = prevPoint.x;
        let py = prevPoint.y;
        map[y][x] = map[py][px] + 1;

        point.path = [...prevPoint.path, point];
    } else { map[y][x] = 0; }


    draw(x, y, map[y][x]);

    let leftPoint = { x: x - 1, y: y };
    let rightPoint = { x: x + 1, y: y };
    let topPoint = { x: x, y: y - 1 };
    let bottomPoint = { x: x, y: y + 1 };

    if (map[y] !== undefined && map[y][x - 1] !== undefined) stack.push([leftPoint, point]);
    if (map[y] !== undefined && map[y][x + 1] !== undefined) stack.push([rightPoint, point]);
    if (map[y - 1] !== undefined && map[y - 1][x] !== undefined) stack.push([topPoint, point]);
    if (map[y + 1] !== undefined && map[y + 1][x] !== undefined) stack.push([bottomPoint, point]);
}


function drawPath() {
    for (let cell of path) {
        draw(cell.x, cell.y, "path");
    }
}

//#endregion