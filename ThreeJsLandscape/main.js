var a = 99;

window.onload = function(){
    //initThreejs();
}



var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0 , -20, 20); // Set position like this
var controls = new THREE.TrackballControls(camera);
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
var geometry = new THREE.PlaneGeometry(60, 60, a, a);
var material = new THREE.MeshPhongMaterial({
    color: 0x998833, 
    wireframe: true,
  });
var landscape = new THREE.Mesh( geometry, material );
scene.add( landscape );

function addLight(x, y, z) {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(x, y, z);
    scene.add(light);
}
addLight(-1,  2,  4);
addLight( 1, -1, -2);

camera.position.z = 15;
var animate = function (obj) {
    requestAnimationFrame( animate );

    obj.rotation.x += 0.01;
    obj.rotation.y += 0.01;

    renderer.render( scene, camera );
};
//animate(landscape);

data = perlinGenerate(a+1);
for (var i = 0, l = geometry.vertices.length; i < l; i++) {

    //var q = Math.floor(i/(a+1));
    //var r = i%a;
    var height = data[i];
    geometry.vertices[i].z = height*4;
}



render()

function render() {
    controls.update();    
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
