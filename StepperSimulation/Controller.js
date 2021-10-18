class Controller {
    epsilonMultiplier = 4;
    frequency = 30;
    awake = false;
    targetPoint = undefined;
    calculations = undefined;

    taskArray = [];




    constructor(fStepper, sStepper, fWire, sWire, dObj) {
        this.firstStepper = fStepper;
        this.secondStepper = sStepper;
        this.firstWire = fWire;
        this.secondWire = sWire;
        this.drawingObj = dObj;


        this.epsilon = this.epsilonMultiplier * firstStepper.wireLengthDelta;

        this.distanceBetweenMotors = Math.abs(this.firstStepper.position.x - this.secondStepper.position.x);
    }

    changeLengthInCircle(N) {
        let R = N * N;
        let baseL1 = this.firstWire.length;
        let baseL2 = this.secondWire.length;


        for (let dl1 = -N; dl1 <= N; dl1++) {
            let dl2 = Math.sqrt(R - (dl1 * dl1));

            let l1 = baseL1 - dl1;
            let l2 = baseL2 - dl2;
            this.firstWire.setLength(l1);
            this.secondWire.setLength(l2);
        }
        for (let dl1 = -N; dl1 <= N; dl1++) {
            let dl2 = -Math.sqrt(R - (dl1 * dl1));

            let l1 = baseL1 + dl1;
            let l2 = baseL2 - dl2;
            this.firstWire.setLength(l1);
            this.secondWire.setLength(l2);
        }
    }

    moveObjToPoint(point) {
        if (point === undefined) return false;



        let pos = this.drawingObj.currentPosition;

        let currentX = pos.x;
        let currentY = pos.y;

        let expectedX = point.x;
        let expectedY = point.y;

        let currentL1 = this.firstWire.length;
        let currentL2 = this.secondWire.length;


        let eX1 = expectedX - this.firstStepper.position.x;
        let eX2 = this.secondStepper.position.x - expectedX;
        let eY = expectedY - this.firstStepper.position.y;

        let expectedL1 = Math.sqrt(eX1 * eX1 + eY * eY);
        let expectedL2 = Math.sqrt(eX2 * eX2 + eY * eY);

        let deltaL1 = expectedL1 - currentL1;
        let deltaL2 = expectedL2 - currentL2;

        let lengthRatio1 = Math.abs(deltaL1 / deltaL2);
        //if(lengthRatio1 < 0) lengthRatio1 = 1/lengthRatio1;



        let deltaX = expectedX - currentX;
        let deltaY = expectedY - currentY;
        let deltaPos = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (deltaPos > this.epsilon) {
            /*
            if (lengthRatio1 > 1) {
                //let l = Math.floor(lengthRatio1);
                if (deltaL1 > 0) this.firstStepper.doStep(clock);
                else this.firstStepper.doStep(clockwise);
            } else {
                //let l = Math.floor(1 / lengthRatio1);
                if (deltaL2 > 0) this.secondStepper.doStep(clock);
                else this.secondStepper.doStep(clockwise);
            }*/




            if (deltaL1 > 0) this.firstStepper.doStep(clock, lengthRatio1);
            else this.firstStepper.doStep(clockwise, lengthRatio1);
            if (deltaL2 > 0) this.secondStepper.doStep(clock, 1 / lengthRatio1);
            else this.secondStepper.doStep(clockwise, 1 / lengthRatio1);



        } else {
            this.awake = false;
            this.targetPoint = undefined;
        }
    }

    moveObjToPoint2(point) {
        if (point === undefined) return false;

        let resolution = 200;

        let baseX1 = this.firstStepper.position.x;
        let baseX2 = this.secondStepper.position.x;
        let baseY = this.firstStepper.position.y;

        let pos = this.drawingObj.currentPosition;
        let R = this.distanceBetweenMotors;

        let currentX = pos.x;
        let currentY = pos.y;

        let expectedX = point.x;
        let expectedY = point.y;

        let deltaX = expectedX - currentX;
        let deltaY = expectedY - currentY;

        let dX, dY;
        if (this.calculations === undefined) {
            dX = deltaX / resolution;
            dY = deltaY / resolution;
            this.calculations = { dX, dY };
        } else {
            dX = this.calculations.dX;
            dY = this.calculations.dY;
        }
        let x = currentX - baseX1;
        let x2 = baseX2 - currentX;
        let y = currentY - baseY;

        let nx1 = x + dX;
        let nx2 = x2 - dX;
        let ny = y + dY;

        let newL1 = Math.sqrt(nx1 * nx1 + ny * ny);
        let newL2 = Math.sqrt(nx2 * nx2 + ny * ny);

        let deltaPos = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (deltaPos > this.epsilon) {
            this.firstWire.setLength(newL1);
            this.secondWire.setLength(newL2);
        } else {
            this.awake = false;
            this.targetPoint = undefined;
            this.calculations = undefined;
        }
    }

    moveObjToPoint3(point) {
        if (point === undefined) return false;
        let wireD = this.firstStepper.wireLengthDelta;

        let baseX1 = this.firstStepper.position.x;
        let baseX2 = this.secondStepper.position.x;
        let baseY = this.firstStepper.position.y;

        let pos = this.drawingObj.currentPosition;
        let R = this.distanceBetweenMotors;

        let currentX = pos.x;
        let currentY = pos.y;

        let expectedX = point.x;
        let expectedY = point.y;

        let deltaX = expectedX - currentX;
        let deltaY = expectedY - currentY;

        let deltaPos = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        let resolution = deltaPos / this.firstStepper.maxDelta;

        let currentL1 = this.firstWire.length;
        let currentL2 = this.secondWire.length;


        let dX, dY;
        if (this.calculations === undefined) {
            dX = deltaX / resolution;
            dY = deltaY / resolution;
            this.calculations = { dX, dY };
        } else {
            dX = this.calculations.dX;
            dY = this.calculations.dY;
        }
        let x = currentX - baseX1;
        let x2 = baseX2 - currentX;
        let y = currentY - baseY;

        let nx1 = x + dX;
        let nx2 = x2 - dX;
        let ny = y + dY;

        let newL1 = Math.sqrt(nx1 * nx1 + ny * ny);
        let newL2 = Math.sqrt(nx2 * nx2 + ny * ny);

        let deltaL1 = newL1 - currentL1;
        let deltaL2 = newL2 - currentL2;

        let ratio = deltaL1 / deltaL2;

        let speed1 = Math.abs(deltaL1 / wireD);
        let speed2 = Math.abs(deltaL2 / wireD);
        let k;
        if (speed1 > speed2)
            k = Math.abs(this.firstStepper.maxSpeed / speed1);
        else {
            k = Math.abs(this.firstStepper.maxSpeed / speed2);
        }



        if (deltaPos > this.epsilon) {
            this.firstStepper.setSpeed(speed1);
            this.firstStepper.doStep(deltaL1);
            this.secondStepper.setSpeed(speed2);
            this.secondStepper.doStep(deltaL2);
        } else {
            this.awake = false;
            this.targetPoint = undefined;
            this.calculations = undefined;
        }
    }

    invokeMoving() {
        if (controller.awake) {
            controller.moveObjToPoint3(controller.targetPoint);
        } else {
            controller.moveObjToPoint3(undefined);
        }

    }

    changeEpsilon(N) {
        this.epsilon = this.epsilonMultiplier * N;
    }
}