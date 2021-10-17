class DrawingObj {
    path = [];
    pathFrequency = 10;


    constructor(position, wire_1, wire_2) {
        this.defaultPosition = position;
        this.currentPosition = position;

        wire_1.endPosition = position;
        wire_2.endPosition = position;

        wire_1.calculateLength();
        wire_2.calculateLength();

        wire_1.drawObj = this;
        wire_2.drawObj = this;

        this.firstWire = wire_1;
        this.secondWire = wire_2;

        this.distanceBetweenMotors = Math.abs(wire_2.startPosition.x - wire_1.startPosition.x);


        this.path.push(position);
    }




    calculateEndPoint() {
        let l1 = this.firstWire.length;
        let l2 = this.secondWire.length;
        let r = this.distanceBetweenMotors;
        let dx = (l1 * l1 - l2 * l2 + r * r) / (2 * r);
        let dy = Math.sqrt(l1 * l1 - dx * dx);

        let x = firstWire.startPosition.x + dx;
        let y = firstWire.startPosition.y + dy;






        if (x < this.firstWire.startPosition.x) {
            let _y = this.firstWire.startPosition.y;

            x = this.firstWire.startPosition.x;
            y = _y + l1;



            let visualL2 = Math.sqrt(r * r + l1 * l1);
            this.secondWire.visibleLength = visualL2;
        }
        if (x > this.secondWire.startPosition.x) {
            let _y = this.secondWire.startPosition.y;

            x = this.secondWire.startPosition.x;
            y = _y + l2;

            let visualL1 = Math.sqrt(r * r + l2 * l2);
            this.firstWire.visibleLength = visualL1;
        }



        let pos = { x: x, y: y };

        this.currentPosition = pos;
        this.firstWire.setEndPos(pos);
        this.secondWire.setEndPos(pos);

        this.path.push(pos);
    }


    drawPath(context) {
        const lineColor = "rgb(102, 0, 255)";
        context.lineWidth = 2;

        context.strokeStyle = lineColor;


        const initPos = this.path[0];
        context.beginPath();
        context.moveTo(initPos.x, initPos.y);
        for (let point of this.path) {
            context.lineTo(point.x, point.y);
        }
        context.stroke()
        context.closePath();
    }

    pushPosToPath() {
        drawingObj.path.push(drawingObj.currentPosition);
    }


    draw(context) {
        const bodyColor = "rgb(46, 46, 46)";
        const borderColor = "rgb(84, 84, 84)";
        const borderWidth = 1;

        const A = 50;

        let x = this.currentPosition.x;
        let y = this.currentPosition.y;

        context.fillStyle = bodyColor;
        context.fillRect(x - A / 2, y - A / 2, A, A);

        context.strokeStyle = borderColor;
        context.lineWidth = borderWidth;
        context.beginPath();
        context.moveTo(x - A / 2, y - A / 2);
        context.lineTo(x + A / 2, y - A / 2);
        context.lineTo(x + A / 2, y + A / 2);
        context.lineTo(x - A / 2, y + A / 2);
        context.lineTo(x - A / 2, y - A / 2);
        context.closePath();
        context.stroke();
    }
}