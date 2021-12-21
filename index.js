import { OrbitControls } from 'https://unpkg.com/three@0.119.1/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'https://unpkg.com/three@0.119.1/build/three.module.js';
const scene = new THREE.Scene(); 
scene.background = new THREE.Color(0x23272A);

const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.001, 10000);


var spin;
var cube;

const canvas = document.querySelector("#bg");

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});

function init() {
    //Set up renderer
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    //Set up camera
    move(camera, 20, 20);
    camera.lookAt(scene.position);


    //Add lighting
    const pointLight = new THREE.SpotLight(0xffffff, 1);
    move(pointLight, 0, 20);
    pointLight.castShadow = true;
    pointLight.shadow.mapSize.width = 1024;
    pointLight.shadow.mapSize.height = 1024;
    pointLight.shadow.camera.fov = 22.5;
    pointLight.penumbra = 1;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);

    scene.add(pointLight, ambientLight);

    //Create geometry
    createFloor();
    createSkyBox();

    const geometry = new THREE.IcosahedronGeometry(5, 1);
    const material = new THREE.MeshPhysicalMaterial ( { color: 0x23272A, wireframe: true } );
    spin = new THREE.Mesh(geometry, material);
    spin.castShadow = true;
    spin.receiveShadow = true;

    const geometry2 = new THREE.BoxGeometry(5, 5, 5);
    const material2 = new THREE.MeshPhysicalMaterial ( );
    cube = new THREE.Mesh(geometry2, material2);
    cube.castShadow = true;

    move(spin, 0, 20);
    move(cube, 0, 10);

    scene.add(spin, cube);
}

function animate() {
    requestAnimationFrame(animate);

    rotate(spin, 0.05, -0.05, 0.05);
    rotate(cube, -0.05, 0.05, 0.05);

    renderer.render(scene, camera);
}

function move(object, x, y = x, z = x) {
    object.translateX(x);
    object.translateY(y);
    object.translateZ(z);
}

function rotate(object, x, y = x, z = x) {
    object.rotateX(THREE.Math.degToRad(x));
    object.rotateY(THREE.Math.degToRad(y));
    object.rotateZ(THREE.Math.degToRad(z));
}

//Geometry presets
function createFloor() {
    const geometry = new THREE.PlaneGeometry( 1, 1 );
    const material = new THREE.MeshStandardMaterial( {color: 0x23272A } );
    const mesh = new THREE.Mesh( geometry, material );

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    rotate(mesh, -90, 0, 0);
    mesh.scale.set(500, 500);
    scene.add( mesh );
}

function createSkyBox() {
    const geometry = new THREE.BoxGeometry( -100, -100, -100 );
    const material = new THREE.MeshStandardMaterial( {color: 0x23272A } );
    const mesh = new THREE.Mesh( geometry, material );

    scene.add(mesh);
}

init();
animate();