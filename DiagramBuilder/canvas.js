var diagram_variables = {//Переменные, нужные для работы
    builder_workbench_X: 16000,
    builder_workbench_Y: 9000,
    canvas_x: 1600,
    canvas_y: 900,
    grid_scaling: 100,
    scaling: 0.02,
    grid_step: 40,
    grid_color: "gray",
    diagram_color: "red"
}
var possible_diagrams = {//Встроенные графики
    parabola: "x*x + b*x + c",
    hyperbol: "b/x + c",
    sinus: "Math.sin(b*x) + c",
    cosinus: "Math.cos(b*x) + c",
    line: "k*x + c"
}
var html_elements_toGet = [ //Вводить только строки, все полученные HTML объекты сохраняются в html_elements
    "Input_Options_1", "Input_Formula" 
];
var html_elements = {
    
};

var current_diagrams = [];

window.onload = function() {
    //Создаем канвас - холст
    var canvas = document.getElementById("canvas");  
    ctx = canvas.getContext('2d');
    ctx.fillStyle = "black";
    var ctxX = diagram_variables.canvas_x, ctxY = diagram_variables.canvas_y; 
    ctx.fillRect(0,0,ctxX,ctxY); //Заполняем окно черным
    getElements();
    start();
}

function start(){
    grid_builder();
    main();
}

function main(){
    let centerX = diagram_variables.canvas_x/2;
    var diagram = new object(centerX, 600, 500, "green", possible_diagrams.sinus);
    current_diagrams.push(diagram);
 
    for(var i = 0; i < current_diagrams.length; i++){
        current_diagrams[i].draw();    
    }
    html_elements.Input_Formula.onkeypress = function(e) {
            if(e.keyCode == "13"){
                var formula = e.currentTarget.value;
                var diagram = new object(centerX, 600, 500, "yellow", formula);
                current_diagrams.push(diagram);
                diagram.draw();
            }
    }
    
    
}

function getElements(){
    for(var i = 0; i < html_elements_toGet.length; i++){
        var element = document.getElementById(html_elements_toGet[i]);
        html_elements[html_elements_toGet[i]] = element;
    }
}


function grid_builder() {
    var x1 = 0, y1 = 0, x2 = 0, y2 = 0;
    var step = diagram_variables.grid_step;
    var scaling = diagram_variables.canvas_x / step   
    ctx.lineWidth = 1;
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
    this.diagram_length = parts;
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
        var x = i * this.x_scale;
        //if(this.x_scale < 1) {var x = i * this.x_scale;} else {var x = i;}
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
        ctx.lineWidth = 1;
        ctx.beginPath();       
        var request = this.diagram_build(-this.diagram_length, this.x_start, this.y_start);
        ctx.moveTo(request.x, request.y);
        for(var i = -this.diagram_length; i < this.diagram_length; i++){
            var request = this.diagram_build(i+1, this.x_start, this.y_start);
            ctx.lineTo(request.x, request.y);  
            ctx.stroke();          
        }
    }
}

