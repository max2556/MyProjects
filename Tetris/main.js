const cellSize = 40;





const canvas = document.getElementById("mainField");
canvas.width = cellSize * 10;
canvas.height = cellSize * 20;
const context = canvas.getContext('2d');


const savedCanvas = document.getElementById("savedField");
savedCanvas.width = cellSize * 5;
savedCanvas.height = cellSize * 5;
const savedContext = savedCanvas.getContext("2d");

const nextCanvas = document.getElementById("nextField");
nextCanvas.width = cellSize * 5;
nextCanvas.height = cellSize * 5;
const nextContext = nextCanvas.getContext("2d");





//#region Переменные


const cs = cellSize;

const map_width = 10;
const map_height = 20;


const frameRate = 2;
const drawFrameRate = 60;

const _PI = Math.PI;
const defL = Math.sqrt(2); //
const defA = 1 / 4;


let colors = [
    "red", //красный
    "orange", //оранжевый
    "yellow", //желтый
    "rgb(0, 230, 0)", //зеленый
    "rgb(0, 255, 204)", //голубой
    "rgb(25, 76, 224)", //синий
    "#ff20ff", //фиолетовый
];


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



let isGameStarted = true;
let isLose = false;
let isPaused = false;




let score = 0;

let score_delta = 100;

//#endregion



//#region Основная часть

map = new Array(map_height).fill(null).map(function(num) { return new Array(map_width).fill(null) });
let currentBlock = CreateNewBlock();
let savedBlock = null;
let nextBlock = CreateNewBlock();
let counter = 0;
let isAlreadySwitched = false
Init();
setInterval(Game, 1000 / frameRate);
setInterval(Draw_interval, 1000 / drawFrameRate);

//#endregion


//#region Функции

document.addEventListener("keypress", (e) => {
    if (isGameStarted && !isLose && !isPaused) {
        if (e.key.toLocaleLowerCase() === "a" || e.key.toLocaleLowerCase() === "ф") {
            for (let part of currentBlock.pattern) {
                if (!(currentBlock.x + part.x - 1 >= 0 && map[currentBlock.y + part.y][currentBlock.x + part.x - 1] == null)) return false;
            }
            currentBlock.x -= 1;
        }
        if (e.key.toLocaleLowerCase() === "d" || e.key.toLocaleLowerCase() === "в") {
            for (let part of currentBlock.pattern) {
                if (!(currentBlock.x + part.x + 1 < map_width && map[currentBlock.y + part.y][currentBlock.x + part.x + 1] == null)) return false;
            }
            currentBlock.x += 1;
        }
        if (e.key.toLocaleLowerCase() === "s" || e.key.toLocaleLowerCase() === "ы") {

            let isNeedDown = true;
            for (let part of currentBlock.pattern) {
                if (map[currentBlock.y + part.y + 1] === undefined || map[currentBlock.y + part.y + 1][currentBlock.x + part.x] !== null || part.y + 1 > map_height) isNeedDown = false;
            }
            if (isNeedDown) { currentBlock.y++; } else {
                CheckForLose(currentBlock);
                if (!isLose) {
                    SoliditifyBlock(currentBlock);
                    CheckForRow(map);
                    currentBlock = nextBlock;
                    nextBlock = CreateNewBlock();
                    isAlreadySwitched = false;
                }
            }

        }
        if (e.key.toLocaleLowerCase() === "r" || e.key.toLocaleLowerCase() === "к") {
            /* for (let part of currentBlock.pattern) {
                 let x = part.y * Math.cos(((currentBlock.rotation + 1) / 2 + defA) * _PI) * defL;
                 let y = part.x * Math.sin(((currentBlock.rotation + 1) / 2 + defA) * _PI) * defL;
                 x = Math.round(x);
                 y = Math.round(y);
                 if (!(currentBlock.x + x < map_width && currentBlock.x + x >= 0 && map[currentBlock.y + y] !== undefined && map[currentBlock.y + y][currentBlock.x + x] == null)) return false;
             }
             currentBlock.rotation += 1;
             let newPattern = [];

             for (let part of currentBlock.pattern) {
                 let newY = part.x * Math.cos((currentBlock.rotation / 2 + defA) * _PI) * defL;
                 let newX = part.y * Math.sin((currentBlock.rotation / 2 + defA) * _PI) * defL;
                 newX = Math.round(newX);
                 newY = Math.round(newY);
                 newPattern.push({ x: newX, y: newY });
             }
             currentBlock.pattern = newPattern;*/

            RotateBlock(currentBlock);
        }
        if (e.key === " ") {
            if (!isAlreadySwitched) SwitchBlocks();
        }
    }
})



function Game() {
    if (isGameStarted && !isLose && !isPaused) {
        if (currentBlock) {
            let isNeedDown = true;
            for (let part of currentBlock.pattern) {
                if (map[currentBlock.y + part.y + 1] === undefined || map[currentBlock.y + part.y + 1][currentBlock.x + part.x] !== null || part.y + 1 > map_height) isNeedDown = false;
            }
            if (isNeedDown) { currentBlock.y++; } else {
                CheckForLose(currentBlock);
                if (!isLose) {
                    SoliditifyBlock(currentBlock);
                    CheckForRow(map);
                    currentBlock = nextBlock;
                    nextBlock = CreateNewBlock();
                    isAlreadySwitched = false;
                }
            }
        }
    }
}




function Init() {
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    DrawAll(map);
}


function Draw(x, y, state, ctx) {
    if (ctx === undefined) ctx = context;

    if (state === undefined || state === null) { color = "#333333" } else { color = colors[state]; }
    ctx.fillStyle = color;
    ctx.fillRect(x * cs, y * cs, cs - 1, cs - 1);
}


function DrawAll(map) {
    for (let y = 0; y < map_height; y++) {
        for (let x = 0; x < map_width; x++) {
            Draw(x, y, map[y][x]);
        }
    }
}

function DrawBlock(block) {
    for (let part of block.pattern) {
        let y = block.y + part.y;
        let x = block.x + part.x;

        Draw(x, y, block.color);
    }
}

function DrawSavedBlock(block, ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 5 * cellSize, 5 * cellSize);
    for (let part of block.pattern) {
        let y = part.y + 1;
        let x = part.x + 2;

        Draw(x, y, block.color, ctx);
    }
}

function DrawNextBlock(block, ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 5 * cellSize, 5 * cellSize);
    for (let part of block.pattern) {
        let y = part.y + 1;
        let x = part.x + 2;

        Draw(x, y, block.color, ctx);
    }
}

function Draw_interval() {
    DrawAll(map);
    DrawBlock(currentBlock);
    DrawNextBlock(nextBlock, nextContext);
    if (savedBlock !== null) DrawSavedBlock(savedBlock, savedContext)
}

function CreateNewBlock() {
    const patternType = Math.floor(Math.random() * patterns.length);
    const _pattern = patterns[0][patternType].slice();
    const color = Math.floor(Math.random() * colors.length);
    let x = Math.floor(Math.random() * (map_width - 5) + 2);
    let y = 0;

    return {
        pattern: _pattern,
        pattern_default: _pattern,
        patternType: patternType,
        color: color,
        x: x,
        y: y,
        rotation: 0
    }
}

function SoliditifyBlock(block) {
    for (let part of block.pattern) {
        let y = block.y + part.y;
        let x = block.x + part.x;
        map[y][x] = block.color;
    }
}


function CheckForLose(block) {
    for (let part of block.pattern) {
        if (part.y + block.y <= 0) {
            isLose = true;
            console.log("You lose!");
            return true;
        }
    }
}

function CheckForRow(map) {
    let mult = 1;
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
            score += score_delta * mult;
            mult += 0.5;
            console.log(score);
        }
    }
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
        currentBlock = CreateNewBlock();
        return false;
    }
    let buffer = currentBlock;
    currentBlock = savedBlock;
    savedBlock = buffer;
    isAlreadySwitched = true;
}


//#endregion