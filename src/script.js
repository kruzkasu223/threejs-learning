import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const canvas = document.querySelector(".canvas");

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // update threejs things
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Scene
const scene = new THREE.Scene();

// Object
// const geometry = new THREE.BoxGeometry(1, 1, 1, 5, 5, 5);
// const geometry = new THREE.BoxBufferGeometry(1, 1, 1, 5, 5, 5);
const geometry = new THREE.BufferGeometry();

const count = 500;
const positionsArray = new Float32Array(count * 3 * 3);

for (const i in positionsArray) {
  positionsArray[i] = Math.random() - 0.5;
}

const positionsAttributes = new THREE.BufferAttribute(positionsArray, 3);
geometry.setAttribute("position", positionsAttributes);

const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animations

const clock = new THREE.Clock();

const animate = () => {
  const elapsedTime = clock.getElapsedTime();

  controls.update();

  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
};

animate();
