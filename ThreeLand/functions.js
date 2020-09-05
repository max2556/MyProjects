// a - сторона квадрата
var borders = {
    def: 5,
    min: 1,
    max: 10
}
//gen
var min = -2;
var max = 2;
//alias
var r = 5; //radius
var k = 1;
var rMult = 1;


function createMesh() {
    var file = '/MyProjects/ThreeLand/textures/px.jpg'; //input the correct file path
    var geometry = new THREE.PlaneGeometry(60, 60, a, a);
    var texture = new THREE.TextureLoader().load(file);
    var material = new THREE.MeshBasicMaterial({ map: texture });
    /*var material = new THREE.MeshPhongMaterial({
        color: 0x998833,
        wireframe: true,
    });*/
    var landscape = new THREE.Mesh(geometry, material);
    scene.add(landscape);

    heightModify(geometry);

    return geometry, material, landscape
}

function heightModify(geometry) {
    data = perlinGenerate(a + 1); //you can choose generation mode if you want 
    //data = expGenerate(a + 1);
    for (var i = 0, l = geometry.vertices.length; i < l; i++) {
        var height = data[i];
        geometry.vertices[i].z = height * 4;
    }
}

function addLight(x, y, z) {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(x, y, z);
    scene.add(light);
}


function generateData(a) {
    data = generateFirstLine(a)
    var qPrev = 1;
    for (let i = a; i < a * a; i++) {
        let q = Math.floor(i / a);
        let h = (Math.random() * (max - min)) + min;
        if (data[i - 1] != undefined && data[i - a] != undefined) {
            var k = (data[i - 1] + data[i - a]) / 2;
            data.push(k + h);
        } else if (data[i - 1] != undefined) {
            data.push(data[i - 1] + h);
        } else if (data[i - a] != undefined) {
            data.push(data[i - a] + h)
        }
        qPrev = q;
    }
    data = aliasing(data, a);
    return data;
}

function generateFirstLine(a) {
    var data = [borders.def];
    for (let i = 1; i < a; i++) {
        let h = (Math.random() * (max - min)) + min;
        data.push(data[i - 1] + h);
    }
    return data;
}


function aliasing(array, a) {
    let tempArr = []
    for (let i = 0; i < array.length; i++) {
        var element = array[i];
        var sum = 0;
        var k = 0;
        for (let x = -r; x < r; x++) {
            for (let y = -r; y < r; y++) {
                const element = array[i + y * a + x];
                if (element) {
                    sum += element;
                    k++;
                }
            }
        }
        tempArr.push(sum / k);
    }
    return tempArr;
}
function alias(array, a) {
    for (let i = 0; i < k; i++) {
        array = aliasing(array, a);
        r *= rMult;
    }
    return array;
}

function perlinGenerate(a) {
    var data = [3];
    noise.seed(Math.random());
    for (let i = 1; i < a * a; i++) {
        var q = Math.floor(i / a);
        var d = i % a;
        let h = (Math.random() * (max - min)) + min;
        var value = noise.simplex2(q / 40, d / 40) + h;
        data[i] = value;
    }
    data = aliasing(data, a);
    return data;
}

function expGenerate(a) {
    var data = [];
    for (let i = 0; i < a * a; i++) {
        let x = i % a;
        let y = Math.floor(i / a);

        let z = x * x - y * y;
        data[i] = z;
    }
    return data;
}
