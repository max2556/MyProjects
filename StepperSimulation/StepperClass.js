class Stepper {
    speed = 5;

    constructor(steps, delta, position) {
        this.stepsPerRotation = steps;
        this.wireLengthDelta = delta;
        this.maxDelta = delta * 2;
        this.minDelta = delta / 4;

        this.position = position;
        this.steps = 0;
    }


    doStep(side, mult) {
        if (mult === undefined) mult = 1;
        let delta = this.wireLengthDelta * mult;
        if (delta > this.maxDelta) delta = this.maxDelta;
        if (delta < this.minDelta) delta = this.minDelta;

        if (side === "clock") {
            this.steps++;
            this.wire.addLength(delta);
        } else {
            this.steps--;
            this.wire.addLength(-delta);
        }

        //this.wire.setLength(this.steps * this.delta);
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
}