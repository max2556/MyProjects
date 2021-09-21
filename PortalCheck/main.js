const canvas = document.getElementsByTagName("canvas")[0];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext('2d');

const whiteColor = "rgb(222, 215, 230)";
const blackColor = "rgb(13, 10, 36)";
const checkColor = "green";
const errorColor = "red";
const portalColor = "purple";

const cellSize = 40;
const cs = cellSize;

const X_count = 40;
const Y_count = 40;


const drawMode = 0;
const checkMode = 1;



const portalSizeX = 2;
const portalSizeY = 3;


const emptyBlock = 0;
const fillBlock = 1;
const checkBlock = 2;
const errorBlock = 3;
const portalBlock = 4;
//---------------------------------------
var map = [];
var mode = drawMode;

for (let y = 0; y < Y_count; y++) {
    let newRow = [];
    for (let x = 0; x < X_count; x++) {
        newRow.push(emptyBlock);
        draw(x, y)
    }
    map.push(newRow);
}

canvas.onclick = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    const cellX = Math.floor(x / cellSize);
    const cellY = Math.floor(y / cellSize);

    if (cellX >= 0 && cellX <= 40) {
        if (cellY >= 0 && cellY <= 40) {
            if (mode === drawMode) {
                if (map[cellY][cellX] === fillBlock) map[cellY][cellX] = emptyBlock;
                else if (map[cellY][cellX] !== fillBlock) map[cellY][cellX] = fillBlock;
                let cellState = map[cellY][cellX];
                draw(cellX, cellY, cellState);
            } else {
                startAnalysis_1(cellX, cellY);
            }
        }
    }
}


document.getElementById("draw").onclick = changeToDraw;
document.getElementById("check").onclick = changeToCheck;

function changeToDraw() {
    mode = drawMode;
}

function changeToCheck() {
    mode = checkMode;
}

function draw(x, y, state) {
    if (state === undefined) { state = emptyBlock; }
    let color = whiteColor;
    switch (state) {
        case emptyBlock:
            color = whiteColor;
            break;
        case fillBlock:
            color = blackColor;
            break;
        case checkBlock:
            color = checkColor;
            break;
        case errorBlock:
            color = errorColor;
            break;
        case portalBlock:
            color = portalColor;
            break;
        default:
            color = emptyBlock;
            break;
    }
    context.fillStyle = color;
    context.fillRect(x * cs, y * cs, cs - 1, cs - 1);
}

function startAnalysis_1(x, y) {
    let stack = [{ x, y }];

    let startX = x;
    let startY = y;
    let leftTopCorner = {};
    let rightBottomCorner = {};

    let minX = x;
    maxX = x;
    minY = y;
    maxY = y;

    let foundPortal = false;
    let i = 0;
    while (stack.length > 0 || !foundPortal) {
        if (stack.length > 1000) break;
        let currentCell = stack.shift();
        let current_x = currentCell.x;
        let current_y = currentCell.y;
        if (current_x > maxX) maxX = current_x;
        if (current_y > maxY) maxY = current_y;
        if (current_x < minX) minX = current_x;
        if (current_y < minY) minY = current_y;
        if (i > 0 && current_x === startX && current_y === startY) {
            leftTopCorner = { x: minX, y: minY };
            rightBottomCorner = { x: maxX, y: maxY };
            console.log("Подозрение на портал:", leftTopCorner, rightBottomCorner);
            validatePortal(leftTopCorner, rightBottomCorner);
            break;
        }
        i++;
        if (map[current_y][current_x] === fillBlock) {
            map[current_y][current_x] = checkBlock;
            draw(current_x, current_y, checkBlock);
            if (map[current_y][current_x - 1] === fillBlock) stack.push({ x: current_x - 1, y: current_y });
            if (map[current_y][current_x + 1] === fillBlock) stack.push({ x: current_x + 1, y: current_y });
            if (map[current_y - 1][current_x] === fillBlock) stack.push({ x: current_x, y: current_y - 1 });
            if (map[current_y + 1][current_x] === fillBlock) stack.push({ x: current_x, y: current_y + 1 });
        }
        if (map[current_y][current_x] === checkBlock) {
            let k = 0;
            if (map[current_y][current_x - 1] === checkBlock) k++;
            if (map[current_y][current_x + 1] === checkBlock) k++;
            if (map[current_y - 1][current_x] === checkBlock) k++;
            if (map[current_y + 1][current_x] === checkBlock) k++;
            if (k === 2) {
                leftTopCorner = { x: minX, y: minY };
                rightBottomCorner = { x: maxX, y: maxY };
                console.log("Подозрение на портал:", leftTopCorner, rightBottomCorner);
                validatePortal(leftTopCorner, rightBottomCorner);
                break;
            }
        }
    }
}

function validatePortal(LT_corner, RB_corner) {
    let width = RB_corner.x - LT_corner.x - 1;
    let height = RB_corner.y - LT_corner.y - 1;
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            let x = LT_corner.x + 1 + j;
            let y = LT_corner.y + 1 + i;
            if (map[y][x] !== emptyBlock) return false;
        }
    }
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            let x = LT_corner.x + 1 + j;
            let y = LT_corner.y + 1 + i;
            map[y][x] = portalBlock;
            draw(x, y, portalBlock);
        }
    }
}