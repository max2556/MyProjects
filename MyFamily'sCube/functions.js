var animate = function (obj, scene, camera, renderer) {
    scene == undefined ? scene = app.scene : scene = scene;
    camera == undefined ? camera = app.camera : camera = camera;
    renderer == undefined ? renderer = app.renderer : renderer = renderer;

    obj.rotation.x += 0.001;
    obj.rotation.y += 0.001;

    renderer.render(scene, camera);
};
function render() {
    var renderer,scene,camera,controls;
    renderer = app.renderer; scene = app.scene; camera = app.camera; controls = app.controls;
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
}
function initThreejs() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(1, 1, 0); // Set position like this
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    var controls = new THREE.TrackballControls(camera);

    var material = setTextures();

    //var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

    var cube = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2, 1, 1, 1, material));
    scene.add(cube);
    return {
        scene: scene,
        camera: camera,
        objects: [
            cube
        ],
        renderer: renderer,
        controls: controls,
    };
}
function addLight(x, y, z, scene) {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(x, y, z);
    scene.add(light);
}
function setTextures() {
    var materials = [
        new THREE.MeshLambertMaterial({
            map: new THREE.TextureLoader().load("/MyProjects/MyFamily'sCube/textures/nx.png")
        }),
        new THREE.MeshLambertMaterial({
            map: new THREE.TextureLoader().load("/MyProjects/MyFamily'sCube/textures/nx.png")
        }),
        new THREE.MeshLambertMaterial({
            map: new THREE.TextureLoader().load("/MyProjects/MyFamily'sCube/textures/nx.png")        
        }),
        new THREE.MeshLambertMaterial({
            map: new THREE.TextureLoader().load("/MyProjects/MyFamily'sCube/textures/nx.png")        
        }),
        new THREE.MeshLambertMaterial({
            map: new THREE.TextureLoader().load("/MyProjects/MyFamily'sCube/textures/nx.png")        
        }),
        new THREE.MeshLambertMaterial({
            map: new THREE.TextureLoader().load("/MyProjects/MyFamily'sCube/textures/nx.png")        
        })
     ];
    return materials;
}