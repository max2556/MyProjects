class Controller {
    epsilonMultiplier = 2;
    frequency = 30;
    awake = false;
    targetPoint = undefined;


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

    invokeMoving() {
        if (controller.awake) {
            controller.moveObjToPoint(controller.targetPoint);
        } else {
            controller.moveObjToPoint(undefined);
        }

    }

}