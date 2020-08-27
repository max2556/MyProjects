'option explisit';

var scLowX=0; //Минимальная граница координат по оси X 
var scHighX=svgMain.scrollWidth
var scLowY=0;
var scHighY=svgMain.scrollHeight;
var minAngle=0;
var maxAngle=360;

// Коды текущих нажатых клавиш
var kCodes = [];
// Номер текущего выбранного танка
var selectedTankId = "T_5";
	
var TankArray = [];
((function() {
	init(7);
	
	
	step();
	
})());

//Выясняем есть ли в массиве элемент
function isInArray(array,value) {
	for(var i=0;i<array.length;i++) {
		if(array[i]==value) {
			return true;
		}
	}
	return false;
}
//Выясняем сколько раз встречается в массиве данное значение
function countInArray(array,value) {
	var col=0;
	for(var i=0;i<array.length;i++) {
		if(array[i]==value) { col++; }
	}
	return col;
}



//Начальная настройка
function init(Tc) {

  //Здесь задаются обработчики нажатия клавиш
	document.body.addEventListener('keydown', function(e) {
		var mdiv=document.getElementById("main");
		mdiv.innerHTML=e.keyCode;
		var cIA=countInArray(kCodes,e.keyCode);
		if (cIA==0) {
			kCodes.push(e.keyCode);
		}else {
			if (cIA==1) {
				return ;
			}else {
				if (cIA==2) {
					alert("HI");
				}	
			}
		
		}
	
	});
	
	document.body.addEventListener('keyup', function(e) {
	 // Убрать из массива все значения равные отпущенной клавише
		kCodes=kCodes.filter(function(number) {return number !=e.keyCode;});
	
	});
	
	document.body.addEventListener('mousedown', function(e) {

	
	});
  
	document.body.addEventListener('mouseup', function(e) {
	
	
	});
  //Здесь создаются танки
  
	for (var i=0;i<Tc;i++) {
			var newTank = createTank();
			TankArray.push(newTank);	
		
	}

}


function createTank () {
	var innerObject = {}; 
	var svgMain=document.getElementById("svgMain");
	var tank0=svgMain.getElementById("T_0");
	
	if (tank0.tobject==undefined) {
		tank0.tobject=innerObject;	
		innerObject.tank=tank0;
	}else{
		var cr_o_id="T_"+TankArray.length;
	
		var tankClone=tank0.cloneNode(true);
		tankClone.id=cr_o_id;
		tankClone.tobject=innerObject;
		
		var m1 = tankClone.transform.baseVal.getItem(0).matrix;	
		var m2 = tankClone.transform.baseVal.getItem(1);
		var newAngle=~~(m2.angle);
		
	
		x=Math.floor(Math.random()*(scHighX-scLowX+1))+scLowX;
		y=Math.floor(Math.random()*(scHighY-scLowY+1))+scLowY;	
		a=Math.floor(Math.random()*(maxAngle-minAngle+1))+minAngle;
		m1.e=x;
		m1.f=y;
		newAngle=inRange(0,360,a,0);
		m2.angle=newAngle;
		var atrVal="translate("+m1.e+","+m1.f+") rotate("+newAngle+")";
		tankClone.setAttribute("transform",atrVal);
		TGroup.appendChild(tankClone);
		innerObject.tank=tankClone;
		
	}
	innerObject.delta=2;
	var de=innerObject.delta;
	function robotMove(_tank) {
		var debug=0;
		var m1 = _tank.transform.baseVal.getItem(0).matrix;	
		var m2 = _tank.transform.baseVal.getItem(1);
		//newAngle=inRange(0,360,m2.angle,innerObject.delta);
		var newAngle=~~(m2.angle);
		var newRad=(newAngle/180)*3.14;
		var cx=Math.cos(newRad);
		var sy=Math.sin(newRad);
		x=m1.e;
		y=m1.f;
		x=inRange(scLowX,scHighX,x,de*cx);
		y=inRange(scLowY,scHighY,y,de*sy);
		m1.e=x;
		m1.f=y;
		var atrVal="translate("+m1.e+","+m1.f+") rotate("+newAngle+")";
		_tank.setAttribute("transform",atrVal);		
	}

	innerObject.stepTank=function(){
		var _tank=this.tank;
		if (_tank) {
			if (_tank.id ==selectedTankId) {
				kCodes=kCodes.filter(function(number) {
				_tank.style.fill="blue";
					if (number==38) {				
						var sde=de;
						manualMove(_tank,sde);
						
					}
					if (number==39) {				
						var sde=de;
						turn(_tank,sde);
					}
					if (number==40) {				
						var sde=-de;
						manualMove(_tank,sde);
					}
					if (number==37) {				
						var sde=-de;
						turn(_tank,sde);
					}
					if (number==107) {				
						de=de+1;
					
					}
					if (number==109) {				
						de=de-1;
					}
					if (number==106) {				
						de=2;
					}
					var mdiv2=document.getElementById("main2");
					mdiv2.innerHTML=sde;
					return number;
					
				});
			
			} else {robotMove(_tank)}
		}
	}
	return innerObject;
	

}
//Движение танка - робота


function step() {
	var Tc=7
	for (var i=0;i<Tc;i++) {
		TankArray[i].stepTank();		
	}
	setTimeout(step,100);	
}

function manualMove(_tank,sde) {

	var m1 = _tank.transform.baseVal.getItem(0).matrix;	
	var m2 = _tank.transform.baseVal.getItem(1);
	var newAngle=~~(m2.angle);
	var x=m1.e,y=m1.f;
	var newRad=(newAngle/180)*3.14;	
	var cx=Math.cos(newRad);
	var sy=Math.sin(newRad);
	x=inRange(scLowX,scHighX,x,sde*cx);
	y=inRange(scLowY,scHighY,y,sde*sy);
	m1.e=x;
	m1.f=y;
	//var atrVal="translate("+m1.e+","+m1.f+") rotate("+newAngle+")";
	//_tank.setAttribute("transform",atrVal);

	



	
}

function turn(_tank,sde) {
	var m1 = _tank.transform.baseVal.getItem(0).matrix;	
	var m2 = _tank.transform.baseVal.getItem(1);
	var newAngle=~~(m2.angle);
	newAngle=inRange(0,360,newAngle,sde);
	var atrVal="translate("+m1.e+","+m1.f+") rotate("+newAngle+")";
	_tank.setAttribute("transform",atrVal);

}

function inRange(low,high,value,delta){
	var ret=value+delta;
	if(ret>high){
	ret=low+ret-high;
	
	}
	if(ret<low){
		ret=low+ret+high;
	
	}


	
	return ret;
	



}
