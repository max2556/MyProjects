var a = 99; //square's length
var scene, camera, controls, renderer;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, -20, 20); // Set position like this
var controls = new THREE.TrackballControls(camera);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
createMesh(scene);

addLight(-1, 2, 4);
addLight(1, -1, -2);

camera.position.z = 15;
var animate = function (obj) {
    requestAnimationFrame(animate);

    obj.rotation.x += 0.01;
    obj.rotation.y += 0.01;

    renderer.render(scene, camera);
};

render()

function render() {
    controls.update();
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
