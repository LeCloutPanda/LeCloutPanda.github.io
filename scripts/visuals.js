import { OrbitControls } from 'https://unpkg.com/three@0.119.1/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js'
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js'
import * as THREE from 'https://unpkg.com/three@0.119.1/build/three.module.js';
import { Helper } from './helper.js';

const scene = new THREE.Scene(); 
scene.background = new THREE.Color(0x23272A);

const canvas = document.querySelector("#bg");
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.001, 10000);
//const controls = new OrbitControls(camera, canvas);
//const loader = new FBXLoader();
const loader = new GLTFLoader();

var spin;
var main;

const renderer = new THREE.WebGLRenderer({canvas: canvas});

const h = new Helper(THREE);

function setup() {
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.antialias = true;

    //Move camera to new and final position
    h.move(camera, 5, 5);

    //Add new lighting
    const pointLight = new THREE.SpotLight(0xffffff, 1)
    h.move(pointLight, 0, 10, 0);
    pointLight.castShadow = true;
    pointLight.shadow.mapSize.width = 2048;
    pointLight.shadow.mapSize.height = 2048;
    pointLight.shadow.camera.fov = 22.5;
    pointLight.penumbra = 1;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);

    scene.add(pointLight, ambientLight);

    const floor = h.createPlane(1, 1, 0x2E3337);
    h.rotate(floor, -90, 0, 0);
    h.scale(floor, 500);
    const skybox = h.createSkyBox(0x2E3337, -100);

    scene.add(floor, skybox);

    const newMaterial = new THREE.MeshStandardMaterial( {color: 0x23272A, wireframe: true, wireframeLinewidth: 2} );
    const wireframe = h.createIcoSphere(5, 1, 0xffffff, newMaterial);
    wireframe.castShadow = true;
    wireframe.receiveShadow = true;
    h.move(wireframe, 0, 10, 0);
    scene.add(wireframe);
    spin = wireframe;

    const box = h.createBox(0xffffff, 1);
    box.castShadow = true;
    box.receiveShadow = true;
    h.move(box, 0, 2, 0);
    scene.add(box);

    main = box;

    camera.lookAt(box.position);
}

function animate() {
    requestAnimationFrame(animate);

    h.rotate(main, 0.2, -0.5, -0.5);
    h.rotate(spin, 0.1);
    
    renderer.render(scene, camera);
}

setup();
animate();