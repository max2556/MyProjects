function matrix_sum(a1,a2) {
    a1[0] += a2[0];
    a1[1] += a2[1];
}

function simple_name() {
    return 'Object_' + Math.floor(Math.random()*100);
}
function random_color() {
    var red = Math.floor(Math.random()*200 + 50);
    var green = Math.floor(Math.random()*200 + 50);
    var blue = Math.floor(Math.random()*200 + 50);
    var color = "rgb("+red+","+green+","+blue+")";
    return color;
}
function getAcceleration(o1, o2) {
    let dx = o1.cords.x - o2.cords.x;
    let dy = o1.cords.y - o2.cords.y;
    let r = Math.sqrt(dx**2 + dy**2);
    let sin = dx/r;
    let cos = dy/r;
    var force = constants.g * (o1.weight * o2.weight) / r**2;
    var acceleration = force / o1.weight; 
    var a = [sin * acceleration,cos * acceleration];
    return a;
}
