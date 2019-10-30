/*
Произошел прикол - нифига не круто
Все построенно на Евале и я запутался
*/
var diagram_variables = {//Переменные, нужные для Первичного запуска(размер поля, изначальная масштабировка)
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
//Перестало быть нужным, так как есть какая-то фигня ниже, которая сама перебирает id

//Upd: у меня проблемы с головой, походу оно все таки нужно
"Input_Formula", "diff_mode", "CleanButton"


];
var modification_functions = {
  diff: "diff_Function(func, parameters)",//Func - Это кто?
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
              var otherParameters = getAllFromInputs();
              var color = randomColor();
              var diagram = new object(centerX, 600, 500, color, formula, otherParameters, modList);
              current_diagrams.push(diagram);
              diagram.draw();
          }
  }
  html_elements.CleanButton.onclick = function(e){
    clean();
  }
  
}

//та самая "фигня ниже"
function getAllFromInputs() {
var params = {};
for (let i = 0; i < html_elements_toGet.length; i++) {
  const nameOfInput = html_elements_toGet[i]; //Берем имя каждого инпута
  const valueOfInput = html_elements[nameOfInput].value;
  const input_id = html_elements[nameOfInput].id;
  params[input_id] = valueOfInput;
}
return params;
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

function object(x, y, parts, color, type, other, modList, x_scale, y_scale) {
  this.otherParameters = {};
  this.modList = [];
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
  if(other != undefined){this.otherParameters = other;}
  if(y_scale != undefined){this.y_scale = y_scale;}
  if(modList != undefined){this.modList = modList;}
  this.isAlreadyModifed = false

  this.diagram_build = function(i, X, Y) {
      /*
      Я полностью потерял суть, нифига не понятно, если кто-то что-то тут поймет - пишите в лс
      */

      var x = i * this.x_scale;
      var delta = 0.001;
      var parameters = {
        x: x,
        delta: delta,
        type: this.type,
        origin_x: x,
        first: true,
        mode: this.otherParameters["diff_mode"],
      }

      var func = function(){
        let x = parameters.x;
        return eval(parameters.type);
      }
      var y = func();
      for(var i = 0; i < this.modList.length; i++){
        parameters["timer"] = modList[i].timer;
        y = eval(modification_functions[modList[i].mod]);            //У = результату функции, сл-но число я получаю в функции, а не здесь
      }
      
      //4
      x = x / this.x_scale;
      y = y / this.y_scale;
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


  this.collection_of_functions = {
    finalCorrect: function (variable, scale){
      variable = variable/scale
      return variable;
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
function diff_Function(func, parameters){
//в сраку эти ваши производные, мне хватит и первого порядка

var delta = parameters.delta;
function trueDiff(parameters){//не знаю зачем мне тут функция, но пусть будет - никому не мешает
  //два режима - один через математику в JS, другой - через преобразование строк
  if(parameters.mode == "math"){
    var var1 = func();             
    parameters.x += delta;
    var var2 = func();
    var result = (var2 - var1)/delta;
    return result;
  } else {
    for (let i = 0; i < parameters.timer; i++) {
      parameters.type = "(" + parameters.type.replace(/x/g, "(x + delta)") + " - " + parameters.type + ")" + "/delta";
      parameters.first = !parameters.first;
    }  
    var x = parameters.x;//присутствует прикол
    var res = eval(parameters.type);
    return res;
  }
}
return trueDiff(parameters);
}

//Самая мощная/важная вещь
//По-любому улучшать или придумать альтернативу Евалу
/*
Уже умеет:
1)Убивать в строке пробелы
2)Читать модификаторы
3)...
*/
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
    currentMod = currentMod[0]; //берем [0], потому что .match() возвращает массив, а на 0-м месте находится совпадающая строка
    var mod_container = {  //создаем контейнер для модификации и её повторов
      timer: 0
    };
    mod_container["mod"] = currentMod;
  }
  while(currentValue.includes(currentMod)){  
    mod_container.timer++;  //пока в строке есть модификатор - мы убираем его из строки + засчитываем таймер
    currentValue = currentValue.replace(currentMod, empty);
  }
  if (mod_container != undefined) {
    result.modList.push(mod_container); //закидываем контейнер в массив  
    mod_container = {//Создали новый контейнер
      timer: 0
    }
  }
 
  
  
} 
while(isIncludesSpace){
  currentValue = currentValue.replace(space, empty);
  isIncludesSpace = currentValue.includes(space);
} 
result.formula = currentValue;
return result;
}

function clean() {
var current_diagrams = [];
var ctxX = diagram_variables.canvas_x, ctxY = diagram_variables.canvas_y; 
ctx.fillStyle = "black";
ctx.fillRect(0,0,ctxX,ctxY); //Заполняем окно черным
grid_builder();
}


