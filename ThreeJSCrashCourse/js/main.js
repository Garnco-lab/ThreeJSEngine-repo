// mr doobs fps tracker
(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()

// create scene and camera
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// start renderer for scene
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

// add anaglyph effect
var effect = new THREE.AnaglyphEffect(renderer);
effect.setSize

// call orbit controls into scene
var controls = new THREE.OrbitControls(camera,renderer.domElement);

// import can model
var loader = new THREE.FBXLoader();

loader.load
(
    'models/finalcan.fbx',

    function(object)
    {
        var myCanModel = object;
        myCanModel.position.x = 400;
        scene.add(object);
    }
);

// create the texture reference

var tileTexture = new THREE.TextureLoader().load('img/cube1.png')

// create the shape
var geometry = new THREE.BoxGeometry(1, 1, 1);
// create materials
var cubeMaterials = 
[
    new THREE.MeshLambertMaterial({map: tileTexture, side: THREE.DoubleSide}), // Right side
    new THREE.MeshPhongMaterial({map: tileTexture, side: THREE.DoubleSide}), // Left Side
    new THREE.MeshLambertMaterial({map: tileTexture, side: THREE.DoubleSide}), // Top Side
    new THREE.MeshPhongMaterial({map: tileTexture, side: THREE.DoubleSide}), // Bottom Side
    new THREE.MeshLambertMaterial({map: tileTexture, side: THREE.DoubleSide}), // Front side
    new THREE.MeshBasicMaterial({map: tileTexture, side: THREE.DoubleSide}), // Back side
]

// create a material, color or image texture
var cube = new THREE.Mesh(geometry, cubeMaterials);
scene.add(cube);

camera.position.z = 3;

// floor
var floorGeometry = new THREE.CubeGeometry(10, 1, 10);
var floorMaterial = new THREE.MeshLambertMaterial({map: tileTexture, side: THREE.DoubleSide});
var FloorCube = new THREE.Mesh(floorGeometry, floorMaterial);
FloorCube.position.y = -5;
scene.add(FloorCube);

// ceiling
var ceilingGeometry = new THREE.CubeGeometry(10, 1, 10);
var ceilingMaterial = new THREE.MeshLambertMaterial({map: tileTexture, side: THREE.DoubleSide});
var ceilingCube = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
ceilingCube.position.y = 5;
scene.add(ceilingCube);

// left wall
var leftWallGeometry = new THREE.CubeGeometry(1, 10, 10);
var leftWallMaterial = new THREE.MeshLambertMaterial({map: tileTexture, side: THREE.DoubleSide});
var leftWallCube = new THREE.Mesh(leftWallGeometry, leftWallMaterial);
leftWallCube.position.x = -5;
scene.add(leftWallCube);

// right wall
var rightWallGeometry = new THREE.CubeGeometry(1, 10, 10);
var rightWallMaterial = new THREE.MeshLambertMaterial({map: tileTexture, side: THREE.DoubleSide});
var rightWallCube = new THREE.Mesh(rightWallGeometry, rightWallMaterial);
rightWallCube.position.x = 5;
scene.add(rightWallCube);

// ambient lighting
var ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.8);
scene.add(ambientLight);

// point lights
var light1 = new THREE.PointLight(0xFF0040, 4, 50);
scene.add(light1);

var light2 = new THREE.PointLight(0x0040FF, 2, 50);
scene.add(light2);

var light3 = new THREE.PointLight(0x80FF80, 4, 50);
scene.add(light3);

// directional point light
var directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.5);
directionalLight.position.set(0, 1, 0);
scene.add(directionalLight);

// adding spot light
var spotLight = new THREE.SpotLight(0xFF45F6, 1);
spotLight.position.set(0, 3, 0);
scene.add(spotLight);

// game logic
var update = function()
{
    // rotate cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.005;

    // point light rotations
    var time = Date.now() * 0.0005;

    light1.position.x = Math.sin(time * 0.7) * 30;
    light1.position.y = Math.cos(time * 0.5) * 40;
    light1.position.z = Math.cos(time * 0.3) * 30;

    light2.position.x = Math.cos(time * 0.3) * 30;
    light2.position.y = Math.sin(time * 0.5) * 40;
    light2.position.z = Math.sin(time * 0.7) * 30;

    light3.position.x = Math.sin(time * 0.7) * 30;
    light3.position.y = Math.cos(time * 0.3) * 40;
    light3.position.z = Math.sin(time * 0.5) * 30;

};

// draw scene
var render = function()
{
    effect.render(scene,camera);
};

// run game loop (update, render, repeat)
var GameLoop = function()
{
    requestAnimationFrame(GameLoop);

    update();
    render();
};

GameLoop();