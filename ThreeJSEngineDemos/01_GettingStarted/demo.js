var scene, camera, renderer, mesh;



function init()
{
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(90, 1280/720, 0.1, 1000);

    mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        new THREE.MeshBasicMaterial({color:0xff4444, wireframe:true})
    );

    scene.add(mesh);

    camera.position.set(0,0,-5);

    camera.lookAt(new THREE.Vector3(0,0,0));

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(1280, 720);

    document.body.appendChild(renderer.domElement);

    animate();
}

function animate()
{
    requestAnimationFrame(animate);

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

    renderer.render(scene, camera);
}

// launch

window.onload = init;

window.addEventListener('resize', function()
{
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width,height);
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
})