import { Helper } from './helper.js';
import { OrbitControls } from 'https://unpkg.com/three@0.119.1/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene(); 
scene.background = new THREE.Color(0x23272A);
scene.fog = new THREE.FogExp2( 0x000, .1 );

const h = new Helper(THREE);
const loader = new THREE.ImageBitmapLoader();

const pop = document.querySelector("#pop");
const canvas = document.querySelector("#bg");

const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.001, 10000);
const renderer = new THREE.WebGLRenderer({canvas: canvas});

const controls = new OrbitControls( camera, renderer.domElement );

var main;

function setup() {
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.antialias = true;

    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 1.5, 0);
    controls.enablePan  = false;
    controls.enableZoom  = false;
    controls.maxPolarAngle = (Math.PI / 2);
    controls.autoRotate = true;
    controls.autoRotateSpeed = -1;

    h.move(camera, 5, 5);

    const pointLight = new THREE.SpotLight(0xffffff, 1)
    h.move(pointLight, 0, 10, 0);
    pointLight.castShadow = true;
    pointLight.shadow.mapSize.width = 2048;
    pointLight.shadow.mapSize.height = 2048;
    pointLight.shadow.camera.fov = 22.5;
    pointLight.penumbra = 1;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);

    const skybox = h.createSkyBox(0x2E3337, -100);
    
    scene.add(pointLight, ambientLight, skybox);

    loader.load(
        './resources/grid.png',
        function ( imageBitmap ) {
            const texture = new THREE.CanvasTexture( imageBitmap );
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            var scale = 100;
            texture.repeat.set(scale, scale);
            const material = new THREE.MeshStandardMaterial( { color: 0xffffff, map: texture } );

            const floor = h.createPlane(null, material, 1);
            h.rotate(floor, -90, 0, 0);
            h.scale(floor, 500);

            scene.add(floor);
        },
        undefined,
        function ( err ) {
            console.log( 'An error happened' );
        }
    );

    const boxMaterial = new THREE.MeshStandardMaterial( {color: 0xffffff, wireframe: false} );
    const box = h.createBox(null, boxMaterial, 1);
    box.castShadow = true;
    box.receiveShadow = true;
    h.move(box, 0, 2, 0);
    scene.add(box);

    const box2Material = new THREE.MeshBasicMaterial( {wireframe: true, wireframeLinewidth: 2} );
    const box2 = h.createBox(null, box2Material, 1);
    box.add(box2);
    
    main = box;

    var clickAmount = 0;
    var oldColor = new THREE.Color(0xffffff);
    var newColor = new THREE.Color(Math.random() * 0xffffff);

    var domEvents = new THREEx.DomEvents(camera, renderer.domElement); 

    domEvents.addEventListener(box, 'click', function(event){
        clickAmount += 0.2;
        if (clickAmount <= 1) {
            h.scale(box, box.scale.x + 0.1);
            boxMaterial.color.lerp(newColor, clickAmount);      
        }  
        else {
            clickAmount = 0; 
            pop.play();

            h.scale(box, 1);
            boxMaterial.color.lerp(oldColor, 1);     
            newColor.setHex( Math.random() * 0xffffff );
        }
	}, false)

    camera.lookAt(box.position);
}

function animate() {
    requestAnimationFrame(animate);

    h.rotate(main, 0.2, -0.5, -0.5);
    
    controls.update();

    renderer.render(scene, camera);
}

setup();
animate();