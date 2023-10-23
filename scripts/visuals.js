import { Helper } from './helper.js';
import { OrbitControls } from 'https://unpkg.com/three@0.119.1/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene(); 
scene.background = new THREE.Color(0x1c1c1c);

const h = new Helper(THREE);

const canvas = document.querySelector("#bg");

const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.001, 10000);
const renderer = new THREE.WebGLRenderer({canvas: canvas});

var spin;
const controls = new OrbitControls( camera, renderer.domElement );
var time = 0;

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function setup() {
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = false;
    renderer.antialias = true;

    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 0, 0);
    controls.enablePan  = false;
    controls.enableZoom  = false;
    controls.maxPolarAngle = (Math.PI / 2);
    controls.autoRotate = true;
    controls.autoRotateSpeed = -1;
    
    h.move(camera, 5, 5);
   
    const mA = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true} );
    const a = h.createBox(mA, new THREE.Vector3(2,2,2));
    const randomColor = Math.random() * 0xffffff;
    const mBA = new THREE.MeshBasicMaterial({color: randomColor, wireframe: false} );
    const mBB = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true} );
    spin = h.createIcoSphere(1, 0, mBA);
    const bB = h.createIcoSphere(1, 0, mBB);
    scene.add(a, spin.add(bB));
}

function animate() {
    requestAnimationFrame(animate);
    
    time += 0.01;
    h.scale(spin, h.remap(Math.sin(time), -1, 1, 0.75, 1));
    h.rotate(spin, 0.1);

    controls.update();

    renderer.render(scene, camera);
}

setup();
animate();