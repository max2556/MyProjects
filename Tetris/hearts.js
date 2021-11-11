let heartDefault = document.getElementById("heart-svg");
let count = 10;
let rows = 5;
let baseX = 0;
let baseY = 0;
let rowY = 150;
let deltaX = 100;
let deltaY = 0;
let randomX = 50;
let randomY = 100;
let arr = [heartDefault];


const screenW = window.innerWidth;
const screenH = window.innerHeight;

let vars = calculateVar(screenW, screenH, count, rows);
rowY = vars.rowY;
deltaX = vars.deltaX;
deltaY = vars.deltaY;
randomX = vars.randomX;
randomY = vars.randomY;



//setDuration(hearts);
spawnHearts(count, rows)

function setDuration(el, duration) {

    el.firstElementChild.style["animation-duration"] = duration + "ms";
    el.firstElementChild.getAnimations()[0]["currentTime"] += Math.random() * duration;

}

function spawnHearts(columns, rows) {
    applyTransform(heartDefault, 0, 0);
    setDuration(heartDefault, heartsAnimDuration)
    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < columns; i++) {
            arr.push(heartDefault.cloneNode(true));
            const element = arr[j * columns + i];
            applyTransform(element, i, j);
            heartDefault.after(element);
            setDuration(element, heartsAnimDuration);

        }
    }
}

function applyTransform(heart, col, row) {
    let x = baseX + deltaX * col + Math.floor(Math.random() * randomX - randomX / 2);
    let y = baseY + rowY * row + deltaY * col + Math.floor(Math.random() * randomY - randomY / 2);
    let rotation = Math.floor(Math.random() * 360);
    let resString = `translate(${x}px,${y}px) rotate(${rotation}deg)`
    heart.style.transform = resString;
}

function calculateVar(W, H, col, row) {
    let dW = W / col;
    let dH = H / row;
    let dX = dW,
        ranX = dW;
    let ranY = dH;
    let rowY = dH;
    return {
        deltaX: dX,
        deltaY: 0,
        randomX: ranX,
        randomY: ranY,
        rowY: rowY
    }
}