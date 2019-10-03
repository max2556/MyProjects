//TODO: изменить принцип модифицирования
var diagram_variables = {//Переменные, нужные для работы
    builder_workbench_X: 16000,
    builder_workbench_Y: 9000,
    canvas_x: 1800,
    canvas_y: 900,
    grid_scaling: 100,
    scaling: 0.02,
    grid_step: 40,
    grid_color: "#0d0d0d",
    diagram_color: "red"
}
var possible_diagrams = {//Встроенные графики
    parabola: "x*x + b*x + c",
    hyperbol: "1/x",
    sinus: "Math.sin(x)",
    cosinus: "Math.cos(x)",
    line: "x",
    circle: "Math.sqrt(1-x*x)"
}
var html_elements_toGet = [ //Вводить только строки, все полученные HTML объекты сохраняются в html_elements
    "Input_Options_1", "Input_Formula" 
];
var modification_functions = {
    diff: "differenceFunction(func)",
}
var possible_Modifications = Object.getOwnPropertyNames(modification_functions);


//Пустые переменные для хранения
var html_elements = {};
var current_diagrams = [];

window.onload = function() {
    //Создаем канвас - холст
    var canvas = document.getElementById("canvas");
    var ctxX = diagram_variables.canvas_x, ctxY = diagram_variables.canvas_y; 
    canvas.width = ctxX;
    canvas.height = ctxY;
    ctx = canvas.getContext('2d');
    ctx.fillStyle = "black";
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
    //var diagram = new object(centerX, 600, 10, "blue", possible_diagrams.sinus, ["diff"]);
   // current_diagrams.push(diagram);
    var diagram = new object(centerX, 600, 500, "green", possible_diagrams.circle);
    current_diagrams.push(diagram);
 
    for(var i = 0; i < current_diagrams.length; i++){
        current_diagrams[i].draw();    
    }
    html_elements.Input_Formula.onkeypress = function(e) {
            if(e.keyCode == "13"){
                var value = valueParser(e.target.value);
                var formula = value.formula;
                var modList = value.modList;
                var color = randomColor();
                var diagram = new object(centerX, 600, 500, color, formula, modList);
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

function object(x, y, parts, color, type, modList, x_scale, y_scale) {
    this.type = type;
    this.modList = [];
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
    if(modList != undefined){this.modList = modList;}
    
    this.diagram_build = function(i, X, Y) {
        /*
        Здесь происходит "построение" функции
        1:Создается переменная-хранилище func с переменными, необходимыми для модификаторов
        2:'х'-координата подгоняется под масштаб, вычисляется у, по заданной формуле функции
        3:Проверка на модификаторы и исполнение в случае успеха  
        4:Масштабирование
        5:Отправка в Рисовалку
        */
        //1
        var func = {
          add:{},
        };
        //2
        var x = i * this.x_scale;
        var y = 0;
        //3
        if(this.modList.length > 0){
          func.type = this.type;
          for(var i = 0; i < modList.length; i++){
            func = eval(modification_functions[modList[i]]);               
          }
          this.type = func.type;
          
        }
        var delta = 0.000001;
        y = eval(this.type);
        
        //4
        x = finalCorrect(x, this.x_scale);
        y = finalCorrect(y, this.y_scale);
        //5
        var request = {};
        request.x = x + X;
        request.y = -y + Y;
        return request;
    }    
    this.draw = function(){
        /*
        Рисовалка
        */
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

function randomColor(){
    var min = 0;
    var max = 255;
    var red = Math.floor(Math.random()*(max-min) + min);
    var green = Math.floor(Math.random()*(max-min) + min);
    var blue = Math.floor(Math.random()*(max-min) + min);
    var color = "rgb(" + red + "," + green + "," + blue + ")";
    return color;
}
function finalCorrect(variable, scale, multList){
  if(multList == undefined){multList = [];}
  if(multList.length > 0){
    for(var i = 0; i < multList.length; i++){
      variable = eval(multList[i]);               
    }
  }
  variable = variable/scale
  return variable;
}
function differenceFunction(parameters){
  parameters.type = "(" + parameters.type.replace("x", "(x + delta)") + " - " + parameters.type + ")" + "/delta";
  return parameters;
}

function valueParser(value){
  const space = " ";
  const empty = "";
  var isIncludesSpace = value.includes(space);

  var result = {
    modList:[],
    formula:0,
  };

  var currentValue = value;

  for(var i = 0; i < possible_Modifications.length; i++){
    var currentMod = currentValue.match(possible_Modifications[i]);
    if(currentMod != null){
      currentMod = currentMod[0];
    }
    while(currentValue.includes(currentMod)){  
      result.modList.push(currentMod);
      currentValue = currentValue.replace(currentMod, empty);
    }
  } 
  while(isIncludesSpace){
    currentValue = currentValue.replace(space, empty);
    isIncludesSpace = currentValue.includes(space);
  } 
  result.formula = currentValue;
  return result;
}

