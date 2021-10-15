class Stepper {
    constructor(steps, delta, position) {
        this.stepsPerRotation = steps;
        this.wireLengthDelta = delta;

        this.position = position;
        this.steps = 0;
    }


    doStep(side) {
        let delta = this.wireLengthDelta;
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