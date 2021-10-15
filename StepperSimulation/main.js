const canvas = document.getElementsByTagName("canvas")[0];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext('2d');
initCanvas();

const clock = "clock";
const clockwise = "clockwise";


let objects = [];

const firstStepperPosition = {
    x: 70,
    y: 70
};
const secondStepperPosition = {
    x: canvas.width - 70,
    y: 70
};
const drawObjPosition = {
    x: canvas.width / 2,
    y: canvas.height / 2
}


const firstStepper = new Stepper(2048, 5, firstStepperPosition);
const secondStepper = new Stepper(2048, 5, secondStepperPosition);

const firstWire = new Wire(firstStepper);
const secondWire = new Wire(secondStepper);

const drawingObj = new DrawingObj(drawObjPosition, firstWire, secondWire);


const controller = new Controller(firstStepper, secondStepper, firstWire, secondWire, drawingObj);

objects.push(firstWire);
objects.push(secondWire);
objects.push(firstStepper);
objects.push(secondStepper);
objects.push(drawingObj);

setInterval(drawingObj.pushPosToPath, 1000 / drawingObj.pathFrequency);
setInterval(controller.invokeMoving, 1000 / controller.frequency)
setInterval(drawAll, 1000 / controller.frequency)

drawAll();





document.addEventListener("keydown", (e) => {
    if (e.key == "1") {
        firstStepper.doStep(clock);
        console.log("First stepper:" + firstStepper.steps);
    }
    if (e.key == "2") {
        firstStepper.doStep(clockwise);
        console.log("First stepper:" + firstStepper.steps);
    }
    if (e.key == "3") {
        secondStepper.doStep(clock);
        console.log("Second stepper:" + secondStepper.steps);
    }
    if (e.key == "4") {
        secondStepper.doStep(clockwise);
        console.log("Second stepper:" + secondStepper.steps);
    }
    drawAll();
})
canvas.onclick = (e) => {
    const x = e.clientX;
    const y = e.clientY;

    const point = { x: x, y: y };
    controller.targetPoint = point;
    controller.awake = true;

};













function drawAll() {
    clearScreen();
    for (let drawableObj of objects) {
        drawableObj.draw(context);
    }
    drawingObj.drawPath(context);
}

function initCanvas() {
    clearScreen();
}

function clearScreen() {
    let w = canvas.width;
    let h = canvas.height;
    context.fillStyle = "#cccccc";
    context.fillRect(0, 0, w, h);
}