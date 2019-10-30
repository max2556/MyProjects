if(multList == undefined){multList = [];} //МультЛист - Это кто? Передача на детских ТВ
  if(multList.length > 0){
    for(var i = 0; i < multList.length; i++){
      variable = eval(multList[i]);               
    }
}

function replaceAll(type ,str1, str2){ //Потерял актуальность, но РЕГулярные ВЫражения - мощные
    str1 = new RegExp(str1, 'g'); 
    type = type.replace(str1, str2);
    
    return type;
}



//НУ НИКАК НЕ РАБОТАЕТ - ПЕРЕДЕЛАТЬ С НУЛЯ, ВОССТАНОВИТЬ ВЕРСИЮ СО СТРОКАМИ(с гитхаба)
var delta = parameters.delta;
let timer = parameters.timer;
if (timer > 1) {
  let parameters_1 = parameters; parameters_1.timer--;
  var x_result = diff_Function(func, parameters_1);
  parameters.x += delta;
  let parameters_2 = parameters; parameters_2.timer--;
  var delta_result = diff_Function(func, parameters_2);
} else {
  parameters.x = parameters.origin_x;
  var x_result = func();
  parameters.x += delta;
  var delta_result = func();
}
var result = (delta_result - x_result)/delta;
return result;





//вынес по причине "ненужно"
function replaceCustom(replaceable, replacement){//может быть заменен регулярным выражением (RegExp - Regular expression)
  while(){
    currentValue = currentValue.replace(space, empty);
    isIncludesSpace = currentValue.includes(space);
  } 
}

//Не мусор, а шпаргалка
input[type="text"] {
  border: 1px solid #cccccc; //цвет рамки
  border-radius: 3px; //закругление углов (общее)
  -webkit-border-radius: 3px; //закругление углов (Google Chrome)
  -moz-border-radius: 3px; //закругление углов (FireFox)
  -khtml-border-radius: 3px; //закругление углов (Safari)
  background: #ffffff !important; // желательно прописывать, так как в Chrome при сохранных данных оно может быть желтым
  outline: none; // удаляет обводку в браузерах хром(желтая) и сафари(синяя)
  height: 24px; // высота на свое усмотрение
  width: 120px; // ширина на свое усмотрение
  color: #cccccc; //цвет шрифта в обычном состоянии
  font-size: 11px; // Размер шрифта
  font-family: Tahoma; // Стиль шрифта
}