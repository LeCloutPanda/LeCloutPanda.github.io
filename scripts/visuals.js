import { Helper } from './helper.js';
import { OrbitControls } from 'https://unpkg.com/three@0.119.1/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene(); 
scene.background = new THREE.Color(0x1c1c1c);

const h = new Helper(THREE);

const canvas = document.querySelector("#bg");
const pop = document.querySelector("#Pop");

const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.001, 10000);
const renderer = new THREE.WebGLRenderer({canvas: canvas});

var spin;
var size = 1;
const controls = new OrbitControls( camera, renderer.domElement );

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
    renderer.antialias = false;

    controls.enabled = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;
    
    h.move(camera, 5, 5);
   
    const mA = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true} );
    const a = h.createBox(mA, new THREE.Vector3(2,2,2));
    const randomColor = Math.random() * 0xffffff;
    const mBA = new THREE.MeshBasicMaterial({color: randomColor, wireframe: false} );
    const mBB = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true} );

    var rDetail = Math.floor(Math.random() * 3);

    spin = h.createIcoSphere(1, rDetail, mBA);
    const bB = h.createIcoSphere(1, rDetail, mBB);
    scene.add(a, spin.add(bB));

    canvas.addEventListener('click', function(event){
        if (size <= 1) {
            size += 0.1;
        }  
        else {
            size = 0.5; 
            mBA.color.set(new THREE.Color(Math.random() * 0xffffff));
            var newRDetail = Math.floor(Math.random() * 3);
            bB.geometry = h.createIcoSphereGeometry(1, newRDetail);
            spin.geometry = h.createIcoSphereGeometry(1, newRDetail);

            pop.play();
        }
	}, false)
}

function animate() {
    requestAnimationFrame(animate); 

    if (size > 0.5) size -= 0.0025;
    h.scale(spin, size);
    h.rotate(spin, 0.1);

    controls.update();

    renderer.render(scene, camera);
}

setup();
animate();