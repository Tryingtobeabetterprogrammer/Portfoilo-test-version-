import * as THREE from 'https://unpkg.com/three@0.128.0/build/three.module.js';
//import * as THREE from './three.module.js';
import { TrackballControls } from 'https://unpkg.com/three@0.128.0/examples/jsm/controls/TrackballControls.js'; 


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry =new THREE.TorusGeometry(10,3,16,100);

const material =new THREE.MeshStandardMaterial({color:0xFF6347});
const torus=new THREE.Mesh(geometry,material);

scene.add(torus)

const pointLight=new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20);

const adLight=new THREE.AmbientLight(0xffffff);

scene.add(pointLight,adLight);
const lightHelper=new THREE.PointLightHelper(pointLight);
const girdHelper=new THREE.GridHelper(200,50);
scene.add(lightHelper,girdHelper);

const controls=new TrackballControls(camera,renderer.domElement);
function addstar(){
    const geometry=new THREE.SphereGeometry(0.25);
    const material=new THREE.MeshStandardMaterial({color:0xffff});
    const star =new THREE.Mesh(geometry,material);

    const [x,y,z]=Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(100));


    star.position.set(x,y,z);
    scene.add(star);


}const spaceTexture =new THREE.TextureLoader().load('./space.jpg');
scene.background=spaceTexture;

const picMaterial=new THREE.TextureLoader().load('cat.jpg');

const pic=new THREE.Mesh(
    new THREE.BoxGeometry(3,3,3),
    new THREE.MeshBasicMaterial({map:picMaterial})
);
scene.add(pic);

function animate(){
    requestAnimationFrame(animate);
    torus.rotation.x+=0.01;
    torus.rotation.y+=0.005;
    torus.rotation.z+=0.01;

    controls.update();
    renderer.render(scene,camera);
}

const moonTexture=new THREE.TextureLoader().load('moon.jpg');

const moon=new THREE.Mesh(
    new THREE.SphereGeometry(3,32,32),
    new THREE.MeshStandardMaterial({map:moonTexture})
);
scene.add(moon);
moon.position.z=30;
moon.position.setX(-10);

function movecamera(){
    const t=document.getBoundingClintRect().top;
    moon.rotation.x +=0.05;
    moon.rotation.y+=0.075;
    moon.rotation.z+=0.05;

    pic.rotation.y+=0.01;
    pic.rotation.z+=0.01;

    camera.position.z=t*-0.01;
    camera.position.x=t*-0.0002;
    camera.rotation.y=t*-0.0002;
}

document.body.onscroll=movecamera



animate();
Array(200).fill().forEach(addstar);