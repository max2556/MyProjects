var _u_ = undefined;

var randomly = false;


var objects_list = [];
var constants = {
    g: (6,67)*(10**(-11)),
};
var global_var = {};
window.onload = function(){
    global_var = canv_init();
    global_var.ctx.fillRect(31,31,10,10);
    create_elements();
    setInterval(app, 1000/360);
}
var canv_init = () => {
    var canv = document.getElementById('canv');
    var ctx = canv.getContext('2d');
    canv.width = window.innerWidth-5;
    canv.height = window.innerHeight-5;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canv.width, canv.height);
    return {
        canv: canv,
        ctx: ctx
    }
}
function app() {
    canv_clean();
    updateAll();
    drawAll();
    //console.log(objects_list[0].cords);
}
function updateAll(){
    for (let i = 0; i < objects_list.length; i++) {
        const element = objects_list[i];
        element.update();
    }
}
function drawAll(){
    for (let i = 0; i < objects_list.length; i++) {
        const element = objects_list[i];
        element.draw(global_var.ctx);
    }
}
function create_elements(){
    if(randomly){
        generate_some_objects()
    }else {
        let o1 = new object(800,200,20,10*10**10,[0.00,0.0],_u_,'red');
        let o2 = new object(1000,300,20,10*10**10,[0.00,-0.0],_u_,'blue');
        objects_list.push(o1,o2);

    }
}
function canv_clean(){
    global_var.ctx.fillStyle = 'black';
    global_var.ctx.fillRect(0, 0, canv.width, canv.height);
}
function generate_some_objects() {
    objects_list = [];
    let count = Math.floor(Math.random()*6)+3;
    for (let i = 0; i < count; i++) {
        let x = Math.floor(Math.random()*1700)+100;
        let y = Math.floor(Math.random()*700)+100;
        let r = Math.floor(Math.random()*50)+5;
        let w = (Math.random()*10) * Math.pow(10, Math.floor(Math.random()*10)+4);
        let v = [Math.random()*0.5-0.25, Math.random()*0.5 - 0.25];
        let element = new object(x,y,r,w,v);
        objects_list.push(element);
    }
}