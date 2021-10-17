class Wire {
    length = 0;
    visibleLength = 0;
    overLength = 0;
    constructor(stepper) {
        this.startPosition = stepper.position;
        stepper.wire = this;
    }

    calculateLength() {
        if (this.startPosition == undefined || this.endPosition == undefined) {
            console.log(this);
            console.log(this.startPosition + "," + this.endPosition);
            console.log("Эта веревка не может рассчитать длину, возможно у неё отсутствует стартовая или конечная точка");
            return false;
        }

        let dX = this.startPosition.x - this.endPosition.x;
        let dY = this.startPosition.y - this.endPosition.y;
        this.defaultL = Math.sqrt(dX * dX + dY * dY);
        this.length = Math.sqrt(dX * dX + dY * dY);
        this.visibleLength = this.length;
        console.log(this.length);
    }

    setLength(l) {
        this.length = l;
        this.visibleLength = this.length
        this.drawObj.calculateEndPoint();
    }
    addLength(l) {
        if (this.drawObj.secondWire.length + this.drawObj.firstWire.length + l <= this.drawObj.distanceBetweenMotors) { return false; }

        this.length += l;
        this.visibleLength = this.length;
        this.drawObj.calculateEndPoint();
    }

    setEndPos(pos) {
        this.endPosition = pos;
    }

    draw(context) {
        const wireColor = "black";
        const width = 5;

        const sX = this.startPosition.x;
        const sY = this.startPosition.y;
        const eX = this.endPosition.x;
        const eY = this.endPosition.y;

        const overLength = this.length - this.visibleLength

        const middleX = (sX + eX) / 2;
        const middleY = (sY + eY) / 2 + overLength;

        context.lineWidth = width;
        context.strokeStyle = wireColor;


        context.beginPath();
        context.moveTo(sX, sY);
        //context.lineTo(eX, eY);
        context.quadraticCurveTo(middleX, middleY, eX, eY);

        //context.closePath();
        context.stroke();
    }
}