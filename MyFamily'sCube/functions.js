var animate = function (obj, scene, camera, renderer) {
    scene == undefined ? scene = app.scene : scene = scene;
    camera == undefined ? camera = app.camera : camera = camera;
    renderer == undefined ? renderer = app.renderer : renderer = renderer;

    obj.rotation.x += 0.01;
    obj.rotation.y += 0.01;

    renderer.render(scene, camera);
};
function render(renderer, scene, camera) {
    //controls.update();
    renderer.render(scene, camera);
}
function initThreejs() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(1, 1, 0); // Set position like this
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    var geometry = new THREE.BoxGeometry(1,1,1);

    var material = setTextures();

    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    return {
        scene: scene,
        camera: camera,
        objects: [
            cube
        ],
        renderer: renderer,
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
    var loader = new THREE.CubeTextureLoader();
    loader.setPath( "textures/" );
    var textureCube = loader.load( [
        'px.png', 'nx.png',
        'py.png', 'ny.png',
        'pz.png', 'nz.png'
    ] );
    return material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube } );
}
