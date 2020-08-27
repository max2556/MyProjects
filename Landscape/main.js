/*
Функции для управления:
    create(
        Сглаживать? - true/false,
        Поворачивать? - true/false,
        Тип преобразований: 1 = Линейное
                            2 = Квадратичное
                            Любое другое = ничего
        )
    borderChange(значения границ)
    
    Параметры под комментарием Gen можно менять вручную

*/



var length;

//Типы отрисовки
var types = {
    poly: 'poly',
    line: 'line'
}

//Уровни границ
var borders = {
    max: 900,
    min: 100,
    def: 500
};

//Gen
var max = 14; //Верхняя граница Math.random()
var min = -14; //нижняя граница Math.random()
var range = 10;  //Количество элементов в окне
var range_mult = 2; //Множитель размера окна. Каждый этап сглаживания увеличивает range в range_mult раз 
var rounds = 3; //Этапы сглаживания
var type = types.poly; //Выбор типа отрисовки



var canvas = document.getElementById('canv');
var context = canvas.getContext('2d');
window.onload = function(){
    init();
    main();
}

//Инициализация канваса
function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.fillStyle='black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    length = canvas.width;  //Длина линии
}

//Основная функция
function main() {
    line = generate();
    line = alias(line, rounds);
    line = transform_tan(line);
    //transform_quadratic(line);
    transform_linear(line);
    draw(line, type);
}

//Генерирует массив случайных чисел с заданным первым числом
function generate() {
    var line = [];
    line.push(borders.def);
    for (let i = 0; i < length; i++) {
        var step = (Math.random() * (max - min)) + min;
        line.push(line[i] + step);
    }
    return line;
}
//'Поворот' линии, поднятие последнего значения до первого
function transform_tan(array) {
    var last = array[array.length-1];
    var first = array[0];
    var delta = first - last;
    var tan;
    var tempArr = [];
    if (last > first) {
        tan = delta / array.length;
    } else{ tan = delta / array.length;}
    for (let i = 0; i < array.length; i++) {
        tempArr.push(array[i] + i * tan);
    }
    return tempArr;
}
//растяжение по линейной функции(по двум точкам - максимальной и минимальной)
function transform_linear(array) {
    var minY = find_min(array);
    var maxY = find_max(array);
    var new_minY = borders.min;
    var new_maxY = borders.max;
    for (let i = 0; i < array.length; i++) {
        var prevY = array[i];
        var newY = (new_maxY-new_minY)*(prevY - minY) / (maxY - minY) + new_minY;
        array[i] = newY;
    }
}
//растяжение по параболе(трем точкам)
//Работает плохо
function transform_quadratic(array){
    var minPrevY, maxPrevY, defPrevY;
    var minNewY, maxNewY, defNewY;
    minNewY = borders.min; maxNewY = borders.max; defNewY = borders.def;
    minPrevY = find_min(array); maxPrevY = find_max(array); defPrevY = (array[0]+array[array.length-1])/2;
    var A,B,C;
    var x1,y1,x2,y2,x3,y3;
    x1 = minPrevY; y1 = minNewY;
    x2 = defPrevY; y2 = defNewY;
    x3 = maxPrevY; y3 = maxNewY;
    A = (y3 - (x3*(y2-y1) + x2*y1-x1*y2)/(x2-x1))/(x3*(x3-x1-x2)+x1*x2);
    B = (y2-y1)/(x2-x1)-A*(x1+x2);
    C = (x2*y1 - x1*y2)/(x2-x1) + A*x1*x2;
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        var newY = A*element**2 + B*element + C;
        array[i] = newY;
    }
}
//Отрисовывает массив.
function draw(array, t) {
    context.strokeStyle='blue';
    context.fillStyle='blue';
    context.beginPath();
    context.moveTo(0, canvas.height - array[0]);   
    for (var i = 1; i < array.length; i++) {
        const y = canvas.height - array[i];
        context.lineTo(i, y);
    }

    context.lineTo(i, 1081);
    context.lineTo(-1, 1081);
    context.closePath();
    
    //Рисует либо линию, либо пейзаж
    if (t ==='line') {
        context.stroke();
    } else if(t ==='poly'){
        context.fill();
    }
    draw_borders(borders);
}
//Часть, отвечающая за линии границ
function draw_borders(borders) {
    var min,max,def;
    min = canvas.height - borders.min; max = canvas.height - borders.max; def = canvas.height - borders.def;
    var a = [min, max, def];
    var c = ['green','red','yellow'];
    for (let i = 0; i < a.length; i++) {
        context.strokeStyle = c[i];
        context.beginPath();
        context.moveTo(-1, a[i]);
        context.lineTo(canvas.width + 1, a[i]);
        context.closePath();
        context.stroke();
    }
}
//Сглаживание массива средней арифметической
//Острые пики не очень красивые
function aliasing(array, win) {
    var tempArr = [];
    for (let j = 0; j < array.length; j++) {
        var midN = 0;
        var k = 0;
        for (let i = j-win; i < j + win; i++) {
            if(array[i] != undefined){
                const element = array[i];
                midN += element;
                k++;
            }
        }
        midN *= 1/(k);
        tempArr.push(midN);
    }
    return tempArr
}
//Можно сгладить несколько раз
function alias(array, k) {
    var r = range;
    for (let i = 0; i < k; i++) {
        array = aliasing(array, r);
        r *= range_mult;
    }
    return array;
}
//Найти минимальное число в массиве
function find_min(array) {
    var min = array[1]
    for (let i = 2; i < array.length-1; i++) {
        var element = array[i];
        element < min ? min = element : min = min;
    }
    return min;
}
//Найти максимальное число в массиве
function find_max(array) {
    var max = array[1]
    for (let i = 2; i < array.length-1; i++) {
        var element = array[i];
        element > max ? max = element : max = max;
    }
    return max;
}

function clear(){
    context.fillStyle='black';
    context.fillRect(0, 0, canvas.width, canvas.height);
}


function create(isAliasNeed, isTanNeed, typeOfTransform) {
    clear();
    line = []
    line = generate();
    if (isAliasNeed) {line = alias(line, rounds);}
    if (isTanNeed) {line = transform_tan(line);}
    switch(typeOfTransform){
        case 1:
            transform_linear(line);
            break;
        case 2:
            transform_quadratic(line);
            break;
        default:
            break;
    }
    draw(line, type);
}
function borderChange(max,min,def){
    max != undefined ? borders.max = max : alert('Значение "max" не введено');
    min != undefined ? borders.min = min : alert('Значение "min" не введено');
    def != undefined ? borders.def = def : alert('Значение "def" не введено');
}