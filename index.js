import { OrbitControls } from 'https://unpkg.com/three@0.119.1/examples/jsm/controls/OrbitControls.js';
<<<<<<< HEAD
import { FBXLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js'
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js'
=======
>>>>>>> 49b8991d82246f0868c07a78e31709b97ac72574
import * as THREE from 'https://unpkg.com/three@0.119.1/build/three.module.js';
const scene = new THREE.Scene(); 
scene.background = new THREE.Color(0x23272A);

<<<<<<< HEAD
const canvas = document.querySelector("#bg");
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.001, 10000);
//const controls = new OrbitControls(camera, canvas);
//const loader = new FBXLoader();
const loader = new GLTFLoader();

var spin;
var cube;
var saucer;
var cow;
var sus;

var chance = 1;

canvas.style.position = "fixed";
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.zIndex = "-1";
=======
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.001, 10000);


var spin;
var cube;

const canvas = document.querySelector("#bg");

canvas.style.position = "fixed";
canvas.style.zIndex = "-1";
canvas.style.top = 0;
canvas.style.left = 0;
>>>>>>> 49b8991d82246f0868c07a78e31709b97ac72574

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});

<<<<<<< HEAD
function init() {
    chance = Math.floor(Math.random() * 50);

=======
window.onresize = () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function init() {
>>>>>>> 49b8991d82246f0868c07a78e31709b97ac72574
    //Set up renderer
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    //Set up camera
<<<<<<< HEAD
    move(camera, 10, 5);
    camera.lookAt(scene.position);
    move(camera, 0, 5);
=======
    move(camera, 20, 20);
    camera.lookAt(scene.position);


>>>>>>> 49b8991d82246f0868c07a78e31709b97ac72574
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

<<<<<<< HEAD
    const icoSphereGeom = new THREE.IcosahedronGeometry(5, 1);
    const icoSphereMat = new THREE.MeshPhysicalMaterial ( { color: 0x23272A, wireframe: true } );
    spin = new THREE.Mesh(icoSphereGeom, icoSphereMat);
    spin.castShadow = true;
    spin.receiveShadow = true;

    

    //Add model
    //options are Cow, Cube, Minecraft cube
    switch(chance) {
        default:
            const cubeGeom = new THREE.BoxGeometry(2, 2, 2)
            const cubeMat = new THREE.MeshPhysicalMaterial();
            cube = new THREE.Mesh(cubeGeom, cubeMat);
            cube.castShadow = true

            move(cube, 0, 5);
            scene.add(cube);
        break;

        case 1:
            loader.setPath("./resources/")
            loader.load("sus.gltf", (model) => {
                scale(model.scene, 2);
                move(model.scene, 0, 5);

                sus = model.scene;

                scene.add(model.scene);
            }); 

        break;

        case 2:
            document.getElementById("copyright").style.visibility = "visible";

            loader.setPath("./resources/")
            loader.load("beam.gltf", (model) => {
                scale(model.scene, 2);
                move(model.scene, 0, 5);

                saucer = model.scene;

                scene.add(model.scene);
            }); 

            loader.load("cow.gltf", (model) => {
                scale(model.scene, 1.5);
                move(model.scene, 0, 5);
                
                cow = model.scene;

                scene.add(model.scene);
            }); 
        break;
    }



    
    move(spin, 0, 20);

    scene.add(spin);
=======
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
>>>>>>> 49b8991d82246f0868c07a78e31709b97ac72574
}

function animate() {
    requestAnimationFrame(animate);

    rotate(spin, 0.05, -0.05, 0.05);
<<<<<<< HEAD
    switch(chance) {
        default:
            rotate(cube, -0.05, 0.05, 0.05);
        break;

        case 1:
            rotate(sus, -0.05, 0.05, 0.05);
        break;

        case 2:
            rotate(cow, -0.05, 0.05, 0.05);
            rotate(saucer, 0, -0.1, 0);
        break;
    }

=======
    rotate(cube, -0.05, 0.05, 0.05);
>>>>>>> 49b8991d82246f0868c07a78e31709b97ac72574

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

<<<<<<< HEAD
function scale(object, x, y = x, z = x) {
    object.scale.set(x, y, z);
}

=======
>>>>>>> 49b8991d82246f0868c07a78e31709b97ac72574
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
<<<<<<< HEAD
//Deez Nuts
=======

>>>>>>> 49b8991d82246f0868c07a78e31709b97ac72574
function createSkyBox() {
    const geometry = new THREE.BoxGeometry( -100, -100, -100 );
    const material = new THREE.MeshStandardMaterial( {color: 0x23272A } );
    const mesh = new THREE.Mesh( geometry, material );

    scene.add(mesh);
}

<<<<<<< HEAD
async function LoadModel(item, path)
{

}

=======
>>>>>>> 49b8991d82246f0868c07a78e31709b97ac72574
init();
animate();