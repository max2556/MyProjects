var app = initThreejs();


addLight(-1,  2,  4, app.scene);
addLight( 1, -1, -2, app.scene);
app.camera.position.z = 3;
app.camera.lookAt(0,0,0)

render(app.renderer, app.scene, app.camera, app.controls);

setInterval(update, 1000/60);

function update() {
    //animate(app.objects[0]);
}