class Stepper {
    speed = 5;


    constructor(steps, delta, speed, position) {
        this.stepsPerRotation = steps;
        this.wireLengthDelta = delta;
        this.maxDelta = delta * 2;
        this.minDelta = 0;

        this.position = position;


        this.speed = speed;
        this.maxSpeed = this.maxDelta / this.wireLengthDelta;
        this.minSpeed = 0;
        this.steps = 0;
    }


    doStep(side) {

        let delta = this.wireLengthDelta * this.speed;
        if (delta > this.maxDelta) delta = this.maxDelta;
        if (delta < this.minDelta) delta = this.minDelta;


        if (side > 0) {
            this.wire.addLength(delta);
            return;
        } else if (side < 0) {
            this.wire.addLength(-delta);
            return;
        }


        if (side === "clock") {
            this.steps++;
            this.wire.addLength(delta);
            return;
        } else if (side === "clockwise") {
            this.steps--;
            this.wire.addLength(-delta);
            return;
        }

        //this.wire.setLength(this.steps * this.delta);
    }

    setSpeed(speed) {
        this.speed = speed;
        if (speed > this.maxSpeed) this.speed = this.maxSpeed;
        if (speed < this.minSpeed) this.speed = this.minSpeed;
    }

    doMultipleStep(side, count) {
        for (let i = 0; i < count; i++) {
            this.doStep(side);
        }
    }

    draw(context) {
        const bodyColor = "rgb(130, 155, 135)";
        const rotorColor = "rgb(217, 202, 130)";

        const bodyRadius = 50;

        const rotorW = 40;
        const rotorH = 20;

        let x = this.position.x;
        let y = this.position.y;

        context.fillStyle = bodyColor;
        context.beginPath();
        context.arc(x, y, bodyRadius, 0, 2 * Math.PI);
        context.fill();
        context.closePath();

        context.fillStyle = rotorColor;
        context.fillRect(x - rotorW / 2, y - rotorH / 2, rotorW, rotorH);


    }

    changeDelta(N) {
        this.wireLengthDelta = N;
        this.maxDelta = N * 2;
        this.minDelta = N / 4;
    }
}