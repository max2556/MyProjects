import { updateDatabase } from "./databaseScript.js";
import { initAlert } from "./frontendScipt.js";
import { cellSize, traceBlockColor, backgroundColor, emptyColor, deltaLight, border, gradientBlocks, colors } from "./storageScipt.js";


const canvas = document.getElementById("mainField");
canvas.width = cellSize * 10;
canvas.height = cellSize * 20;
const context = canvas.getContext('2d');
context.fillStyle = backgroundColor;
context.fillRect(0, 0, canvas.width, canvas.height);

const savedCanvas = document.getElementById("savedField");
savedCanvas.width = cellSize * 4;
savedCanvas.height = cellSize * 2;
const savedContext = savedCanvas.getContext("2d");
savedContext.fillStyle = emptyColor;
savedContext.fillRect(0, 0, savedCanvas.width, savedCanvas.height);

const nextCanvas = document.getElementById("nextField");
nextCanvas.width = cellSize * 4;
nextCanvas.height = cellSize * 2;
const nextContext = nextCanvas.getContext("2d");
nextContext.fillStyle = emptyColor;
nextContext.fillRect(0, 0, nextCanvas.width, nextCanvas.height);


const scoreDiv = document.getElementById("score");
const rowDiv = document.getElementById("row");
const levelDiv = document.getElementById("level");


//#region Переменные

let touchscreen_x = 0;
let touchscreen_y = 0;
const touchscreen_minMove = 20;


let timer = 0;
const timeToReact = 1;



const cs = cellSize;

const map_width = 10;
const map_height = 20;


let def_dropRate = 2;
let dropRate = def_dropRate;
const maxDropRate = 10;
const drawFrameRate = 60;

const _PI = Math.PI;
const defL = Math.sqrt(2); //
const defA = 1 / 4;



/*
let patterns = [
    [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }], // I pattern = straight line
    [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 1 }], // T pattern = 'T' letter, but shorter
    [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }], // Z pattern = 'Z' letter, but flat
    [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 2 }], // Z_right = mirrored z_left
    [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }], //L letter
    [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 1 }], //Mirrored L letter
    [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }], //cube block 2*2
];*/
/*
const patterns = [
    [{ x: 0, y: -1 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }], // I pattern = straight line
    [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }], // T pattern = 'T' letter, but shorter
    [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }], // Z pattern = 'Z' letter, but flat
    [{ x: 0, y: -1 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }], // Z_right = mirrored z_left
    [{ x: 0, y: -1 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }], //L letter
    [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }], //Mirrored L letter
    [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }], //cube block 2*2
];
*/
/*
const patterns = [
    [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }], 
    [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }], 
    [{ x: 0, y: -1 }, { x: 0, y: 0 }, { x: -1, y: 0 }, { x: -1, y: -1 }],
    [{ x: -1, y: -1 }, { x: 0, y: -1 }, { x: 0, y: 0 }, { x: 1, y: 0 }],
    [{ x: -1, y: 1 }, { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }], 
    [{ x: 0, y: -1 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 1 }], 
    [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }]
];
*/



const patterns = [
    [
        [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }], //I
        [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }], //T
        [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }], //Z
        [{ x: -1, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 0 }, { x: 1, y: 0 }], //Z revers
        [{ x: -1, y: 1 }, { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }], //L
        [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }], //L revers
        [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }] //cube
    ],
    [
        [{ x: 0, y: -1 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }], //I
        [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }], //T
        [{ x: 0, y: -1 }, { x: 0, y: 0 }, { x: -1, y: 0 }, { x: -1, y: 1 }], //Z
        [{ x: 0, y: -1 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }], //Z revers
        [{ x: 0, y: -1 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: -1, y: -1 }], //L
        [{ x: 0, y: -1 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 1 }], //L revers
        [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }] //cube
    ],
    [
        [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }], //I
        [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }], //T
        [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }], //Z
        [{ x: -1, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 0 }, { x: 1, y: 0 }], //Z revers
        [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: -1 }], //L
        [{ x: -1, y: -1 }, { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }], //L revers
        [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }] //cube
    ],
    [
        [{ x: 0, y: -1 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }], //I
        [{ x: 1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }], //T
        [{ x: 0, y: -1 }, { x: 0, y: 0 }, { x: -1, y: 0 }, { x: -1, y: 1 }], //Z
        [{ x: 0, y: -1 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }], //Z revers
        [{ x: 0, y: -1 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }], //L
        [{ x: 0, y: -1 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: -1 }], //L revers
        [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }] //cube
    ],


]

let map = [];








export let score = 0;
let rows = 0;
let level = 0;

let score_delta = 100;

//#endregion



//#region Основная часть

map = new Array(map_height).fill(null).map(function(num) { return new Array(map_width).fill(null) });
let currentBlock = CreateNewBlock();
let savedBlock = null;
let nextBlock = CreateNewBlock();
DrawNextBlock(nextBlock, nextContext);
let counter = 0;
let isAlreadySwitched = false;

if (isGameStarted && !isLose && !isPaused) {
    Init();
}


//#endregion


//#region Функции

document.addEventListener("keydown", (e) => {
    if (isGameStarted && !isLose && !isPaused) {
        if (e.code === "KeyA") {
            LeftMove();
        }
        if (e.code === "KeyD") {
            RightMove();
        }
        if (e.code === "KeyS") {
            DownMove();

        }
        if (e.code === "KeyR") {

            RotateBlock(currentBlock);
        }
        if (e.code === "Space") {
            if (!isAlreadySwitched) SwitchBlocks();
        }
    }
})

document.addEventListener("touchstart", (e) => {
    touchscreen_x = e.changedTouches[0].screenX;
    touchscreen_y = e.changedTouches[0].screenY;
    e.preventDefault();
})
document.addEventListener("touchend", (e) => {
    let nx = e.changedTouches[0].screenX;
    let ny = e.changedTouches[0].screenY;
    let dx = nx - touchscreen_x;
    let dy = ny - touchscreen_y;
    let absX = Math.abs(dx);
    let absY = Math.abs(dy);
    if ((absX > touchscreen_minMove || absY > touchscreen_minMove)) {
        if (absX > absY) {
            if (dx < 0) LeftMove();
            else RightMove()

        } else {
            if (dy > 0) DownMove();
        }
    } else {
        RotateBlock(currentBlock);
    }
    e.preventDefault();
})




function LeftMove() {
    //ClearBlockWay(currentBlock);
    for (let part of currentBlock.pattern) {
        if (!(currentBlock.x + part.x - 1 >= 0 && map[currentBlock.y + part.y][currentBlock.x + part.x - 1] == null)) return false;
    }

    currentBlock.x -= 1;
    DrawBlock(currentBlock);
    currentBlock.prevX = currentBlock.x;
}

function RightMove() {
    //ClearBlockWay(currentBlock);
    for (let part of currentBlock.pattern) {
        if (!(currentBlock.x + part.x + 1 < map_width && map[currentBlock.y + part.y][currentBlock.x + part.x + 1] == null)) return false;
    }
    currentBlock.prevX = currentBlock.x;

    DrawBlock(currentBlock);
    currentBlock.x += 1;
}

function DownMove() {
    //ClearBlockWay(currentBlock);
    let isNeedDown = true;
    for (let part of currentBlock.pattern) {
        if (map[currentBlock.y + part.y + 1] === undefined || map[currentBlock.y + part.y + 1][currentBlock.x + part.x] !== null || part.y + 1 > map_height) isNeedDown = false;
    }
    if (isNeedDown) {
        currentBlock.y++;
        DrawBlock(currentBlock);
        currentBlock.prevY = currentBlock.y;
    } else {
        AfterMoveDown();
    }
}

function AfterMoveDown() {
    if (timer >= timeToReact) {
        CheckForLose(currentBlock);
        if (!isLose) {
            SoliditifyBlock(currentBlock);
            CheckForRow(map);
            currentBlock = nextBlock;
            nextBlock = CreateNewBlock();
            DrawNextBlock(nextBlock, nextContext);
            isAlreadySwitched = false;
        }
        timer = 0;
    } else {
        timer++;
    }
}


function Game() {
    if (isGameStarted && !isLose && !isPaused) {
        if (currentBlock) {
            DownMove();
        }
    }
    setTimeout(Game, 1000 / dropRate);
}




export function Init() {
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
    isGameStarted = true;
    DrawAll(map);
    setInterval(Draw_interval, 1000 / drawFrameRate);
    Game();
}

function Draw_interval() {
    DrawAll(map);
    TraceBlock(currentBlock);
    DrawBlock(currentBlock);


}

export function ClearGame() {
    map = new Array(map_height).fill(null).map(function(num) { return new Array(map_width).fill(null) });
    currentBlock = CreateNewBlock();
    savedBlock = null;
    nextBlock = CreateNewBlock();
    counter = 0;
    isAlreadySwitched = false;
    isLose = false;
    isPaused = false;
    isGameStarted = true;
    score = 0;
    scoreDiv.textContent = 0;
    rows = 0;
    rowDiv.textContent = 0;
    level = 0;
    levelDiv.textContent = 0;
    dropRate = def_dropRate;
}


function Draw(x, y, state, ctx) {
    if (ctx === undefined) ctx = context;
    let color;
    if (state === undefined || state === null) { color = emptyColor } else { color = state; }
    ctx.fillStyle = color;
    ctx.fillRect(x * cs, y * cs, cs - border, cs - border);
}


function DrawAll(map) {
    for (let y = 0; y < map_height; y++) {
        for (let x = 0; x < map_width; x++) {
            Draw(x, y, map[y][x]);
        }
    }
}

function DrawBlock(block) {

    let i = -1;
    let color;
    for (let part of block.pattern) {
        let y = block.y + part.y;
        let x = block.x + part.x;
        let colorArray = block.color.split(",");
        let defLightString = colorArray[2];
        defLightString = defLightString.substring(1, defLightString.length - 2);
        let defLight = eval(defLightString);
        let lightness;
        if (defLight + i * deltaLight < 100)
            lightness = ", " + (defLight + i * deltaLight) + "%)";
        else lightness = ", 100%)";
        if (defLight + i * deltaLight > 0)
            lightness = ", " + (defLight + i * deltaLight) + "%)";
        else lightness = ", 0%)";
        if (gradientBlocks) color = colorArray[0] + "," + colorArray[1] + lightness;
        else color = block.color;
        Draw(x, y, color);
        i++;
    }

}

function ClearBlockWay(block) {
    for (let part of block.pattern) {
        let y = block.prevY + part.y;
        let x = block.prevX + part.x;
        Draw(x, y);
    }
}


function DrawSavedBlock(block, ctx) {
    ctx.fillStyle = emptyColor;
    ctx.fillRect(0, 0, 4 * cellSize, 2 * cellSize);
    for (let part of patterns[0][block.patternType]) {
        let y = part.y;
        let x = part.x + 1;

        Draw(x, y, block.color, ctx);
    }
}

function DrawNextBlock(block, ctx) {
    ctx.fillStyle = emptyColor;
    ctx.fillRect(0, 0, 4 * cellSize, 2 * cellSize);
    for (let part of block.pattern) {
        let y = part.y;
        let x = part.x + 1;

        Draw(x, y, block.color, ctx);
    }
}



function CreateNewBlock() {
    const patternType = Math.floor(Math.random() * patterns[0].length);
    const _pattern = patterns[0][patternType].slice();
    const color = colors[Math.floor(Math.random() * colors.length)];
    let x = Math.floor(Math.random() * (map_width - 5) + 2);
    let y = 0;

    return {
        pattern: _pattern,
        pattern_default: _pattern,
        patternType: patternType,
        color: color,
        x: x,
        y: y,
        prevX: x,
        prevY: y,
        rotation: 0
    }
}

function SoliditifyBlock(block) {
    let i = -1;
    let color;
    for (let part of block.pattern) {
        let y = block.y + part.y;
        let x = block.x + part.x;
        let colorArray = block.color.split(",");
        let defLightString = colorArray[2];
        defLightString = defLightString.substring(1, defLightString.length - 2);
        let defLight = eval(defLightString);
        let lightness;
        if (defLight + i * deltaLight < 100)
            lightness = ", " + (defLight + i * deltaLight) + "%)";
        else lightness = ", 100%)";
        if (defLight + i * deltaLight > 0)
            lightness = ", " + (defLight + i * deltaLight) + "%)";
        else lightness = ", 0%)";
        if (gradientBlocks) color = colorArray[0] + "," + colorArray[1] + lightness;
        else color = block.color;
        map[y][x] = color;
        i++;
    }
    //DrawAll(map);
}


function CheckForLose(block) {
    for (let part of block.pattern) {
        if (part.y + block.y <= 0) {
            isLose = true;
            console.log("You lose!");
            initAlert();
            return true;
        }
    }
}

function CheckForRow(map) {
    let mult = 1;
    let prevRows = rows;
    for (let y = 0; y < map_height; y++) {
        const row = map[y];
        let result = true;
        for (let x = 0; x < row.length; x++) {
            const el = row[x];
            if (el === null) result = false;
        }
        if (result) {
            row.fill(null);
            for (let i = y; i >= 0; i--) {
                if (i === 0) { map[0] = [null, null, null, null, null, null, null, null, null, null]; } else {
                    map[i] = map[i - 1];
                }
            }
            score += score_delta * mult * (level + 1);
            mult += 0.5;
            rows++;
            DrawAll(map);
        }
    }
    if (Math.floor(rows / 4) - Math.floor(prevRows / 4) !== 0 && dropRate + 1 < maxDropRate) {
        dropRate++;
        level++
    }
    scoreDiv.textContent = score;
    rowDiv.textContent = rows;
    levelDiv.textContent = level;
}


function RotateBlock(block) {
    for (let i = 0; i < 4; i++) {
        let x = patterns[(block.rotation + 1) % 4][block.patternType][i].x;
        let y = patterns[(block.rotation + 1) % 4][block.patternType][i].y;
        if (!(currentBlock.x + x < map_width && currentBlock.x + x >= 0 && map[currentBlock.y + y] !== undefined && map[currentBlock.y + y][currentBlock.x + x] == null)) return false;
    }
    block.rotation = (block.rotation + 1) % 4;
    let newPattern = patterns[block.rotation][block.patternType].slice();
    block.pattern = newPattern;
}

function SwitchBlocks() {
    if (savedBlock === null) {
        savedBlock = currentBlock;
        currentBlock = nextBlock;
        nextBlock = CreateNewBlock();
        DrawSavedBlock(savedBlock, savedContext);

        return false;
    }
    let buffer = currentBlock;
    currentBlock = savedBlock;
    currentBlock.y = 0;
    savedBlock = buffer;
    isAlreadySwitched = true;
    //if (savedBlock !== null) 
    DrawSavedBlock(savedBlock, savedContext);
}



function TraceBlock(block) {
    let isCollide = false;
    let blockCopy = JSON.parse(JSON.stringify(block));;
    blockCopy.color = traceBlockColor;
    while (!isCollide) {
        for (let part of blockCopy.pattern) {
            if (map[blockCopy.y + part.y + 1] === undefined || map[blockCopy.y + part.y + 1][blockCopy.x + part.x] !== null || part.y + 1 > map_height) isCollide = true;
        }
        if (!isCollide) {
            blockCopy.y += 1;
        }
    }
    blockCopy.prevY = blockCopy.y;
    //ClearBlockWay(blockCopy);
    for (let part of blockCopy.pattern) {
        let y = blockCopy.y + part.y;
        let x = blockCopy.x + part.x;
        Draw(x, y, blockCopy.color);
    }
}





//#endregion