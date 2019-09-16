var ctxX = 1600;
var ctxY = 900;

var speed = 1000;
var length = 100;

var Angle = 45;
var angleStart = 0;
var addAngle = 15;

var treeColor = "blue";

var newSticks = [];
var sticksToDraw = [];

var layers = 0;
var xStart = 600;
var yStart = 800;


var maxLayers = 8;


var Center = 0;
var Left = 1;
var Right = 2;
var Empty = 3;

var currentStick = 0;

var _addAngle = 15;
var _Angle = 30;
var _lengthDecreaseMultiplier = 0.9;
var _multiplierDecrease = -0.025;

var multiplier = 0.85;

var isFirst = true;



window.onload = function () {
  var canvas = document.getElementById("canvas");
  ctx = canvas.getContext('2d');
  canvas.width = ctxX;  //Ширина канваса = ширине игрового окна
  canvas.height = ctxY; //Высота канваса = высоте игрового окна
  ctx.fillStyle = "black";
  ctx.fillRect(0,0,ctxX,ctxY); //Заполняем окно черным
  sticksToDraw.push(new object(xStart, yStart, angleStart, Center));
  main();
}

function main() {
    if(layers < maxLayers) {
      if(currentStick < sticksToDraw.length) {
        sticksToDraw[currentStick].draw(); 
        currentStick++;
      } else 
      {
      currentStick = 0;
      update();
      for (var i = 0; i < sticksToDraw.length; i++) {
        sticksCreate(i);
      }
      sticksReplace();     
    }  
    }
    main();
}





Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

function object(x1, y1, angle, position, firstPosition) {

  this.angle = getAngle(position, angle);
  this.x1 = x1;
  this.y1 = y1;
  this.position = position;
  this.firstPosition = firstPosition;
  
  this.x2 = this.x1 + length * Math.sin(Math.radians(this.angle));
  this.y2 = this.y1 - length * Math.cos(Math.radians(this.angle));    
  this.draw = function(){
      ctx.strokeStyle = treeColor;
      ctx.beginPath();       // Начинает новый путь
      ctx.moveTo(this.x1, this.y1);    // Рередвигает перо в точку (x1, y1)
      ctx.lineTo(this.x2, this.y2);  // Рисует линию до точки (x2, y2)
      ctx.stroke();          // Отображает путь
  }
}

function sticksCreate(i) {
  if(isFirst){
    newSticks.push(new object(sticksToDraw[i].x2, sticksToDraw[i].y2, 0, Center, Center));
    newSticks.push(new object(sticksToDraw[i].x2, sticksToDraw[i].y2, Angle, Left, Left));
    newSticks.push(new object(sticksToDraw[i].x2, sticksToDraw[i].y2, Angle, Right, Right));
    isFirst = !isFirst;
  } else {
    if(sticksToDraw[i].firstPosition == Left) 
    {
      Angle *= -1;
      addAngle *= -1;
      newSticks.push(new object(sticksToDraw[i].x2, sticksToDraw[i].y2, sticksToDraw[i].angle - Angle - addAngle, Right, Left));
      newSticks.push(new object(sticksToDraw[i].x2, sticksToDraw[i].y2, sticksToDraw[i].angle, Center, Left));  
      newSticks.push(new object(sticksToDraw[i].x2, sticksToDraw[i].y2, sticksToDraw[i].angle + Angle + addAngle, Right, Left));
      Angle *= -1;
      addAngle *= -1;
    } else if(sticksToDraw[i].firstPosition == Right) 
    {
      newSticks.push(new object(sticksToDraw[i].x2, sticksToDraw[i].y2, sticksToDraw[i].angle - Angle - addAngle, Right, Right));
      newSticks.push(new object(sticksToDraw[i].x2, sticksToDraw[i].y2, sticksToDraw[i].angle, Center, Right));
      newSticks.push(new object(sticksToDraw[i].x2, sticksToDraw[i].y2, sticksToDraw[i].angle + Angle + addAngle, Right, Right)); 
    } else {
      newSticks.push(new object(sticksToDraw[i].x2, sticksToDraw[i].y2, Angle, Left, Left));
      newSticks.push(new object(sticksToDraw[i].x2, sticksToDraw[i].y2, sticksToDraw[i].angle, Center, Center));
      newSticks.push(new object(sticksToDraw[i].x2, sticksToDraw[i].y2, Angle, Right, Right)); 
    }
  }
}
function sticksReplace() {
    sticksToDraw = [];
    sticksToDraw = newSticks;
    newSticks = [];
}

function update() {
    layers++;
    Angle *= multiplier;
    addAngle *= multiplier;
    length *= _lengthDecreaseMultiplier;
    multiplier += _multiplierDecrease;

}

function getAngle(position, angle) {
  let Angle = angle;
  if(position == Left){
    Angle = 360 - angle;
  } 
  if(position == Right){
    Angle = angle;  
  }
  return Angle;
}


