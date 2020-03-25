var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener( 'resize', function()
{
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

var controls = new THREE.OrbitControls(camera,renderer.domElement);

// create the shape
var geometry = new THREE.BoxGeometry(1, 1, 1);
var cubeMaterials = 
[
    new THREE.MeshLambertMaterial({color: 0xFFFFFF, side: THREE.DoubleSide}), // Right side
    new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('img/cube1.png'), side: THREE.DoubleSide}), // Left Side
    new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('img/cube1.png'), side: THREE.DoubleSide}), // Top Side
    new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('img/cube1.png'), side: THREE.DoubleSide}), // Bottom Side
    new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('img/cube1.png'), side: THREE.DoubleSide}), // Front side
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/cube1.png'), side: THREE.DoubleSide}), // Back side
]

// create a material, color or image texture
var cube = new THREE.Mesh(geometry, cubeMaterials);
scene.add(cube);

camera.position.z = 3;

// floor
var floorGeometry = new THREE.CubeGeometry(10, 1, 10);
var floorMaterial = new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('img/cube1.png'), side: THREE.DoubleSide});
var FloorCube = new THREE.Mesh(floorGeometry, floorMaterial);
FloorCube.position.y = -5
scene.add(FloorCube);

// ceiling
var ceilingGeometry = new THREE.CubeGeometry(10, 1, 10);
var ceilingMaterial = new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('img/cube1.png'), side: THREE.DoubleSide});
var ceilingCube = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
ceilingCube.position.y = 5
scene.add(ceilingCube);

var ambientLight = new THREE.AmbientLight(0xFFFFFF, 1.5);
scene.add(ambientLight);

// game logic
var update = function ( )
{
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.005;
};

// draw scene
var render = function()
{
    renderer.render(scene,camera);
};

// run game loop (update, render, repeat)
var GameLoop = function()
{
    requestAnimationFrame(GameLoop);

    update();
    render();
};

GameLoop();
