var diagram_variables = {
    builder_workbench_X: 16000,
    builder_workbench_Y: 9000,
    canvas_x: 1600,
    canvas_y: 900,
    grid_scaling: 100,
    scaling: 0.2,
    grid_step: 20,
    grid_color: "gray",
    diagram_color: "red"
}
var possible_diagrams = {
    parabola: "x*x + b*x + c",
    hyperbol: "b/x + c",
    sinus: "Math.sin(b*x) + c",
    cosinus: "Math.cos(b*x) + c",
    line: "k*x + c"
}

var current_diagrams = [];

window.onload = function() {
    var canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');
    ctx.fillStyle = "black";
    var ctxX = diagram_variables.canvas_x, ctxY = diagram_variables.canvas_y;
    ctx.fillRect(0,0,ctxX,ctxY); //Заполняем окно черным
    start();
}

function start(){
    grid_builder();
    main();
}

function main(){
    var diagram = new object(400, 600, 100, diagram_variables.diagram_color, possible_diagrams.parabola);
    current_diagrams.push(diagram);
    var diagram = new object(400, 600, 100, "yellow", possible_diagrams.line);
    current_diagrams.push(diagram);
    var diagram = new object(400, 600, 100, "#0000FF" , possible_diagrams.hyperbol, 0.5, 0.005);
    current_diagrams.push(diagram);
    var diagram = new object(400, 600, 100, "green", possible_diagrams.sinus, 0.2, 0.02);
    current_diagrams.push(diagram);
 
    for(var i = 0; i < current_diagrams.length; i++){
        current_diagrams[i].draw();    
    }
    
    
    
}


function grid_builder() {
    var x1 = 0, y1 = 0, x2 = 0, y2 = 0;
    var step = diagram_variables.grid_step;
    var scaling = diagram_variables.canvas_x / step   
    
    for(var i = 0; i < scaling; i++){
        //Рисуем вертикальные линии
        x2 = x1; y2 = diagram_variables.canvas_y;
        ctx.strokeStyle = diagram_variables.grid_color;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.closePath();
        ctx.stroke();  
        x1 = x1 + step;
    }
    x1 = 0;
    y1 = 0;
    for(var i = 0; i < scaling; i++){
        //Рисуем горизонтальные линии
        x2 = diagram_variables.canvas_x; y2 = y1;
        ctx.strokeStyle = diagram_variables.grid_color;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.closePath();
        ctx.stroke();  
        y1 = y1 + step;
    }
    
}

function object(x, y, parts, color, type, x_scale, y_scale) {
    this.type = type;    
    this.diagram_scaling = parts;
    this.diagram_color = color;
    this.x_start = x;
    this.y_start = y;
    this.x = x;
    this.y = y;
    this.x_scale = diagram_variables.scaling;
    this.y_scale = diagram_variables.scaling;
    if(x_scale != undefined){this.x_scale = x_scale;}
    if(y_scale != undefined){this.y_scale = y_scale;}
    
    this.diagram_build = function(i, X, Y) {
        var step = 1;
        var b = 1, c = 1, k = 1;
        var x = i;
        var y;
        y = eval(this.type);
        x = x / this.x_scale;
        y = y / this.y_scale;
        var request = {};
        request.x = x + X;
        request.y = -y + Y;
        return request;
    }    
    this.draw = function(){
        ctx.strokeStyle = this.diagram_color;
        ctx.beginPath();       
        var request = this.diagram_build(-this.diagram_scaling, this.x_start, this.y_start);
        ctx.moveTo(request.x, request.y);
        for(var i = -this.diagram_scaling; i < this.diagram_scaling; i++){
            var request = this.diagram_build(i+1, this.x_start, this.y_start);
            ctx.lineTo(request.x, request.y);  
            ctx.stroke();          
        }
    }
}

