import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xffffff);
renderer.setSize(window.innerWidth/2, window.innerHeight/2);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(6, 3, 6);

const light = new THREE.DirectionalLight(0xffffff, 5);
light.position.set(0, 15, 3).normalize();
scene.add(light);

const light2 = new THREE.AmbientLight(0x404040);
scene.add(light2);

let van;
const loader = new GLTFLoader();
loader.load('furn.glb', (gltf) => {
  van = gltf.scene;
  van.scale.set(5, 5, 5);
  van.position.y = -2;
  scene.add(van);

  const parts = [];
  for (let i = 0; i < 8; i++) {
    parts.push(van.children[0].children[i]);
  }

  parts.forEach((part, index) => {
    document.getElementById(`toggle${index + 1}`).addEventListener('click', () => {
      part.visible = !part.visible;
    });

    document.getElementById(`color${index + 1}`).addEventListener('click', () => {
      part.traverse((child) => {
        if (child.isMesh) {
          child.material.color.set(Math.random() * 0xffffff);
        }
      });
    });
  });
}, undefined, (error) => {
  console.error('An error occurred while loading the model:', error);
});

function animate() {
  requestAnimationFrame(animate);
  if (van) {
    // van.rotation.y += 0.01;
  }
  controls.update();
  renderer.render(scene, camera);
}
animate();
